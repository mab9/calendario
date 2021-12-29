import {dom} from "../base/church/dom.js";
import {Attribute, onValueChange, setLabelOf, setValueOf, valueOf,} from '../base/presentationModel/presentationModel.js';
import {eventListItemProjector} from './event.projector.js';
import {appendReplacing} from '../base/church/appends.js';
import {ServiceController} from '../service/service.controller.js';
import {ListController} from '../base/controller/controller.js';
import "../base/utils/dates.js" // we import no symbols as they are set on the respective prototypes

export {MasterController, EventView, OverView, EmptyEvent};

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
        return new Date(valueOf(to)).countDaysBetween(new Date(valueOf(from)));
    }

    // example code for converter
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
    const eventService = ServiceController().vakansieService;

    const eventListCtrl = ListController();  // observable array of events, this state is private

    const createItem = () => {
        const newItem = EmptyEvent();

        eventService.createEvent(newItem)(event => {
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
        eventService.updateEvent(model)(event => {
            // todo keep track of possible lost changes...
        })
        updateDaysLeft();
    }

    const updateDaysLeft = () => {
        setValueOf(totalEventDays)(0);
        eventListCtrl.forEach(event => setValueOf(totalEventDays)(valueOf(totalEventDays) + event.count()));
        setValueOf(daysLeft)(valueOf(availableDays) - valueOf(totalEventDays));
    }

    eventListCtrl.onModelRemove(item => {
        eventService.removeEvent(item);
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

    const view = dom(`
            <div class="card">
                <span><span data-i18n="view.event.year"></span>          <strong></strong></span>
                <span><span data-i18n="view.event.availableDays"></span> <strong></strong></span>
                <span><span data-i18n="view.event.events"></span>        <strong></strong></span>
            </div>`);

    const placeHolders = view.querySelectorAll('strong');

    placeHolders[0].innerText = new Date().getFullYear();

    const updateValues = () => {
        placeHolders[1].innerText = valueOf(masterController.getDaysLeft());
        placeHolders[2].innerText = masterController.count();
    }

    masterController.onItemAdd(_ => updateValues())
    masterController.onItemRemove(_ => updateValues())
    onValueChange(masterController.getDaysLeft())(_ => updateValues())

    appendReplacing(rootElement)(view)
    updateValues();
}

/**
 * @param masterController
 * @param selectionController
 * @param rootElement
 * @constructor
 */
const EventView = (masterController, selectionController, rootElement) => {
    const render = item => eventListItemProjector(masterController, selectionController, rootElement, item);

    // binding
    masterController.onItemAdd(render);
};
