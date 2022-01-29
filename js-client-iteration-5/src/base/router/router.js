import {externalBindings} from '../utils/dom.js';
// See export at the bottom of the file!

const Router = () => {

    const DEFAULT_ROUTE = '/'; // hmm, there is not always a default route defined...

    let routes = {}

    const getRoutes = () => Object.keys(routes)

    const register = (path, routeDetails) => routes[path] = routeDetails;

    const route = (path, doUpdateAdressBar = false) => {
        const targetRoute = resolveRoute(path); // intellij server serves from subdirectories...
        if (routeExist(targetRoute)) {
            goto(targetRoute, doUpdateAdressBar)
        } else {
            console.error('No route configured for given path:', targetRoute);
            goto(DEFAULT_ROUTE, doUpdateAdressBar);
        }
    }

    const goto = (path, doUpdateAddressBar) => {
        const routeDetails = routes[path];
        navigate(path, routeDetails);
        updateAddressBar(path, doUpdateAddressBar);
        document.title = 'Vakansie ' + path.split('/')[1]; // Update window title
    }

    const navigate = (path, routeDetails) => {
        const view = routeDetails[0];
        const ctrl = routeDetails[1];
        const container = document.querySelector('#app');
        // clean up container before adding new stuff
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild);
        }

        // todo think about memory leaks caused from dom(...) instant translation
        const initializedCtrl = ctrl();
        view(initializedCtrl, container); // update content

        if (Object.keys(initializedCtrl).includes('postConstructor')) {
            initializedCtrl.postConstructor();
        }
    }

    const updateAddressBar = (path, doUpdateAddressBar) => {
        if (doUpdateAddressBar) {
            const absolutePath = resolveAbsolutePath(path);
            window.history.pushState({id: absolutePath}, '', absolutePath); // state / data, title, url.
        }
    }

    const resolveAbsolutePath = path => window.serverDocumentRoot === '/' ? path : window.serverDocumentRoot + path;

    // intellij server serves from subdirectories...
    const resolveRoute = path => {
        const noIndex = path.endsWith('index.html') ? path.replace('index.html', '') : path;
        return window.serverDocumentRoot === '/' ? noIndex : noIndex.replace(window.serverDocumentRoot, '');
    }

    const routeExist = path => {
        return routes[path] ? true : false;
    }

    const resolveInitRoute = () => {
        const path = resolveRoute(window.location.pathname);
        if (routeExist(path)) {
            // Replace state, to be able to resolve the very first requested path, on clicking back button all the way back, to the first entry.
            const absolutePath = resolveAbsolutePath(path);
            window.history.replaceState({id: absolutePath}, '', absolutePath); // state / data, title, url.
            return path;
        } else {
           // No route matches the requested url path. Show 404 page.
          // window.location.href = window.location.origin + '/404.html?notFound=' + window.location.pathname;
        }
    }

    /**
     * @constructor
     * @returns {Router}
     */
    return {
        register: register,
        route: route,
        resolveInitRoute: resolveInitRoute,
        routes : getRoutes
    }
}


// replace this code to router object?
// Bind push state to dom function.
// So, we don't need to supply listeners by hand for each router-link.
externalBindings.addModel(elements => {
    applyRouterBindings(elements);
})

const applyRouterBindings = elements => {
    const nodes = elements.querySelectorAll('[data-router-link]');
    nodes.forEach(node => {
        node.addEventListener("click", event => {
            // Resolve route and route to it
            router.route(event.target.dataset.routerLink, true);
        })
    })
}

// Listen for PopStateEvent (Back or Forward buttons are clicked)
window.addEventListener("popstate", event => {
    // Because any window can send / receive messages from other window it is important to verify the sender's / receiver's identity:
    if (window.location.origin !== event.srcElement.location.origin) {
        return;
    }
    router.route(window.history.state.id);
});

const router = Router(); // singleton, init with ES6 module to avoid having multiple router instances
export {router};
