//import {router} from '/calendario/js-client-iteration-5/src/base/router/router.js';
// The best would be to supply the absolute path. So the example routes may be copy pasted to any place...
// This is not the case at the moment, because there is no focus on the framework.
import {router} from './router.js';  // we make this module executed by the JS engine.
import {dom} from '../utils/dom.js';

const FaqView = (_, rootElement) => {
    rootElement.innerHTML = ""; // clear
    rootElement.appendChild(dom('content-faq'))
}

const SettingsView = (_, rootElement) => {
    rootElement.innerHTML = ""; // clear
    rootElement.appendChild(dom('content-settings'))
}

router.register('/faq',      [FaqView, () => '']);
router.register('/settings', [SettingsView, () => '']);
