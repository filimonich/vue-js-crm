import i18n from "@/i18n";
import { nextTick } from "vue";

const Trans = {
  get defaultLocale() {
    return process.env.VUE_APP_DEFAULT_LOCALE;
  },

  get supportedLocales() {
    return Trans.getSupportedLocales();
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale;
  },

  async getSupportedLocales() {
    return process.env.VUE_APP_SUPPORTED_LOCALE.split(",");
  },

  async switchLanguage(newLocale) {
    // await Trans.loadLocaleMessages(newLocale);
    Trans.currentLocale = newLocale;
    document.querySelector("html").setAttribute("lang", newLocale);
    localStorage.setItem("user-locale", newLocale);
  },

  isLocaleSupported(locale) {
    return Trans.supportedLocales.includes(locale);
  },

  getUserLocale() {
    const locale =
      window.navigator.language ||
      window.navigator.userLanguage ||
      Trans.defaultLocale;

    return {
      locale: locale,
      localeNoRegion: locale.split("-")[0],
    };
  },
  getPersistedLocale() {
    const persistedLocale = localStorage.getItem("user-locale");

    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    } else {
      return null;
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }

    const userPreferredLocale = Trans.getUserLocale();

    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale;
    }

    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion;
    }

    return Trans.defaultLocale;
  },
};

export default Trans;