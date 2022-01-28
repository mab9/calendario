import {Suite} from "../test/test.js"
import {menu} from "./menu.js";

const util = Suite("Menu ");

util.add("Json Menu to JS object", assert => {
    const entry = menu.getEntries()[0];
    assert.is(entry.id, '0');
    assert.is(entry.title, 'menu.entry.event');
    assert.is(entry.path, '/event');
    assert.is(entry.roles + '', [] + ''); // convert array to string, to avoid fanc empty array comparison
    assert.is(entry.visible, true);
});

util.add("Sorted menu entries", assert => {
    let entry = menu.getEntries()[0];
    assert.is(entry.id, '0');
    assert.is(entry.title, 'menu.entry.event');

    entry = menu.getEntries()[1];
    assert.is(entry.id, '1');
    assert.is(entry.title, 'menu.entry.approval');
});

util.add("Selected entry", assert => {
    assert.is(menu.getSelectedEntry().id, '0');

    menu.setSelectedEntry('1')
    assert.is(menu.getSelectedEntry().id, '1');
})

util.run();
