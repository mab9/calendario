import {ServiceController} from './src/service/service.controller.js';
import {translationService} from './src/base/service/translation.service.js';
import {dom} from './src/base/church/dom.js';
import {EventView, MasterController, OverView} from './src/event/event.js';
import {SelectionController} from './src/base/controller/controller.js';
import {setValueOf} from './src/base/presentationModel/presentationModel.js';

import {config} from './config.js';

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

                <div class="topnav-languages"></div>
            </NAV>
            <DIV id="content">
                <button class="plus-btn">+</button>
                <div class="overview"></div>
                <div class="events"></div>
            </div>
        </div>`
    );

    const masterController = MasterController();
    const selectionController = SelectionController("NoItem");
    const content = mainContainer.querySelector("#content");
    const languages = mainContainer.querySelector(".topnav-languages");

    const [createBtn, overViewContainer, eventContainer] = content.children;

    OverView(masterController, selectionController, overViewContainer);
    EventView(masterController, selectionController, eventContainer);

    createBtn.onclick = () => masterController.createItem();

    // translations
    const currentLang = translationService.currentLang;
    config.languages.forEach(lang => {
        const langElement = dom(`<a>${lang}</a>`);
        langElement.children[0].onclick = () => setValueOf(currentLang)(lang); // todo rework dom to avoid invoking children.
        languages.append(langElement)
    })

    events.forEach(item => masterController.processNewModel(item));
    root.replaceWith(mainContainer); // why replace???
}

const appRootId = window.appRootId;

ServiceController().vakansieService.loadeEvents(events => start(appRootId, events));
