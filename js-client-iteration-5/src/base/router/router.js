import {EventController} from '../../event/event.controller.js';
import {EventView} from '../../event/event.view.js';

// See export at the bottom of the file!

const Router = () => {
    let routes = {
        default: ['/', EventView, EventController]
    };

    const register = (path, routeArgs) => {
        console.info('register route', path);
        routes[path] = routeArgs;
    }


    // navigate / route ...
    const route = path => {
        try {
            console.info("resolve route from path", path)
            return routes[path];
        } catch (e) {
            return routes['default'];

        }
    }

    const navigate = () => {

    }

    /**
     * @constructor
     * @returns {Router}
     */
    return {
        register : register,
        route    : route,
    }
}

const router = Router(); // singleton, init with ES6 module to avoid two instances. See export at the top of the file
export {router};


function push(event) {
    let id = event.target.id; // resolve route
    document.title = 'Vakansie ' + id.split('/')[id.split('/').length - 1]; // update title in window's tab

    // Load content for this tab/page
    const route = router.route(id);
    route[0](route[1],route[2])

    // push state change to the address bar
    window.history.pushState({id}, `${id}`, `${id}`);
}

// Listen for PopStateEvent
// (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    if (event.origin !== "http://localhost:60000") {
        console.info('not equal to localhost', event)
        return;
    } // CORS guard

    // load content for this tab/page
    const route = router.route(id);
    route[0](route[1],route[2])
});

export {push}
