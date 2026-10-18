import { useI18n } from "../../i18n/I18n";
import { currencies, type Currency, type Locale } from "../../i18n/settings";

export function Preferences() {
  const { locale, currency, setLocale, setCurrency, t } = useI18n(["common"]);
  return (
    <div className="preferences">
      <label>
        <span className="sr-only">{t("common:preferences.language")}</span>
        <select
          aria-label={t("common:preferences.language")}
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          <option value="pt-BR">Português (BR)</option>
          <option value="es-ES">Español (ES)</option>
          <option value="en-US">English (US)</option>
          <option value="de-DE">Deutsch (DE)</option>
        </select>
      </label>
      <label>
        <span className="sr-only">{t("common:preferences.currency")}</span>
        <select
          aria-label={t("common:preferences.currency")}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
        >
          {currencies.map((code) => (
            <option key={code} value={code}>
              {code === "BRL" ? "R$ BRL" : code === "EUR" ? "€ EUR" : "$ USD"}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
