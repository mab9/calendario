import {Attribute, onValueChange, setValueOf, valueOf,} from '../base/presentationModel/presentationModel.js';
import {eventListItemProjector, eventOverviewProjector} from './event.projector.js';
import {ServiceController} from '../service/service.controller.js';
import {ListController} from '../base/controller/controller.js';
import {Event} from './event.model.js';
import "../base/utils/dates.js" // we import no symbols as they are set on the respective prototypes

export {EventController, EventView, OverView};

const EventController = () => {

    const availableDays = Attribute(20); // fetch value from remote
    const totalEventDays = Attribute(0);
    const daysLeft = Attribute(valueOf(availableDays));
    const eventService = ServiceController().vakansieService;

    const eventListCtrl = ListController();  // observable array of events, this state is private

    const createItem = () => {
        const newItem = Event();

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
     * @returns {EventController} Event Controller
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
 * @param eventController
 * @param selectionController
 * @param rootElement
 * @constructor
 */
const OverView = (eventController, selectionController, rootElement) => {
    eventOverviewProjector(eventController, rootElement);
}

/**
 * @param eventController
 * @param selectionController
 * @param rootElement
 * @constructor
 */
const EventView = (eventController, selectionController, rootElement) => {
    const render = model => eventListItemProjector(eventController, selectionController, rootElement, model);

    // binding
    eventController.onItemAdd(render);
};
