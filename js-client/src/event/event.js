import {dom} from "../base/church/dom.js";
import {Observable} from '../base/observable/observable.js';

export {MasterController, EventView, SelectionController};

/**
 * @return MasterController
 * @constructor
 */
const MasterController = () => {

    const create = from => to => alert(
        "new event from " + from + " to " + to + ".");

    /**
     * @typedef {Readonly<object>} EventController
     */
    return Object.freeze({
        create: create
    })
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
    createBtn.onclick = () => masterController.create("1")("2");

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
