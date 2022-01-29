

const serverDocumentRoot = () => window.serverDocumentRoot.endsWith('/') ? window.serverDocumentRoot.substr(0, window.serverDocumentRoot.length -1) : window.serverDocumentRoot

// clean up DOM and reset URL
const body = document.querySelector('body');
body.removeChild(document.querySelector(`#app`));
const absolutePath = serverDocumentRoot() + '/test.html'
window.history.pushState({id: absolutePath}, `${absolutePath}`, `${absolutePath}`);
document.title = 'Vakansie';
