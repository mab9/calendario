import {i18n} from "../service/translation.service.js";
import {ListController} from '../controller/controller.js';

export {dom, child, externalBindings}

const externalBindings = ListController(); // todo - in which order are those bindings applied?

/**
 * The difference of a document fragment to an element disappears when it is added to the DOM.
 * What happens is that all the child nodes of the document fragment are inserted at the location
 * in the DOM where the document fragment is inserted. The content of the document fragment
 * gets inserted but not the document fragment itself. The fragment itself continues to exist but now has no children.
 *
 * This allows to insert multiple nodes into the DOM at the same time.
 * @param innerString
 * @returns {DocumentFragment}
 */
const dom = innerString => {
    let frag = document.createDocumentFragment();

    const elem = document.createElement('div');
    elem.innerHTML = innerString.trim();

    while (elem.childNodes[0]) {
        frag.appendChild(elem.childNodes[0]);
    }

    // i18n translation
    const nodes = frag.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
        const key = node.dataset.i18n;

        // this might set many translations without discharging old ones
        i18n(key)(node);
    })

    // todo describe external binding function and rework i18n translations from above, as well all dom tests ;-p
    // No dom function pollution with dependencies...
    // Beside that, we don't load modules that are not in use.
    externalBindings.getAll().forEach(observable => {
        observable(frag) // execute external function
    })

    return frag;
};

/**
 * Helper function to retrieve elements inside a fragment.
 * The dom function from above creates html elements that are pasted into a fragment...
 *
 * @param element
 * @returns {*}
 */
const child = element => {
    return element.childNodes[0];
}
