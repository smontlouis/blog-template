import { serverOnly$ } from "vite-env-only/macros";

import enTranslation from "~/locales/en";
import frTranslation from "~/locales/fr";

export const supportedLngs = ["en", "fr"];
export const fallbackLng = "en";

export const defaultNS = "translation";

export const resources = serverOnly$({
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
});
