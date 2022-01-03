import {Suite} from "../test/test.js"
import {dom} from '../utils/dom.js';
import {router, push} from './router.js';

const suite = Suite("router");

const getContainerChildsById = containerId => document.querySelector(`#${containerId}`).children;

suite.add("spa routing ", assert => {
    // setup
    const containerId = 'router-test';

    const fragment = dom(`
        <div id="${containerId}">
            <a id="/home">Home</a>
            <a id="/approval">Approval</a>
            <div id="app">routing content</div>
        </div>`
    )

    const body = document.querySelector('body');
    body.appendChild(fragment);

    let [home, approval, content] = getContainerChildsById(containerId);

    assert.is(content.innerHTML, 'routing content');

    const HomeView = (_, rootElement) => {
        rootElement.innerHTML = ""; // clear
        rootElement.appendChild(dom('content-home'))
    }

    const ApprovalView = (_, rootElement) => {
        rootElement.innerHTML = ""; // clear
        rootElement.appendChild(dom('content-approval'))
    }

    router.register('/home', [HomeView, () => '', content])
    router.register('/approval', [ApprovalView, () => '', content])

    // make this part generic - data-route='/about' replace this code to dom?
    home.addEventListener("click", event => push(event))
    approval.addEventListener("click", event => push(event))

    home.click();
    assert.is(content.innerHTML, 'content-home');
    approval.click();
    assert.is(content.innerHTML, 'content-approval');

    // clean up DOM and reset URL
    body.removeChild(document.querySelector(`#${containerId}`));
    const absolutePath = window.serverDocumentRoot
    window.history.pushState({id: absolutePath}, `${absolutePath}`, `${absolutePath}`);
});

suite.run();
