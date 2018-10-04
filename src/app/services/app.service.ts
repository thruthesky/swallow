import { Injectable } from '@angular/core';
import { SwallowService } from './swallow/swallow.service';


import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(
        public s: SwallowService
    ) {

        this.initDebug();

    }



    initDebug() {
        if (environment.debug) {
            window['a'] = this;
        }
    }

    /**
     * Returns a string of language code which is in two letters only like 'en', 'ko', 'jp'
     */
    getUserLanguage() {
        return this.getBrowserLanguage();
    }

    /**
     * Translate the language.
     *
     * i18n
     */
    t( text ) {
        const ln = this.getUserLanguage();
        if ( text[ln] === void 0 ) {
            return 'NO TEXT IN YOUR LANGUAGE';
        } else {
            return text[ln];
        }
    }



  /**
   * Returns browser language
   *
   * @param full If it is true, then it returns the full language string like 'en-US'.
   *              Otherwise, it returns the first two letters like 'en'.
   *
   * @returns
   *      - the browser language like 'en', 'en-US', 'ko', 'ko-KR'
   *      - null if it cannot detect a language.
   */
  getBrowserLanguage(full = false): string {
    const nav = window.navigator;
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    let ln: string = null;
    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (let i = 0; i < nav.languages.length; i++) {
        const language = nav.languages[i];
        if (language && language.length) {
          ln = language;
          break;
        }
      }
    }
    // support for other well known properties in browsers
    for (let i = 0; i < browserLanguagePropertyKeys.length; i++) {
      const language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        ln = language;
        break;
      }
    }
    if (ln) {
      if (full === false) {
        ln = ln.substring(0, 2);
      }
    }
    return ln;
  }
}
