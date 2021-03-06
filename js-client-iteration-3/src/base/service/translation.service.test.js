import {i18n, I18N_CURRENT_LANG, translationService} from "./translation.service.js";
import {Suite} from "../test/test.js";
import {config} from "../../../config.js";
import {setValueOf, valueOf} from '../presentationModel/presentationModel.js';

const util = Suite("translation-service");

util.add("service initialization", assert => {
    // reset cache and pre initialized observable
    localStorage.setItem(I18N_CURRENT_LANG, config.lang);
    const currentLang = translationService.currentLang;
    setValueOf(currentLang)(config.lang);

    assert.true(!translationService.isLangLoaded.getValue());
    assert.is(valueOf(currentLang), config.lang);

    const destination = document.createElement("div")
    const key = "test.dom.title";
    i18n(key)(destination);

    assert.is(destination.innerText, key);

    translationService.init();

    // todo add async assert to check if the key was translated.
});

util.add("language change", assert => {
    // reset cache and pre initialized observable
    localStorage.setItem(I18N_CURRENT_LANG, config.lang);
    const currentLang = translationService.currentLang;
    setValueOf(currentLang)(config.lang);

    assert.true(!translationService.isLangLoaded.getValue());
    assert.is(valueOf(currentLang), config.lang);

    setValueOf(currentLang)('en');
    assert.is(localStorage.getItem(I18N_CURRENT_LANG), 'en');
});

util.run();
