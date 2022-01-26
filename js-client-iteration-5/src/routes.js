import {ApprovalController, ApprovalView} from './approval/approval.js';
import {EventController} from './event/event.controller.js';
import {EventView} from './event/event.view.js';
import {router} from './base/router/router.js';

router.register('/',           [EventView,    EventController]); // default / fallback
router.register('/event',      [EventView,    EventController]);
router.register('/approval',   [ApprovalView, ApprovalController]);
