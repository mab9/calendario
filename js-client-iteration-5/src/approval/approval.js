import {dom} from '../base/utils/dom.js';

export {ApprovalController, ApprovalView}

/**
 * @param mainController
 * @param rootElement
 * @constructor
 */
const ApprovalView = (mainController, rootElement) => {

    const fragment = dom(`
        <h1>Approval yeah!</h1>
    `);

    const container = fragment; // no enclosing div

    rootElement.append(container);
}

const ApprovalController = () => {
    return {}
}
