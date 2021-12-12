import {dom} from "../base/church/dom.js";

export {CaliController, CaliView};

/**
 * @return CaliController
 * @constructor
 */
const CaliController = () => {

    const create = from => to => alert("new event from " + from  + " to " + to + ".");

    /**
     * @typedef {Readonly<object>} CaliController
     */
    return Object.freeze({
        create: create
    })
}

/**
 * @param rootElement
 * @param caliController
 * @constructor
 */
const CaliView = (rootElement, caliController) => {

    const view = dom(`
            <DIV id="content-section"></DIV>
                    <div>
                        <button id="create">+</button>
                        <div id="event-1" class="card">
                            <div>from 2021-12-03</div>
                            <div>to 2021-12-12</div>
                            <div>10 days in a row</div>
                            <div>6 holidays</div>
                            <div>Status: <strong>approved</strong></div>
                        </div>

                        <div id="event-2" class="card">
                            <div>from 2021-12-23</div>
                            <div>to 2021-12-28</div>
                            <div>5 days in a row</div>
                            <div>3 holidays</div>
                            <div>Status: <strong>requested</strong></div>
                        </div>

                        <div id="event-2" class="card">
                            <div>from 2022-02-12</div>
                            <div>to 2022-02-15</div>
                            <div>4 days in a row</div>
                            <div>4 holidays</div>
                            <div>Status: <strong>denied</strong></div>
                        </div>

                    </div>
            </DIV>`);

    const createBtn = view.querySelector('#create');
    createBtn.onclick = () => caliController.create("1")("2");

    rootElement.appendChild(view)
};
