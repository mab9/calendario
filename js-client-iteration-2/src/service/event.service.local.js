import "./service.doc.js"
import {toEvent} from './jsonToModel.js';
import {setValueOf} from '../base/presentationModel/presentationModel.js';

export {vakansieService}

const vakansieService = () => {

    /** @type Event[] */
    const events = [
        {id: 0, from: '2021-12-20', to: '2021-12-24', state: 'accepted'},
        {id: 1, from: '2021-12-31', to: '2022-01-15', state: 'requested'},
        {id: 2, from: '2022-04-12', to: '2022-04-17', state: 'requested'},
    ];

    const loadeEvents = withEvents => {
        const eventAttributes = events.map(item => toEvent(item))
        withEvents(eventAttributes);
    }

    const createEvent = event => callback => {
        setValueOf(event.id)(Math.random() % 2);
        callback(event);
    }

    const removeEvent = event => {
        console.info(event)
    }

    const updateEvent = event => callback => {
        callback(event);
    }

    /**
     * Concrete factory for local {@link VakansieService} functions.
     * @constructor
     * @returns {VakansieService}
     */
    return {
        loadeEvents: loadeEvents,
        createEvent: createEvent,
        removeEvent: removeEvent,
        updateEvent: updateEvent,
    }
};
