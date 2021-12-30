import {Suite} from "../test/test.js"
import {dom, child} from "./dom.js";

const util = Suite("util-dom");

util.add("Convert to HTML element", assert => {

    const element = dom(`<h1>yeah</h1>`);
    const h1 = document.createElement("h1")

    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, h1.nodeName);
    assert.is(element.childNodes[0].innerHTML, "yeah");

});

util.add("Document Fragment vs Element", assert => {
    const id = 'test-dom-fragment';
    const h1 = document.createElement("h1")
    const body = document.querySelector('body');

    // test fragment
    const fragment = dom(`<h1 id="${id}">yeah</h1>`);
    body.appendChild(fragment);
    const expectedElementOfFragment = document.querySelector('#' +id);

    assert.is(expectedElementOfFragment.parentNode.nodeName, body.nodeName);
    assert.is(expectedElementOfFragment.nodeName, h1.nodeName);
    assert.is(expectedElementOfFragment.innerHTML, "yeah");

    // child nodes references are lost, the fragment still exists.
    assert.is(fragment.nodeName, '#document-fragment');
    assert.is(fragment.childNodes.length, 0);
    body.removeChild(expectedElementOfFragment); // cleanup

    // compare element
    const element = document.createElement('div');
    element.innerHTML = `<h1 id="${id}">yeah</h1>`;
    body.appendChild(element)
    const expectedElementOfElement = document.querySelector('#' +id);

    assert.true(expectedElementOfElement.parentNode.nodeName !== body.nodeName)
    assert.is(expectedElementOfElement.parentNode.nodeName, element.nodeName);
    assert.is(expectedElementOfElement.nodeName, h1.nodeName);
    assert.is(expectedElementOfElement.innerHTML, "yeah");

    // all child node references stays
    assert.is(element.nodeName, 'DIV');
    assert.is(element.childNodes.length, 1);
    body.removeChild(element); // cleanup
});

util.add("Child of fragment helper", assert => {
    const id = 'test-dom-fragment';
    const h1 = document.createElement("h1")
    const body = document.querySelector('body');

    const fragment = dom(`<h1 id="${id}">yeah</h1>`);
    const expectedElement = child(fragment);

    body.appendChild(fragment);
    assert.is(expectedElement.parentNode.nodeName, body.nodeName);
    assert.is(expectedElement.nodeName, h1.nodeName);
    assert.is(expectedElement.innerHTML, "yeah");

    // fragment already lost references...
    assert.true(child(fragment) === undefined);

    expectedElement.innerHTML = '<span>strong yeah</span>';
    const expectedElementFromDom = document.querySelector('#' +id);

    assert.true(expectedElement === expectedElementFromDom);
    assert.is(expectedElementFromDom.innerHTML, '<span>strong yeah</span>');

    body.removeChild(expectedElement); // cleanup
});

util.add("Convert nested to HTML elements", assert => {

    const element = dom(`<div><h1>yeah</h1></div>`);

    const div = document.createElement("div")
    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, div.nodeName);
    assert.true(element.childNodes[0].innerHTML === "<h1>yeah</h1>");

    const childNode = element.childNodes[0];
    const h1 = document.createElement("h1")

    assert.is(childNode.childElementCount, 1);
    assert.is(childNode.childNodes[0].nodeName, h1.nodeName);
    assert.is(childNode.childNodes[0].innerHTML, "yeah");
});

util.add("Convert to html and do i18n", assert => {
    const key = "test.dom.title";
    const element = dom(`<div><h1 data-i18n="${key}">yeah</h1></div>`);

    // At this moment the i18n should already have changed the inner text.
    // The translation service was not initialized and therefore the default (i18n key)
    // will be displayed!

    const div = document.createElement("div")
    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, div.nodeName);
    //assert.true(element.childNodes[0].innerHTML === `<h1 data-i18n="${key}">${key}</h1>`);
    // the i18n id is need to discharge the listener
    assert.true(element.childNodes[0].innerHTML.includes(`<h1 data-i18n="${key}" data-i18n-id="`))
    assert.true(element.childNodes[0].innerHTML.includes(`${key}</h1>`));

    const childNode = element.childNodes[0];
    const h1 = document.createElement("h1")

    assert.is(childNode.childElementCount, 1);
    assert.is(childNode.childNodes[0].nodeName, h1.nodeName);
    assert.is(childNode.childNodes[0].innerHTML, key);
});

util.add("Convert to html table", assert => {
    const key = "test.dom.title";
    const element = dom(`
        <table>
            <thead><tr><th data-i18n="${key}">1</th></tr></thead>
            <tbody><tr><td>2</td></tr></tbody>
        </table>
    `);

    const table = document.createElement("table")
    assert.is(element.childElementCount, 1);
    assert.is(element.childNodes[0].nodeName, table.nodeName);

    const thead = element.querySelector("thead")

    // dom can't parse table elements!
    thead.firstChild.appendChild(dom('<th>Empty</th>'))

    assert.is(thead.innerText, key + "Empty")

});

util.add("Convert to html class test", assert => {
    const html = dom(`<div class="fancy"></div>`);
    const element = html.querySelector("div");
    element.className = "fancy";

    const classes = element.classList;
    assert.is(classes.length, 1)
    assert.is(classes[0], "fancy")
});

util.run();
