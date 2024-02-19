import { createI18n } from "vue-i18n";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

const locale = process.env.VUE_APP_DEFAULT_LOCALE;
const fallback = process.env.VUE_APP_FALLBACK_LOCALE;

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: locale,
  fallbackFormat: fallback,
  messages: { ru, en },
});

export default i18n;
