import {Event} from '../event/event.model.js';
import {setValueOf, valueOf} from '../base/presentationModel/presentationModel.js';

export {toEvent, toJson}

const toEvent = jsonEvent => {

    const event = Event();

    if (jsonEvent['id']) {
        setValueOf(event.id)(jsonEvent.id)
    }
    setValueOf(event.from)(jsonEvent.from)
    setValueOf(event.to)(jsonEvent.to)
    setValueOf(event.state)(jsonEvent.state)

    /**
     * @returns {Event} Event
     */
    return event;
};


const toJson = event => {
    /**
     * @returns {json} event as json object
     */
    return {
        id: '',
        from: valueOf(event.from),
        to: valueOf(event.to),
        state: valueOf(event.state),
        userId: ''
    }
};
