import {dom} from "../base/church/dom.js";
import {Observable, ObservableList} from '../base/observable/observable.js';
import {
    Attribute,
    setLabelOf,
} from '../base/presentationModel/presentationModel.js';
import {eventListItemProjector} from './event.projector.js';
import {vakansieService} from '../service/event.service.remote.js';

export {MasterController, EventView, SelectionController, EmptyEvent};

const EmptyEvent = () => {                               // facade
    //const from = Attribute(new Date().toISOString().substr(0,10));
    const from = Attribute(''); // empty date
    setLabelOf(from)("From");

    const to = Attribute('');
    setLabelOf(to)("To");

    const state = Attribute("requested");
    setLabelOf(state)("State");

    // xyzAttr.setConverter( input => input.toUpperCase() );
    // xyzAttr.setValidator( input => input.length >= 3   );

    /**
     * @returns {Event} event
     */
    return {
        from: from,
        to: to,
        state: state,
    }
};





const MasterController = () => {

    const itemListModel = ObservableList([]); // observable array of events, this state is private

    const createItem = () => {
        const newItem = EmptyEvent();
        itemListModel.add(newItem);

        const URL = `http://${springServerName}:${springServerPort}${restPath}`;
        vakansieService(URL).createEvent(newItem)(event => {
            // glue created event to new Item
            setValueOf(newItem.id)(valueOf(event.id))
        })
    }

    /**
     * @returns {MasterController} Event Controller
     */
    return {
        addItem: itemListModel.add,
        removeItem: itemListModel.del,
        onItemAdd: itemListModel.onAdd,
        onItemRemove: itemListModel.onDel,
        createItem : createItem,
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

    const render = item => eventListItemProjector(masterController,
        selectionController, events, item);

    // binding
    masterController.onItemAdd(render);
    createBtn.onclick = () => masterController.createItem();

    rootElement.appendChild(view)
};

const SelectionController = () => {

    const selectedItem = Observable("NoItem");

    /**
     * @returns {SelectionController} Event Selection Controller
     */
    return {
        setSelectedItem: selectedItem.setValue,
        getSelectedItem: selectedItem.getValue,
        onItemSelected: selectedItem.onChange,
        clearSelection: () => selectedItem.setValue("NoItem"),
    }
};
