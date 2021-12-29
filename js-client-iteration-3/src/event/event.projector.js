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
            <div><i class="trash-event fas fa-trash-alt"></i></div>
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
