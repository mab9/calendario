
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

    const container = masterContainer.children[0]; // get inner div
    const elementsPerRow = 1;

    // 4 = 3 start elements + 1 create button

    assert.is(container.children.length, 0*elementsPerRow + 4);

    masterController.addItem();
    assert.is(container.children.length, 1*elementsPerRow + 4);

    masterController.addItem();
    assert.is(container.children.length, 2*elementsPerRow + 4);

    const createButton = container.querySelector('.plus-btn')
    createButton.click();
    assert.is(container.children.length, 3*elementsPerRow + 4);

    const firstDeleteButton = container.querySelector('.icon-delete')
    firstDeleteButton.click();
    assert.is(container.children.length, 2*elementsPerRow + 4);
});

eventSuite.run();
