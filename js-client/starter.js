import {dom} from "./src/base/church/dom.js";
import {translationService} from "./src/base/service/translation.service.js";
import {EventController, EventView} from "./src/event/event.js";

export {start} ;

const appRootId = window.appRootId;
translationService.init();

const start = (appRootId, authenticated) => {
    const CONTENT_WRAPPER = 'root';
    const ctrl = EventController();

    const root = document.getElementById(CONTENT_WRAPPER)
    const vakansie = dom(`<div id="${appRootId}">`);

    const nav = dom(`
            <DIV class="topnav-header"></DIV>
            <NAV class="topnav">
                <a>Vakansie</a>
            </NAV>
    `)

    vakansie.appendChild(nav);

    EventView(vakansie, ctrl);
    root.replaceWith(vakansie); // why replace???
}

// replace to dedicated starter
const render = authenticated => start(appRootId, authenticated);
render(appRootId, true)
