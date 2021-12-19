import {Suite} from "../base/test/test.js";
import {toEvent} from "./jsonToModel.js";
import {valueOf} from '../base/presentationModel/presentationModel.js';

const jsonToModelSuite = Suite("jsonToModel");

jsonToModelSuite.add("event", assert => {

    const jsonEvent = {
        id: 1,
        from: '2020-12-24',
        to: '2020-12-26',
        state: 'requested'
    };
    const event = toEvent(jsonEvent);

    //assert.is(valueOf(event.id)    , 1);
    assert.is(valueOf(event.from)  , '2020-12-24');
    assert.is(valueOf(event.to)    , '2020-12-26');
    assert.is(valueOf(event.state) , 'requested');

});

jsonToModelSuite.run();
