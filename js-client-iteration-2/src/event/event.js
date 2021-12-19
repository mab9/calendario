import {dom} from "../base/church/dom.js";
import {Observable, ObservableList} from '../base/observable/observable.js';
import {
    Attribute,
    setLabelOf,
} from '../base/presentationModel/presentationModel.js';
import {eventListItemProjector} from './event.projector.js';

export {MasterController, EventView, SelectionController};

/**
 * @return Event
 * @constructor
 */
const Event = () => {                               // facade
    //const from = Attribute(new Date().toISOString().substr(0,10));
    const from = Attribute(''); // empty date
    setLabelOf(from)("From");

    const to = Attribute('');
    setLabelOf(to)("To");

    const state = Attribute("requested");
    setLabelOf(state)("State");

    // xyzAttr.setConverter( input => input.toUpperCase() );
    // xyzAttr.setValidator( input => input.length >= 3   );

    return {
        from: from,
        to: to,
        state: state,
    }
};

/**
 * @return MasterController
 * @constructor
 */
const MasterController = () => {

    const itemListModel = ObservableList([]); // observable array of events, this state is private

    return {
        addItem:      () => itemListModel.add(Event()),
        removeItem:   itemListModel.del,
        onItemAdd:    itemListModel.onAdd,
        onItemRemove: itemListModel.onDel,
    }
}

/**
 * @param masterController
 * @param selectionController
 * @param rootElement
 * @constructor
 */
const EventView = (masterController, selectionController, rootElement) => {

    const view = dom(`
        <button class="plus-btn">+</button>
        <div class="events"></div>
    `);

    const [createBtn, events] = view.children;

    const render = item => eventListItemProjector(masterController, selectionController, events, item);

    // binding
    masterController.onItemAdd(render);
    createBtn.onclick = () => masterController.addItem();

    rootElement.appendChild(view)
};

/**
 * @return SelectionController
 * @constructor
 */
const SelectionController = () => {

    const selectedItem = Observable("NoItem");

    return {
        setSelectedItem : selectedItem.setValue,
        getSelectedItem : selectedItem.getValue,
        onItemSelected  : selectedItem.onChange,
        clearSelection  : () => selectedItem.setValue("NoItem"),
    }
};
