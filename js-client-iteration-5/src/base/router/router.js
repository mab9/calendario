import {EventController} from '../../event/event.controller.js';
import {EventView} from '../../event/event.view.js';

// See export at the bottom of the file!

const Router = () => {
    let routes = {
        default: ['/', EventView, EventController] // todo supply element
    }

    const register = (path, routeDetails) => routes[path] = routeDetails;

    const route = path => {
        try {
            navigate(routes[path])
        } catch (e) {
            console.info('No route configured for given path:', path)
            navigate(routes['default']);
        }
    }

    const navigate = routeDetails => {
            const view = routeDetails[0];
            const ctrl = routeDetails[1];
            const element = routeDetails[2];
            console.info('navigate to', view, ctrl, element);
            view(ctrl, element); // route
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


const push = event => {
    let path = event.target.id; // Resolve route
    document.title = 'Vakansie ' + path.split('/')[path.split('/').length - 1]; // update title in window's tab
    router.route(path);  // Load content for this tab/page
    window.history.pushState({id: path}, `${path}`, `${path}`); // Push state change to the address bar
}

// Listen for PopStateEvent (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    if (event.origin !== "http://localhost:60000") {
        console.info('not equal to localhost', event)
        return;
    } // CORS guard

    let path = event.target.id; // resolve route
    router.route(path); // load content for this tab/page
});

export {push}
