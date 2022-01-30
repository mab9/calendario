import {ApprovalController, ApprovalView} from './approval/approval.js';
import {EventController} from './event/event.controller.js';
import {EventView} from './event/event.view.js';
import {router} from './base/router/router.js';

export {routes}

// Use of an enum to avoid route mismatches
const routes = {
    DEFAULT  : '/',
    EVENT    : '/event',
    APPROVAL : '/approval'
}

router.register(routes.DEFAULT,  [EventView,    EventController]); // fallback route
router.register(routes.EVENT,    [EventView,    EventController]);
router.register(routes.APPROVAL, [ApprovalView, ApprovalController]);
