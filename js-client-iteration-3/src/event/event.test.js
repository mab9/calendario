import {EmptyEvent, EventView, OverView, MasterController} from './event.js';
import {Suite} from "../base/test/test.js";
import {config, env} from '../../config.js';
import {setValueOf} from '../base/presentationModel/presentationModel.js';
import {SelectionController} from '../base/controller/controller.js';

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

    let [year, availableDays, eventCounter] = masterContainer.children[0].children;

    // Test does not define a language and only contains the translation key.
    const yearHtml = '<span data-i18n="view.event.year">view.event.year</span>          <strong>';
    const availableDaysHtml = '<span data-i18n="view.event.availableDays">view.event.availableDays</span> <strong>';
    const eventsHtml = '<span data-i18n="view.event.events">view.event.events</span>        <strong>';

    assert.true(year.innerHTML.includes(yearHtml + new Date().getFullYear() +  '</strong>'));
    assert.true(availableDays.innerHTML.includes(availableDaysHtml + '20</strong>') > 0);
    assert.true(eventCounter.innerHTML.includes(eventsHtml + '0</strong>'));

    masterController.createItem();
    [year, availableDays, eventCounter] = masterContainer.children[0].children;

    assert.true(year.innerHTML.includes(yearHtml + new Date().getFullYear() +  '</strong>'));
    assert.true(availableDays.innerHTML.includes(availableDaysHtml + '20</strong>') > 0);
    assert.true(eventCounter.innerHTML.includes(eventsHtml + '1</strong>'));


    masterController.createItem();
    [year, availableDays, eventCounter] = masterContainer.children[0].children;

    assert.true(year.innerHTML.includes(yearHtml + new Date().getFullYear() +  '</strong>'));
    assert.true(availableDays.innerHTML.includes(availableDaysHtml + '20</strong>') > 0);
    assert.true(eventCounter.innerHTML.includes(eventsHtml + '2</strong>'));


    // Use on change listener (almost) at the end of the test, to avoid having side effects on following tests.
    // Create reference to model, to be able to clean up afterwards.
    let eventRef;
    masterController.onItemAdd(model => {
        eventRef = model;
        setValueOf(model.from)('2021-12-01');
        setValueOf(model.to)('2021-12-03');
    });

    masterController.createItem();
    [year, availableDays, eventCounter] = masterContainer.children[0].children;

    assert.true(year.innerHTML.includes(yearHtml + new Date().getFullYear() +  '</strong>'));
    assert.true(availableDays.innerHTML.includes(availableDaysHtml + '18</strong>') > 0);
    assert.true(eventCounter.innerHTML.includes(eventsHtml + '3</strong>'));

    masterController.removeItem(eventRef);
    [year, availableDays, eventCounter] = masterContainer.children[0].children;

    assert.true(year.innerHTML.includes(yearHtml + new Date().getFullYear() +  '</strong>'));
    assert.true(availableDays.innerHTML.includes(availableDaysHtml + '20</strong>') > 0);
    assert.true(eventCounter.innerHTML.includes(eventsHtml + '2</strong>'));
});

eventSuite.run();
