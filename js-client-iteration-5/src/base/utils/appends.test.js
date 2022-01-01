import {appendReplacing, appendFirst} from './appends.js';
import {Suite} from "../test/test.js"

const util = Suite("util-appends");


util.add("appendFirst", assert => {
    const main = document.createElement("DIV");
    const first = document.createElement("DIV");
    const second = document.createElement("DIV");
    const third = document.createElement("DIV");

    first.innerText = 'first';
    second.innerText = 'second';
    third.innerText = 'third';

    appendFirst(main)(first);
    assert.is(main.children[0].innerText, 'first');

    appendFirst(main)(second);
    assert.is(main.children[0].innerText, 'second');
    assert.is(main.children[1].innerText, 'first');

    appendFirst(main)(third);
    assert.is(main.children[0].innerText, 'third');
    assert.is(main.children[1].innerText, 'second');
    assert.is(main.children[2].innerText, 'first');
});

util.add("appendReplacing", assert => {
    const main = document.createElement("DIV");
    const first = document.createElement("DIV");
    const second = document.createElement("DIV");
    const third = document.createElement("DIV");

    first.innerText = 'first';
    second.innerText = 'second';
    third.innerText = 'third';

    appendFirst(main)(first);
    appendFirst(main)(second);
    assert.is(main.children[0].innerText, 'second');
    assert.is(main.children[1].innerText, 'first');

    appendReplacing(main)(third)
    assert.is(main.children.length, 1);
    assert.is(main.children[0].innerText, 'third');
});

util.run();
