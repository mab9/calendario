import {padLeft} from "./strings.js";
import "./times.js" // we import no symbols as they are set on the respective prototypes
import {Suite} from "../test/test.js"


const util = Suite("util-strings");

// extending the prototype of many objects
util.add("padLeft", assert => {

    const collect = [];

    (10).times(n => collect.push(n));

    assert.is(padLeft("a", 2), " a");
    assert.is(padLeft("a", 1), "a");
    assert.is(padLeft("a", 0), "a");

});

util.run();
