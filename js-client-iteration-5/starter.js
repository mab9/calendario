import {translationService} from './src/base/service/translation.service.js';
import {child, dom} from './src/base/utils/dom.js';
import {setValueOf} from './src/base/presentationModel/presentationModel.js';
import {EventView} from './src/event/event.view.js';
import {EventController} from './src/event/event.controller.js';

import {config} from './config.js';
import {ServiceController} from './src/service/service.controller.js';

/**
 * @param {string} appRootIdParam we don't reuse the global name
 * @param {Event[]} events
 * @constructor
 */
const start = (appRootIdParam) => {

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
            <DIV id="content"></div>
        </div>`
    );

    const mainContainer = child(fragment);

    const eventController = EventController();
    const content = mainContainer.querySelector("#content");
    EventView(eventController, content);

    // replace functionality to the corresponding ctrl into an init method or something similar
    ServiceController().vakansieService.loadeEvents(events => events.forEach(item => eventController.processNewModel(item)));

    // translations
    const languages = mainContainer.querySelector(".topnav-languages");
    const currentLang = translationService.currentLang;
    config.languages.forEach(lang => {
        const langElement = dom(`<a>${lang}</a>`);
        langElement.children[0].onclick = () => setValueOf(currentLang)(lang);
        languages.append(langElement)
    })

    root.replaceWith(mainContainer); // why replace???
}

const appRootId = window.appRootId;

start(appRootId);
