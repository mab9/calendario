
import {vakansieService} from './src/service/event.service.remote.js';
import {start} from './src/vakansie.js'

const appRootId = window.appRootId;
const URL   = `http://${springServerName}:${springServerPort}${restPath}`;

vakansieService(URL).loadeEvents( events => start(appRootId, events) );
