import {Suite} from "../test/test.js"
import {dom} from '../utils/dom.js';

const suite = Suite("router");

const getContainerChildsById = containerId => document.querySelector(`#${containerId}`).children;


suite.add("setup test", assert => {
    // setup
    const containerId = 'router-test';

    const fragment = dom(`
        <div id="${containerId}">
            <a href="/home">Home</a>
            <a href="/calendar">Calendar</a>
            <div id="app">routing content</div>
        </div>`
    )

    const body = document.querySelector('body');
    body.appendChild(fragment);

    const [home, calendar, content] = getContainerChildsById(containerId);

    assert.is(content.innerHTML, 'routing content');
});

suite.run();
