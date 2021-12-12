import {dom} from "./src/base/church/dom.js";
import {translationService} from "./src/base/service/translation.service.js";
import {MasterController, SelectionController, EventView} from "./src/event/event.js";

export {start} ;

const appRootId = window.appRootId;
translationService.init();

const start = (appRootId, authenticated) => {
    const CONTENT_WRAPPER = 'root';
    const root = document.getElementById(CONTENT_WRAPPER)

    const mainContainer = dom(`
        <div id="${appRootId}">
            <NAV class="topnav">
                <DIV class="topnav-header"></DIV>
                <A>Vakansie</A>
            </NAV>
            <DIV id="content"></div>
        </div>`
    );


    const masterController = MasterController();
    const selectionController = SelectionController();
    const content = mainContainer.querySelector("#content");

    EventView(masterController, selectionController, content);
    root.replaceWith(mainContainer); // why replace???
}

// replace to dedicated starter
const render = authenticated => start(appRootId, authenticated);
render(appRootId, true)
