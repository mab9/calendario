
import { MasterController, SelectionController, EventView } from './event.js';
import { Suite }                from "../base/test/test.js";

const eventSuite = Suite("Event");

eventSuite.add("crud", assert => {

    // setup
    const masterContainer = document.createElement("div");

    const masterController    = MasterController();
    const selectionController = SelectionController();

    // create the views, incl. binding
    EventView(masterController, selectionController, masterContainer);

    const [createBtn, container] = masterContainer.children;
    const elementsPerRow = 1;
    const defaultElements = 0;

    assert.is(container.children.length, 0*elementsPerRow+ defaultElements);

    masterController.addItem();
    assert.is(container.children.length, 1*elementsPerRow+ defaultElements);

    masterController.addItem();
    assert.is(container.children.length, 2*elementsPerRow+ defaultElements);

    createBtn.click();
    assert.is(container.children.length, 3*elementsPerRow+ defaultElements);

    const firstDeleteButton = container.querySelector('.icon-delete')
    firstDeleteButton.click();
    assert.is(container.children.length, 2*elementsPerRow+ defaultElements);
});

eventSuite.run();
