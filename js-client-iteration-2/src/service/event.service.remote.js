import "./service.doc.js"
import {toEvent, toJson } from './jsonToModel.js';
import {client} from '../base/rest/restClient.js';
import {valueOf} from '../base/presentationModel/presentationModel.js';

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

    const removeEvent = event => {
        client(URL + '/' + valueOf(event.id), 'DELETE')
        .then(json => console.info(json))
        .catch(err => console.error(err));
    }

    const updateEvent = event => callback => {
        const data = toJson(event);
        data['userId'] = 1; // mocked id
        client(URL, 'PUT', data)
        .then(json => callback(toEvent(json)))
        .catch(err => console.error(err));
    }

    /**
     * Concrete factory for remote {@link VakansieService} functions.
     * @constructor
     * @returns {VakansieService}
     */
    return {
        loadeEvents : loadeEvents,
        createEvent : createEvent,
        removeEvent : removeEvent,
        updateEvent : updateEvent,
    }
};
