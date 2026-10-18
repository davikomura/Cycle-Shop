import { describe, expect, it } from "vitest";
import {
  currencies,
  detectLocale,
  exchangeRates,
  formatMoney,
  locales,
} from "./settings";

describe("international storefront", () => {
  it("detects supported language families and falls back safely", () => {
    expect(detectLocale("pt-PT")).toBe("pt-BR");
    expect(detectLocale("es-MX")).toBe("es-ES");
    expect(detectLocale("en-GB")).toBe("en-US");
    expect(detectLocale("de-AT")).toBe("de-DE");
    expect(detectLocale("fr-FR")).toBe("pt-BR");
  });

  it("converts EUR amounts and uses locale-specific currency formatting", () => {
    for (const locale of locales)
      for (const currency of currencies) {
        expect(formatMoney(750, locale, currency)).toBe(
          new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
          }).format(750 * exchangeRates[currency]),
        );
      }
    expect(formatMoney(750 * 2, "en-US", "USD")).toBe("$1,650.00");
    expect(formatMoney(0, "de-DE", "EUR")).toBe("0,00 €");
  });
});
