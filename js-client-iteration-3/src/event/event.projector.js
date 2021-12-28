import {setValueOf, valueOf} from '../base/presentationModel/presentationModel.js';
import {dom} from '../base/church/dom.js';

export {eventListItemProjector}

/**
 * @param masterController
 * @param selectionController
 * @param rootElement
 * @param item
 * @constructor
 */
const eventListItemProjector = (masterController, selectionController, rootElement, item) => {

    // <span data-i18n="test.dom.title"></span>
    const eventElement = dom(`
        <div class="card">
            <div class="card-date">From <input type="date"></div>
            <div class="card-date">To<input type="date"></div>
            <div> State <strong></strong></div>
            <div><i class="trash-event fas fa-trash-alt"></i></div>
        </div>
    `);

    const card = eventElement.children[0];
    const [from, to, state, trash] = card.children;

    // todo next steps:
    // -> rewrite event projector more simple to have just html code and whats needed at one place
    // -> add i18n stuff

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
        rootElement.removeChild(card);
        selectionController.clearSelection();
        removeMe();
    });

    rootElement.prepend(card);
};
