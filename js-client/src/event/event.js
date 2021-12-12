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
    const from = Attribute(new Date());
    setLabelOf(from)("From");

    const to = Attribute(new Date());
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
        <div class="events">
            <button class="plus-btn" id="create">+</button>
            <div id="event-1" class="card">
                <div>from 2021-12-03</div>
                <div>to 2021-12-12</div>
                <div>state: <strong>approved</strong></div>
            </div>
            <div id="event-2" class="card">
                <div>from 2021-12-23</div>
                <div>to 2021-12-28</div>
                <div>state: <strong>requested</strong></div>
            </div>
            <div id="event-2" class="card">
                <div>from 2022-02-12</div>
                <div>to 2022-02-15</div>
                <div>state: <strong>denied</strong></div>
            </div>
        </div>
    `);

    const createBtn = view.querySelector('#create');
    createBtn.onclick = () => masterController.addItem();

    const eventsContainer = view.querySelector('.events');

    const render = item => eventListItemProjector(masterController, selectionController, eventsContainer, item);

    // binding
    masterController.onItemAdd(render);

    rootElement.appendChild(view)
};

/**
 * @return SelectionController
 * @constructor
 */
const SelectionController = () => {

    const selectedItem = Observable("NoItem");
    return {}

    /*
    return {
        setSelectedItem : selectedItemObs.setValue,
        getSelectedItem : selectedItemObs.getValue,
        onItemSelected:   selectedItemObs.onChange,
        clearSelection:     () => selectedItemObs.setValue("NoItem"),
    }*/
};
