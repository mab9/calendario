import {EmptyEvent, EventView, OverView, MasterController, SelectionController} from './event.js';
import {Suite} from "../base/test/test.js";
import {config, env} from '../../config.js';

const eventSuite = Suite("Event");

config.environment = env.LOCAL;
// declare for service controller. Remove dependency if possible...
window.springServerName = 'test-runner.ch';
window.springServerPort = '9999';
window.restPath = '';

// todo rework tests according new starter js and add overview tests

eventSuite.add("crud", assert => {

    // setup
    const masterContainer = document.createElement("div");

    const masterController = MasterController();
    const selectionController = SelectionController();

    // create the views, incl. binding
    EventView(masterController, selectionController, masterContainer);

    const elementsPerRow = 1;
    const defaultElements = 0;

    assert.is(masterContainer.children.length, 0 * elementsPerRow + defaultElements);

    masterController.addItem(EmptyEvent());
    assert.is(masterContainer.children.length, 1 * elementsPerRow + defaultElements);

    masterController.addItem(EmptyEvent());
    assert.is(masterContainer.children.length, 2 * elementsPerRow + defaultElements);

    masterController.createItem();
    assert.is(masterContainer.children.length, 3 * elementsPerRow + defaultElements);

    const firstDeleteButton = masterContainer.querySelector('.trash-event')
    firstDeleteButton.click();
    assert.is(masterContainer.children.length, 2 * elementsPerRow + defaultElements);
});

eventSuite.add("overview", assert => {

    // setup
    const masterContainer = document.createElement("div");

    const masterController = MasterController();
    const selectionController = SelectionController();

    // create the views, incl. binding
    OverView(masterController, selectionController, masterContainer);

    assert.is(masterContainer.children.length, 1);

    const [year, availableDays, eventCounter] = masterContainer.children[0].children;

    assert.true(year.innerHTML.indexOf(2021) > 0)
});

eventSuite.run();
