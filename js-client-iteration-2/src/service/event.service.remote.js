import "./service.doc.js"
import {toEvent} from './jsonToModel.js';
import {client} from '../base/rest/restClient.js';

export {vakansieService}

/**
 * Concrete factory for local {@link VakansieService} functions.
 * @constructor
 * @returns {VakansieService}
 */
const vakansieService = URL => {

    const loadeEvents = withEvents =>
        client(URL)
        .then(json => {
            // console.log("All events:", JSON.stringify(json));
            const eventAttributes = json.map(item => toEvent(item))
            withEvents(eventAttributes);
        })
        .catch(err => console.error(err));

    return {loadeEvents: loadeEvents}
};
