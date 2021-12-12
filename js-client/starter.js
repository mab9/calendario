import {dom} from "./src/base/church/dom.js";
import {translationService} from "./src/base/service/translation.service.js";

export {start} ;

const appRootId = window.appRootId;
translationService.init();

const start = (appRootId, authenticated) => {
    const CONTENT_WRAPPER = 'root';
    const root = document.getElementById(CONTENT_WRAPPER)
    const vakansie = dom(`<div id="${appRootId}">`);
    root.replaceWith(vakansie); // why replace???
}

// replace to dedicated starter
const render = authenticated => start(appRootId, authenticated);
render(appRootId, true)