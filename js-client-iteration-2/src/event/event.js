import {dom} from "../base/church/dom.js";
import {Observable, ObservableList} from '../base/observable/observable.js';
import {
    Attribute,
    onValueChange,
    setLabelOf,
    setValueOf,
    valueOf,
} from '../base/presentationModel/presentationModel.js';
import {eventListItemProjector} from './event.projector.js';
import {vakansieService} from '../service/event.service.remote.js';
import {appendReplacing} from '../base/church/appends.js';
import {isFunction} from '../base/church/isfnc.js';

export {MasterController, EventView, OverView, SelectionController, EmptyEvent};

const EmptyEvent = () => {                               // facade
    const id = Attribute(''); // empty id
    //const from = Attribute(new Date().toISOString().substr(0,10));
    const from = Attribute(''); // empty date
    setLabelOf(from)("From");

    const to = Attribute('');
    setLabelOf(to)("To");

    const state = Attribute("requested");
    setLabelOf(state)("State");

    const count = () => {
        if (!valueOf(from) || !valueOf(to)) {
            return 0;
        }
        // todo create date function
        return new Date(valueOf(to)).getDate() - new Date(
            valueOf(from)).getDate();
    }

    // xyzAttr.setConverter( input => input.toUpperCase() );
    // xyzAttr.setValidator( input => input.length >= 3   );

    /**
     * @returns {Event} event
     */
    return {
        id: id,
        from: from,
        to: to,
        state: state,
        count: count,
    }
};

const MasterController = () => {

    const availableDays = Attribute(20); // fetch value from remote
    const totalEventDays = Attribute(0);
    const daysLeft = Attribute(valueOf(availableDays));

    const eventListCtrl = ListController();  // observable array of events, this state is private

    const createItem = () => {
        const newItem = EmptyEvent();

        const URL = `http://${springServerName}:${springServerPort}${restPath}`;
        vakansieService(URL).createEvent(newItem)(event => {
            // glue created event to new Item
            // todo keep track of possible lost changes...
            setValueOf(newItem.id)(valueOf(event.id))
        })

        processNewModel(newItem);
    }

    const processNewModel = model => {
        eventListCtrl.addModel(model);
        onValueChange(model.from)(_ => updateModel(model));
        onValueChange(model.to)(_ => updateModel(model));
        updateDaysLeft();
    }

    const updateModel = model => {
        const URL = `http://${springServerName}:${springServerPort}${restPath}`;
        vakansieService(URL).updateEvent(model)(event => {
            // todo keep track of possible lost changes...
            console.info("event was updated")
        })
        updateDaysLeft();
    }

    const updateDaysLeft = () => {
        setValueOf(totalEventDays)(0);
        eventListCtrl.forEach(event => setValueOf(totalEventDays)(valueOf(totalEventDays) + event.count()));
        setValueOf(daysLeft)(valueOf(availableDays) - valueOf(totalEventDays));
    }

    eventListCtrl.onModelRemove(item => {
        const URL = `http://${springServerName}:${springServerPort}${restPath}`;
        vakansieService(URL).removeEvent(item);
        updateDaysLeft();
    })

    /**
     * @returns {MasterController} Event Controller
     */
    return {
        addItem: eventListCtrl.addModel,
        removeItem: eventListCtrl.removeModel,
        onItemAdd: eventListCtrl.onModelAdd,
        onItemRemove: eventListCtrl.onModelRemove,
        createItem: createItem,
        count: eventListCtrl.size,
        getDaysLeft: () => daysLeft,
        processNewModel: processNewModel,
    }
}

/**
 * @param masterController
 * @param selectionController
 * @param rootElement
 * @constructor
 */
const OverView = (masterController, selectionController, rootElement) => {

    const render = () => {
        const view = dom(`
            <div class="card">
                <span>Year           <strong>2021</strong></span>
                <span>Available days <strong>${valueOf(masterController.getDaysLeft())}</strong></span>
                <span>Events         <strong>${masterController.count()}</strong></span>
            </div>`);

        appendReplacing(rootElement)(view)
    }

    // todo rework, render will be invoked multiple times ...
    masterController.onItemAdd(_ => render())
    masterController.onItemRemove(_ => render())
    onValueChange(masterController.getDaysLeft())(_ => render())
}

/**
 * @param masterController
 * @param selectionController
 * @param rootElement
 * @constructor
 */
const EventView = (masterController, selectionController, rootElement) => {
    const render = item => eventListItemProjector(masterController,
        selectionController, rootElement, item);

    // binding
    masterController.onItemAdd(render);
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

const ListController = () => {

    const innerList = [];                        // internal use only
    const listModel = ObservableList(innerList); // observable array of models, this state is private

    const findById = modelId => innerList.find(
        model => valueOf(model.id) === modelId);

    const expressionMaker = fnc => callFnc => {
        isFunction(fnc)
            ? callFnc(fnc)
            : callFnc(_ => fnc());
    }

    return {
        addModel: model => listModel.add(model),
        findById,
        removeModel: listModel.del,
        onModelAdd: fnc => expressionMaker(fnc)(listModel.onAdd),
        onModelRemove: fnc => expressionMaker(fnc)(listModel.onDel),
        size: () => listModel.count(),
        forEach: fnc => innerList.forEach(item => fnc(item)),
        reset: () => innerList.splice(0, innerList.length), // todo rework so that listeners get triggered -> getAll for each removeModel?
        pop: () => innerList[innerList.length - 1],
    }
};
