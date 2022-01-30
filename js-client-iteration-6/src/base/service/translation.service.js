import {config} from "../../../config.js";
import {doIf} from "../utils/maybe.js";
import {Attribute, onValueChange, valueOf} from '../presentationModel/presentationModel.js';
import {ObservableI18n} from '../observable/observable.js';

export {i18n, I18N_CURRENT_LANG} // See export at the bottom of the file!

const I18N_CURRENT_LANG = 'TRANSLATION_CURRENT_LANGUAGE';

let elementIdCounter = 0;

/**
 * @typedef i18n
 * @type     {function}              - function to provide a small api for translations
 * @param {!key} key                 - the i18n key that is defined in a language json file
 * @param {!destination} destination - the html element where the translation is rendered into
 */
const i18n = (key) => (destination) => {
    if (!key) {     // guard
        console.error('No translation key provided ლ(ಠ_ಠლ)');
        return 'no.i18n.key.provided';
    }

    const callback = (translation) => {
        destination.type === 'button'
            ? (() => destination.value = translation)()
            : (() => destination.innerText = translation)();
    }

    // const id = node.dataset.i18nId;  // access dataset value
    // add element id to be able to discharge the observable on render.
    destination.dataset.i18nId = elementIdCounter;
    translationService.translate(key, callback, elementIdCounter++); // 0 is at the moment not needed. would be another strategy to test discharging...
};

const TranslationService = () => {
    let isInitialized = false;
    let langTranslations = {};
    const isLangLoaded = ObservableI18n(false);

    const currentLang = Attribute( // set default language
        localStorage.getItem(I18N_CURRENT_LANG)
            ? localStorage.getItem(I18N_CURRENT_LANG)
            : config.lang);

    const loadCurrentLang = () => {
        const lang = valueOf(currentLang);
        isLangLoaded.setValue(false);

        // Fetching resources from a relative path. By activating the router,
        // fetching from a relative path will break the relative url.
        const rel = window.serverDocumentRoot && window.serverDocumentRoot.length > 1 ? window.serverDocumentRoot + '/' : '';
        const url = rel + 'src/i18n/' + lang + '.json';

        fetch(url)
        .then(response => response.json())
        .then(json => {
            langTranslations = json;
            isLangLoaded.setValue(true);
        })
    }

    onValueChange(currentLang)(lang => {
        localStorage.setItem(I18N_CURRENT_LANG, lang);
        if (isInitialized) {
            loadCurrentLang();
        }
    });

    const resolveKey = (key) => {
        // default if no lang is loaded
        if (!Object.keys(langTranslations).length) {
            return key;
        }

        const translation = langTranslations[key]
        if (!translation) {
            console.warn('No translation found ¯\\_(ツ)_/¯ for key: ', key);
            return key
        }
        return translation;
    };

    const resolveCallback = (callback, languageReady, key) => doIf(languageReady)(callback(resolveKey(key)));

    // Translate languages without page refresh
    const translate = (key, callback, elementId) => {
        // discharge listener before duplicating...
        isLangLoaded.onChangeI18n(value => resolveCallback(callback, value, key), elementId);
        resolveCallback(callback, isLangLoaded.getValue(), key);
    }

    const dischargeListener = element => {
        const nodes = element.querySelectorAll('[data-i18n-id]');
        nodes.forEach(node => {
            const key = node.dataset.i18nId;
            isLangLoaded.discharge(key);
        })
    }

    // is used to prevent to load the current lang
    // via the currentLang.onChange definition
    const init = () => {
        isInitialized = true;
        loadCurrentLang();
    }

    /**
     * @constructor
     * @returns {TranslationService}
     */
    return Object.freeze({
        translate: translate,
        init: init,
        isLangLoaded: isLangLoaded,
        currentLang: currentLang,
        dischargeListener: dischargeListener,
    })
}

const translationService = TranslationService(); // singleton, init with ES6 module to avoid two instances. See export at the top of the file
export {translationService}
