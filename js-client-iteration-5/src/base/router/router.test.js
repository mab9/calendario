import {Suite} from "../test/test.js"

const suite = Suite("router");

suite.add("empty test", assert => {
    assert.is(5, 5);
});

suite.run();
