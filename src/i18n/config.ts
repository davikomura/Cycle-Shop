import { createInstance, type BackendModule } from "i18next";
import { initReactI18next } from "react-i18next";
import { detectLocale, locales } from "./settings";

export const namespaces = [
  "common",
  "home",
  "catalog",
  "products",
  "checkout",
  "auth",
  "about",
  "faq",
  "legal",
] as const;
export type Namespace = (typeof namespaces)[number];
// Vite emits one async chunk per locale/namespace. No dictionary is eagerly imported.
const dictionaries = import.meta.glob<{ default: Record<string, unknown> }>(
  "./locales/*/*.json",
);
export const translationBackend: BackendModule = {
  type: "backend",
  init() {},
  read(language, namespace, callback) {
    const load = dictionaries[`./locales/${language}/${namespace}.json`];
    if (!load) {
      callback(
        new Error(`Unknown translation resource: ${language}/${namespace}`),
        false,
      );
      return;
    }
    load()
      .then((module) => callback(null, module.default))
      .catch((error) => callback(error, false));
  },
};
export function readPreference(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Keep session preferences when storage is unavailable. */
  }
}
const savedLocale = readPreference("cycle-shop.locale");
export const i18n = createInstance();
export const i18nReady = i18n
  .use(translationBackend)
  .use(initReactI18next)
  .init({
    lng: locales.includes(savedLocale as (typeof locales)[number])
      ? savedLocale!
      : detectLocale(
          typeof navigator === "undefined" ? "pt-BR" : navigator.language,
        ),
    supportedLngs: [...locales],
    load: "currentOnly",
    fallbackLng: "en-US",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });
