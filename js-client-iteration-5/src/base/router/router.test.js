import {Suite} from "../test/test.js"
import {dom} from '../utils/dom.js';
import {router} from './router.js';
import './routes.test.js' // import to test - register from another file. module must be loaded.

const suite = Suite("router");

const getContainerChildsById = containerId => document.querySelector(`#${containerId}`).children;

suite.add("spa routing ", assert => {
    const containerId = 'router-test';

    const fragment = dom(`
        <div id="${containerId}">
            <a data-router-link="/home">Home</a>
            <a data-router-link="/approval">Approval</a>
            <div id="app">routing content</div>
        </div>`
    )

    const body = document.querySelector('body');
    body.appendChild(fragment);

    let [home, approval, content] = getContainerChildsById(containerId);

    const HomeView = (_, rootElement) => {
        rootElement.innerHTML = ""; // clear
        rootElement.appendChild(dom('content-home'))
    }

    const ApprovalView = (_, rootElement) => {
        rootElement.innerHTML = ""; // clear
        rootElement.appendChild(dom('content-approval'))
    }

    router.register('/home', [HomeView, () => ''])
    router.register('/approval', [ApprovalView, () => ''])

    assert.is(content.innerHTML, 'routing content');
    assert.is(location.pathname, serverDocumentRoot() + '/test.html');

    home.click(); // route to home
    assert.is(content.innerHTML, 'content-home');
    assert.is(location.pathname, serverDocumentRoot() + '/home');

    approval.click(); // route to approval
    assert.is(content.innerHTML, 'content-approval');
    assert.is(location.pathname, serverDocumentRoot() + '/approval');

    // clean up DOM and reset URL
    body.removeChild(document.querySelector(`#${containerId}`));
    const absolutePath = window.serverDocumentRoot
    window.history.pushState({id: absolutePath}, `${absolutePath}`, `${absolutePath}`);
    document.title = 'Vakansie';
});

const serverDocumentRoot = () => window.serverDocumentRoot.endsWith('/') ? window.serverDocumentRoot.substr(0, window.serverDocumentRoot.length -1) : window.serverDocumentRoot

suite.add("add routes from another file ", assert => {
    const containerId = 'router-test';

    const fragment = dom(`
        <div id="${containerId}">
            <a data-router-link="/faq">Faq</a>
            <a data-router-link="/settings">Settings</a>
            <div id="app">routing content</div>
        </div>`
    )

    const body = document.querySelector('body');
    body.appendChild(fragment);

    assertFaqSettingsAndDoDomCleanUp(assert)(containerId);
});

const assertFaqSettingsAndDoDomCleanUp = assert => containerId => {

    let [faq, settings, content] = getContainerChildsById(containerId);

    faq.click(); // route to faq
    assert.is(content.innerHTML, 'content-faq');
    assert.is(location.pathname, serverDocumentRoot() + '/faq');
    settings.click(); // route to approval
    assert.is(content.innerHTML, 'content-settings');
    assert.is(location.pathname, serverDocumentRoot() + '/settings');

    // clean up DOM and reset URL
    const body = document.querySelector('body');
    body.removeChild(document.querySelector(`#${containerId}`));
    const absolutePath = serverDocumentRoot() + '/test.html'
    window.history.pushState({id: absolutePath}, `${absolutePath}`, `${absolutePath}`);
    document.title = 'Vakansie';
}
suite.run();
