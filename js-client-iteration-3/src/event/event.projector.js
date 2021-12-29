import {onValueChange, setValueOf, valueOf} from '../base/presentationModel/presentationModel.js';
import {dom, child} from '../base/church/dom.js';
import {translationService} from '../base/service/translation.service.js';
import {appendReplacing} from '../base/church/appends.js';

export {eventListItemProjector, eventOverviewProjector}

/**
 * @param masterController
 * @param selectionController
 * @param rootElement
 * @param item
 * @constructor
 */
const eventListItemProjector = (masterController, selectionController, rootElement, item) => {

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
    fromInput.value = valueOf(item.from);
    fromInput.onchange = () => setValueOf(item.from)(fromInput.value)

    const toInput = to.querySelector('input');
    toInput.value = valueOf(item.to);
    toInput.onchange = () => setValueOf(item.to)(toInput.value)

    const stateText = state.querySelector('strong');
    stateText.innerText = valueOf(item.state);

    trash.onclick = _ => masterController.removeItem(item);

    card.onmouseover = _ => selectionController.setSelectedModel(item);
    card.onmouseleave = _ => selectionController.clearSelection();

    selectionController.onModelSelected(selected => selected === item
        ? trash.children[0].classList.add("selected")
        : trash.children[0].classList.remove("selected"))

    masterController.onItemRemove((removedItem, removeMe) => {
        if (removedItem !== item) {
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
 * @param masterController
 * @param rootElement
 * @constructor
 */
const eventOverviewProjector = (masterController, rootElement) => {

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
        placeHolders[1].innerText = valueOf(masterController.getDaysLeft());
        placeHolders[2].innerText = masterController.count();
    }

    masterController.onItemAdd(_ => updateValues())
    masterController.onItemRemove(_ => updateValues())
    onValueChange(masterController.getDaysLeft())(_ => updateValues())

    appendReplacing(rootElement)(fragment)
    updateValues();
}
