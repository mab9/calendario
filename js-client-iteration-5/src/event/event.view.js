import {eventListItemProjector, eventOverviewProjector} from './event.projector.js';
import {SelectionController} from '../base/controller/controller.js';
import "../base/utils/dates.js"
import {dom} from '../base/utils/dom.js';
import {ServiceController} from '../service/service.controller.js';

export {EventView};

/**
 * @param eventController
 * @param rootElement
 * @constructor
 */
const EventView = (eventController, rootElement) => {

    const fragment = dom(`
        <button class="plus-btn">+</button>
        <div class="overview"></div>
        <div class="events"></div>
    `);

    const container = fragment; // no enclosing div
    const selectionController = SelectionController("NoItem");

    const [createBtn, overViewContainer, eventContainer] = container.children;

    createBtn.onclick = () => eventController.createItem();
    OverView(eventController, selectionController, overViewContainer);
    EventDetailView(eventController, selectionController, eventContainer);

    // replace functionality to the corresponding ctrl into an init method or something similar
    ServiceController().vakansieService.loadeEvents(events => events.forEach(item => eventController.processNewModel(item)));

    rootElement.append(container);
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
const EventDetailView = (eventController, selectionController, rootElement) => {
    const render = model => eventListItemProjector(eventController, selectionController, rootElement, model);

    // binding
    eventController.onItemAdd(render);
};
