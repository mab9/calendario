import {Suite} from "../test/test.js"
import {dom} from '../utils/dom.js';
import {router, push} from './router.js';

const suite = Suite("router");

const getContainerChildsById = containerId => document.querySelector(`#${containerId}`).children;

suite.add("setup test", assert => {
    // setup
    const containerId = 'router-test';

    // const path = postfix => '/vakansie/js-client-iteration-5/test.html' + postfix;
    const path = postfix => postfix;

    const fragment = dom(`
        <div id="${containerId}">
            <a id="${path('/home')}">Home</a>
            <a id="${path('/approval')}">Approval</a>
            <div id="app">routing content</div>
        </div>`
    )

    const body = document.querySelector('body');
    body.appendChild(fragment);

    let [home, approval, content] = getContainerChildsById(containerId);

    assert.is(content.innerHTML, 'routing content');

    const HomeView = (homectrl, rootElement) => {
        rootElement.innerHTML = ""; // clear
        rootElement.appendChild(dom('content-home'))
    }
    const HomeCtrl = () => ''; // mock, do nothing

    const ApprovalView = (homectrl, rootElement) => {
        rootElement.innerHTML = ""; // clear
        rootElement.appendChild(dom('content-approval'))
    }
    const ApprovalCtrl = () => ''; // mock, do nothing

    router.register('/home', [HomeView, HomeCtrl, content])
    router.register('/approval', [ApprovalView, ApprovalCtrl, content])

    // make this part generic - data-route='/about' replace this code to dom?
    home.addEventListener("click", event => push(event))
    approval.addEventListener("click", event => push(event))

    home.click();
    assert.is(content.innerHTML, 'content-home');
    approval.click();
    assert.is(content.innerHTML, 'content-approval');


    body.removeChild(document.querySelector(`#${containerId}`)); // clean up DOM
});

suite.run();
