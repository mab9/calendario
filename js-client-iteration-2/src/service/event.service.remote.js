import "./service.doc.js"
import {toEvent, toJson } from './jsonToModel.js';
import {client} from '../base/rest/restClient.js';

export {vakansieService}

const vakansieService = URL => {

    const loadeEvents = withEvents =>
        client(URL)
        .then(json => {
            // console.log("All events:", JSON.stringify(json));
            const eventAttributes = json.map(item => toEvent(item))
            withEvents(eventAttributes);
        })
        .catch(err => console.error(err));

    const createEvent = event => callback => {
        const data = toJson(event);
        client(URL, 'POST', data)
        .then(json => callback(toEvent(json)))
        .catch(err => console.error(err));
    }

    /**
     * Concrete factory for local {@link VakansieService} functions.
     * @constructor
     * @returns {VakansieService}
     */
    return {
        loadeEvents: loadeEvents,
        createEvent : createEvent,
    }
};
