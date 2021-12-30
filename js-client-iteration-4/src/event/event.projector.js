import {onValueChange, setValueOf, valueOf} from '../base/presentationModel/presentationModel.js';
import {dom, child} from '../base/utils/dom.js';
import {translationService} from '../base/service/translation.service.js';
import {appendReplacing} from '../base/utils/appends.js';

export {eventListItemProjector, eventOverviewProjector}

/**
 * @param eventController
 * @param selectionController
 * @param rootElement
 * @param model
 * @constructor
 */
const eventListItemProjector = (eventController, selectionController, rootElement, model) => {

    const fragment = dom(`
        <div class="card">
            <div class="card-date"><span data-i18n="view.event.from"></span> <input type="date"/></div>
            <div class="card-date"><span data-i18n="view.event.to"></span> <input type="date"></div>
            <div><span data-i18n="view.event.state"></span> <strong></strong></div>
            <div> <!-- add svg trash-can inline, to be able to modify it via CSS -->
                <svg class="trash-event" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.0.0-beta3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2021 Fonticons, Inc. --><path d="M32 464C32 490.5 53.5 512 80 512h288c26.5 0 48-21.5 48-48V128H32V464zM304 208C304 199.1 311.1 192 320 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM208 208C208 199.1 215.1 192 224 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM112 208C112 199.1 119.1 192 128 192s16 7.125 16 16v224C144 440.9 136.9 448 128 448s-16-7.125-16-16V208zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z"/></>
            </div>
        </div>
    `);

    const card = child(fragment);
    const [from, to, state, trash] = card.children;

    const fromInput = from.querySelector('input');
    fromInput.value = valueOf(model.from);
    fromInput.onchange = () => setValueOf(model.from)(fromInput.value)

    const toInput = to.querySelector('input');
    toInput.value = valueOf(model.to);
    toInput.onchange = () => setValueOf(model.to)(toInput.value)

    const stateText = state.querySelector('strong');
    stateText.innerText = valueOf(model.state);

    trash.onclick = _ => eventController.removeItem(model);

    card.onmouseover = _ => selectionController.setSelectedModel(model);
    card.onmouseleave = _ => selectionController.clearSelection();

    selectionController.onModelSelected(selected => selected === model
        ? trash.children[0].classList.add("selected")
        : trash.children[0].classList.remove("selected"))

    eventController.onItemRemove((removedModel, removeMe) => {
        if (removedModel !== model) {
            return;
        }
        // discharge listener before duplicating...
        translationService.dischargeListener(card);
        rootElement.removeChild(card);
        selectionController.clearSelection();
        removeMe();
    });

    rootElement.prepend(fragment);
};

/**
 * @param eventController
 * @param rootElement
 * @constructor
 */
const eventOverviewProjector = (eventController, rootElement) => {

    const fragment = dom(`
            <div class="card">
                <span><span data-i18n="view.event.year"></span>          <strong></strong></span>
                <span><span data-i18n="view.event.availableDays"></span> <strong></strong></span>
                <span><span data-i18n="view.event.events"></span>        <strong></strong></span>
            </div>`);

    const card = child(fragment);
    const placeHolders = card.querySelectorAll('strong');

    placeHolders[0].innerText = new Date().getFullYear();

    const updateValues = () => {
        placeHolders[1].innerText = valueOf(eventController.getDaysLeft());
        placeHolders[2].innerText = eventController.count();
    }

    eventController.onItemAdd(_ => updateValues())
    eventController.onItemRemove(_ => updateValues())
    onValueChange(eventController.getDaysLeft())(_ => updateValues())

    appendReplacing(rootElement)(fragment)
    updateValues();
}
