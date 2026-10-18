export const locales = ["pt-BR", "es-ES", "en-US", "de-DE"] as const;
export type Locale = (typeof locales)[number];
export const currencies = ["BRL", "EUR", "USD"] as const;
export type Currency = (typeof currencies)[number];
// Demo display rates, not live quotations. Catalog and stored orders stay in EUR.
export const exchangeRates: Record<Currency, number> = {
  EUR: 1,
  BRL: 6,
  USD: 1.1,
};
export function formatMoney(value: number, locale: Locale, currency: Currency) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value * exchangeRates[currency],
  );
}
export function detectLocale(language: string): Locale {
  return (
    locales.find((locale) => locale.slice(0, 2) === language.slice(0, 2)) ??
    "pt-BR"
  );
}
