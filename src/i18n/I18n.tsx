import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import {
  currencies,
  formatMoney,
  type Currency,
  type Locale,
} from "./settings";
import { i18n, readPreference, savePreference, type Namespace } from "./config";

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (currency: Currency) => void;
} | null>(null);
export function I18nProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = readPreference("cycle-shop.currency");
    return currencies.includes(saved as Currency) ? (saved as Currency) : "BRL";
  });
  useEffect(() => {
    savePreference("cycle-shop.currency", currency);
  }, [currency]);
  useEffect(() => {
    const syncLocale = (language: string) => {
      document.documentElement.lang = language;
      savePreference("cycle-shop.locale", language);
    };
    syncLocale(i18n.language);
    i18n.on("languageChanged", syncLocale);
    return () => {
      i18n.off("languageChanged", syncLocale);
    };
  }, []);
  return (
    <I18nextProvider i18n={i18n}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        {children}
      </CurrencyContext.Provider>
    </I18nextProvider>
  );
}
// Retain the storefront's currency API while delegating all translations to react-i18next.
export function useI18n(namespaces: Namespace[] = ["common"]) {
  const { t, i18n: instance } = useTranslation(namespaces);
  const settings = useContext(CurrencyContext);
  if (!settings) throw new Error("useI18n requires I18nProvider");
  const locale = instance.language as Locale;
  return {
    ...settings,
    locale,
    t,
    setLocale: (language: Locale) => {
      void instance.changeLanguage(language);
    },
    formatPrice: (value: number) =>
      formatMoney(value, locale, settings.currency),
  };
}
