import {EmptyEvent} from '../event/event.js';
import {setValueOf} from '../base/presentationModel/presentationModel.js';

export {toEvent}

const toEvent = jsonEvent => {

    const emptyEvent = EmptyEvent();

    //setValueOf(emptyEvent.id)(jsonEvent.id)
    setValueOf(emptyEvent.from)(jsonEvent.from)
    setValueOf(emptyEvent.to)(jsonEvent.to)
    setValueOf(emptyEvent.state)(jsonEvent.state)

    return emptyEvent;
};
