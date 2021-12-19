
import {vakansieService} from './src/service/event.service.local.js';
import {start} from './src/vakansie.js'

const appRootId = window.appRootId;

vakansieService().loadeEvents( events => start(appRootId, events) );
