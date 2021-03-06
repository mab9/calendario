import {ServiceController} from './src/service/service.controller.js';
import {translationService} from './src/base/service/translation.service.js';
import {child, dom} from './src/base/utils/dom.js';
import {EventView, EventController, OverView} from './src/event/event.js';
import {SelectionController} from './src/base/controller/controller.js';
import {setValueOf} from './src/base/presentationModel/presentationModel.js';

import {config} from './config.js';

/**
 * @param {string} appRootIdParam we don't reuse the global name
 * @param {Event[]} events
 * @constructor
 */
const start = (appRootIdParam, events) => {

    translationService.init();

    const CONTENT_WRAPPER = 'root';
    const root = document.getElementById(CONTENT_WRAPPER)

    const fragment = dom(`
        <div id="${appRootIdParam}">
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

    const mainContainer = child(fragment);
    const eventCtrl = EventController();
    const selectionController = SelectionController("NoItem");
    const content = mainContainer.querySelector("#content");
    const languages = mainContainer.querySelector(".topnav-languages");

    const [createBtn, overViewContainer, eventContainer] = content.children;

    OverView(eventCtrl, selectionController, overViewContainer);
    EventView(eventCtrl, selectionController, eventContainer);

    createBtn.onclick = () => eventCtrl.createItem();

    // translations
    const currentLang = translationService.currentLang;
    config.languages.forEach(lang => {
        const langElement = dom(`<a>${lang}</a>`);
        langElement.children[0].onclick = () => setValueOf(currentLang)(lang);
        languages.append(langElement)
    })

    events.forEach(item => eventCtrl.processNewModel(item));
    root.replaceWith(mainContainer); // why replace???
}

const appRootId = window.appRootId;

ServiceController().vakansieService.loadeEvents(events => start(appRootId, events));
