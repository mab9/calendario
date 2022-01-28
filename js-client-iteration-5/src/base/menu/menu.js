import {Observable} from "../observable/observable.js";
import {config} from "../../../config.js";
import {router} from '../router/router.js';

// See export at the bottom of the file!

const roles = {
    SUPERUSER: "superuser",
    TENANT: "tenant",
}

const Menu = () => {
    let entries = JSON.parse(`{ "data" : [
                            {
                              "id":      "0",
                              "title":   "menu.entry.event",
                              "path" :   "/event",
                              "roles":   [],
                              "visible": true
                            },
                            {
                              "id":      "1",
                              "title":   "menu.entry.approval",
                              "path" :   "/approval",
                              "roles":   ["${roles.TENANT}","${roles.SUPERUSER}"],
                              "visible": true
                            }
                           ]}`);

    // initial entry
    let selectedEntry = Observable(entries.data[config.startMenuEntry])

    const setSelectedEntry = value => {
        const newEntry = entries.data.find(entry => entry.id === value)
        selectedEntry.setValue(newEntry);
    }

    // todo handle listener clean up on view changes. Especially the instant translation memory leaks...
    // Update the main content view
    selectedEntry.onChange(entry => {
        router.route(entry.path, true)
    })

    /**
     * @constructor
     * @returns {Menu}
     */
    return {
        getEntries: () => entries.data,
        getVisibleEntries: () => entries.data.filter(item => item.visible),
        getSelectedEntry: selectedEntry.getValue,
        setSelectedEntry: setSelectedEntry, // todo now there are two navigation functions (data-router-link and set selected entry)
        onSelectedEntryChange: selectedEntry.onChange,
    }
}

const menu = Menu(); // singleton, init with ES6 module to avoid having multiple router instances
export {menu};
