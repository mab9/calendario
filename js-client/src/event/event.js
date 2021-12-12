import {dom} from "../base/church/dom.js";
import {Observable, ObservableList} from '../base/observable/observable.js';
import {
    Attribute,
    LABEL,
    valueOf,
    setValueOf,
    setLabelOf,
} from '../base/presentationModel/presentationModel.js';

export {MasterController, EventView, SelectionController};

const Event = () => {                               // facade
    const from = Attribute(new Date());
    setLabelOf(from)("From");

    const to  = Attribute(new Date());
    setLabelOf(to)("To");

    const status  = Attribute("requested");
    setLabelOf(status)("Status");

    // xyzAttr.setConverter( input => input.toUpperCase() );
    // xyzAttr.setValidator( input => input.length >= 3   );

    return {
        from:   from,
        to:     to,
        status: status,
    }
};


/**
 * @return MasterController
 * @constructor
 */
const MasterController = () => {

    const itemListModel = ObservableList([]); // observable array of events, this state is private

    const create = from => to => alert(
        "new event from " + from + " to " + to + ".");

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
                <div>10 days in a row</div>
                <div>6 holidays</div>
                <div>Status: <strong>approved</strong></div>
            </div>
            <div id="event-2" class="card">
                <div>from 2021-12-23</div>
                <div>to 2021-12-28</div>
                <div>5 days in a row</div>
                <div>3 holidays</div>
                <div>Status: <strong>requested</strong></div>
            </div>
            <div id="event-2" class="card">
                <div>from 2022-02-12</div>
                <div>to 2022-02-15</div>
                <div>4 days in a row</div>
                <div>4 holidays</div>
                <div>Status: <strong>denied</strong></div>
            </div>
        </div>
    `);

    const createBtn = view.querySelector('#create');
    createBtn.onclick = () => masterController.addItem();

    const eventsContainer = view.querySelector('.events');

    masterController.onItemAdd(item => {
        eventsContainer.appendChild(dom(`
             <div id="event-2" class="card">
                <div>from ` + valueOf(item.from).toISOString().substring(0, 10) + `</div>
                <div>to ` + valueOf(item.to).toISOString().substring(0, 10) + `</div>
                <div>4 days in a row</div>
                <div>4 holidays</div>
                <div>Status: <strong>` + valueOf(item.status) + `</strong></div>
            </div>
        `));
    })

    rootElement.appendChild(view)
};


/**
 * @return SelectionController
 * @constructor
 */
const SelectionController = () => {

    const selectedPersonObs = Observable("NoPerson");
    return {}

    /*
    return {
        setSelectedPerson : selectedPersonObs.setValue,
        getSelectedPerson : selectedPersonObs.getValue,
        onPersonSelected:   selectedPersonObs.onChange,
        clearSelection:     () => selectedPersonObs.setValue(NoPerson),
    }*/
};
