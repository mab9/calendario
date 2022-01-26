import {translationService} from './src/base/service/translation.service.js';
import {child, dom} from './src/base/utils/dom.js';
import {setValueOf} from './src/base/presentationModel/presentationModel.js';

import {config} from './config.js';
import './src/routes.js'
import {router} from './src/base/router/router.js';

/**
 * @param {string} appRootIdParam we don't reuse the global name
 * @param {Event[]} events
 * @constructor
 */
const start = (appRootIdParam, route = '/event') => {

    translationService.init();

    const CONTENT_WRAPPER = 'root';
    const root = document.getElementById(CONTENT_WRAPPER)

    const fragment = dom(`
        <div id="${appRootIdParam}">
            <NAV class="topnav">
                <DIV class="topnav-header"></DIV>
                <A>Vakansie</A>
                <A class="menu-item" data-router-link="/event">Event</A>
                <A class="menu-item" data-router-link="/approval">Approval</A>

                <div class="topnav-languages"></div>
            </NAV>
            <DIV id="app"></div>
        </div>`
    );

    const mainContainer = child(fragment);

    // Todo replace init loading
    //const eventController = EventController();
    //const content = mainContainer.querySelector("#app");
    //EventView(eventController, content);
//
    //// replace functionality to the corresponding ctrl into an init method or something similar
    //ServiceController().vakansieService.loadeEvents(events => events.forEach(item => eventController.processNewModel(item)));

    // translations
    const languages = mainContainer.querySelector(".topnav-languages");
    const currentLang = translationService.currentLang;
    config.languages.forEach(lang => {
        const langElement = dom(`<a>${lang}</a>`);
        langElement.children[0].onclick = () => setValueOf(currentLang)(lang);
        languages.append(langElement)
    })

    root.replaceWith(mainContainer); // why replace???
    router.route(route);
}

const appRootId = window.appRootId;

// SPA routing
// Prevent loading app on not existing and requested route.
// The rerouting to the 404 page consumes some milliseconds
// until fully loaded. In the meantime, the thread is rendering the following code.
// We don't want this.
const initRoute = router.resolveInitRoute();
if (initRoute) start(appRootId, initRoute);
