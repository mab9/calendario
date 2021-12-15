import {
    labelOf, onValueChange,
    setValueOf,
    valueOf
} from './presentation.model.js';
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

    const eventElement = document.createElement("DIV");
    eventElement.innerHTML = `<div class="card"></div>`;

    const event = eventElement.children[0];

    const fromInputElement = dateProjector(item.from);
    const toInputElement  = dateProjector(item.to);
    const stateElement = dom(` <div> State: <strong> ${valueOf(item.state)} </strong></div>`);

    const deleteElement = document.createElement("DIV");
    deleteElement.onclick = _ => masterController.removeItem(item);
    deleteElement.classList = "icon-delete";
    deleteElement.innerText = "x";

    event.appendChild(fromInputElement);
    event.appendChild(toInputElement);
    event.appendChild(stateElement);
    event.appendChild(deleteElement);

    eventElement.onmouseover = _ => selectionController.setSelectedItem(item);
    eventElement.onmouseleave = _ => selectionController.clearSelection();

    selectionController.onItemSelected(selected =>
        selected === item
          ? deleteElement.classList.add("selected")
          : deleteElement.classList.remove("selected")
    );

    // define item.from and to date formatt. either date -> then upadte the binding, or text, update set value.
    masterController.onItemRemove((removedItem, removeMe) => {
        if (removedItem !== item) return;
        rootElement.removeChild(eventElement);
        selectionController.clearSelection();
        removeMe();
    });

    rootElement.appendChild(eventElement);
};

const dateProjector = dateAttr => {
    const element = dom(`
        <div class="card-date">
            ${labelOf(dateAttr)}
            <input type="date" value="${valueOf(dateAttr).toISOString().substring(0, 10)}">
        </div>`
    );

    applyDateBindings(element.querySelector("input"))(dateAttr);
    return element;
};

const applyDateBindings = element => dateAttr => {
    element.onchange = () => setValueOf(dateAttr)(element.value)
}
