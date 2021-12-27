import {ServiceController} from './src/service/service.controller.js';
import {translationService} from './src/base/service/translation.service.js';
import {dom} from './src/base/church/dom.js';
import {EventView, MasterController, OverView, SelectionController} from './src/event/event.js';

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

    events.forEach(item => masterController.processNewModel(item));
    root.replaceWith(mainContainer); // why replace???
}

const appRootId = window.appRootId;

ServiceController().vakansieService.loadeEvents(events => start(appRootId, events));
