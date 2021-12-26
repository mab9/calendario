import {dom} from "./base/church/dom.js";
import {translationService} from "./base/service/translation.service.js";
import {
    EventView,
    OverView,
    MasterController,
    SelectionController
} from "./event/event.js";

export {start} ;

/**
 * @param {string} appRootId
 * @param {Event[]} events
 * @constructor
 */
const start = (appRootId, events) => {

    translationService.init();

    const CONTENT_WRAPPER = 'root';
    const root = document.getElementById(CONTENT_WRAPPER)

    const mainContainer = dom(`
        <div id="${appRootId}">
            <NAV class="topnav">
                <DIV class="topnav-header"></DIV>
                <A>Vakansie</A>
            </NAV>
            <DIV id="content">
                <button class="plus-btn">+</button>
                <div class="overview"></div>
                <div class="events"></div>
            </div>
        </div>`
    );



    const masterController = MasterController();
    const selectionController = SelectionController();
    const content = mainContainer.querySelector("#content");

    const [createBtn, overViewContainer, eventContainer] = content.children;


    OverView(masterController, selectionController, overViewContainer);
    EventView(masterController, selectionController, eventContainer);

    createBtn.onclick = () => masterController.createItem();

    events.forEach(item => masterController.addItem(item));
    root.replaceWith(mainContainer); // why replace???
}
