export {appendFirst, appendReplacing}

// deprecated
const appendFirst = rootElement => newElements => {
    rootElement.firstChild
        ? rootElement.prepend(newElements)
        : rootElement.append(newElements);
}

const appendReplacing = rootElement => newElements => {
    while (rootElement.hasChildNodes()) {
        rootElement.removeChild(rootElement.firstChild);
    }
    rootElement.appendChild(newElements);
}
