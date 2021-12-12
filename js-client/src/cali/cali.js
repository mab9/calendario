import {dom} from "../base/church/dom.js";

export {CaliController, CaliView};

/**
 * @return CaliController
 * @constructor
 */
const CaliController = () => {

    /**
     * @typedef {Readonly<object>} CaliController
     */
    return Object.freeze({})
}

/**
 * @param rootElement
 * @param caliController
 * @constructor
 */
const CaliView = (rootElement, caliController) => {

    const render = () => {
        const layoutElement = dom(`
            <DIV id="content-section"></DIV>
                    I'm in the main content.
            </DIV>`);

        rootElement.appendChild(layoutElement)
    };

    render();
};
