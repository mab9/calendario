import {presentationModelFromAttributeNames, setValueOf, valueOf} from "../base/presentationModel/presentationModel.js";

export {Event, ALL_EVENT_ATTRIBUTE_NAMES}

/*
 * @typedef Event
 * @type     {object}
 * @property {!number} id     - unique integer number; mandatory.
 * @property {number}  userId - integer number; mandatory.
 * @property {date}    from   - start date of the event
 * @property {date}    to     - end date of the event
 * @property {string}  state  - is the event approved
 * @example  {id:0, userId:0, from:2021-12-27, to:2021-12-31, state:'requested'}
 */

const ALL_EVENT_ATTRIBUTE_NAMES = ['id', 'userId', 'from', 'to', 'state'];

const Event = () => {      // facade
    const model = presentationModelFromAttributeNames(ALL_EVENT_ATTRIBUTE_NAMES);

    setValueOf(model.state)('requested');

     const count = () => {
         if (!valueOf(model.from) || !valueOf(model.to)) {
             return 0;
         }
         return new Date(valueOf(model.to)).countDaysBetween(new Date(valueOf(model.from)));
     }

    return {
        count,
        ...model
    }
}
