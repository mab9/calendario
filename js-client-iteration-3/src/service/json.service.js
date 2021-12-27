import {EmptyEvent} from '../event/event.js';
import {setValueOf, valueOf} from '../base/presentationModel/presentationModel.js';

export {toEvent, toJson}

const toEvent = jsonEvent => {

    const emptyEvent = EmptyEvent();

    if (jsonEvent['id']) {
        setValueOf(emptyEvent.id)(jsonEvent.id)
    }
    setValueOf(emptyEvent.from)(jsonEvent.from)
    setValueOf(emptyEvent.to)(jsonEvent.to)
    setValueOf(emptyEvent.state)(jsonEvent.state)

    return emptyEvent;
};


const toJson = event => {
    return {
        id: '',
        from: valueOf(event.from),
        to: valueOf(event.to),
        state: valueOf(event.state),
        userId: ''
    }
};
