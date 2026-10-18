import { describe, expect, it } from "vitest";
import { createInstance } from "i18next";
import { readFileSync, readdirSync } from "node:fs";
import ts from "typescript";
import data from "../../data.json";
import { locales } from "./settings";
import { namespaces, translationBackend, i18nReady } from "./config";

function flatten(
  value: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, entry]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof entry === "string"
        ? [[path, entry]]
        : Object.entries(flatten(entry as Record<string, unknown>, path));
    }),
  );
}
const dictionaries = Object.fromEntries(
  locales.map((locale) => [
    locale,
    Object.fromEntries(
      namespaces.map((ns) => [
        ns,
        flatten(
          JSON.parse(
            readFileSync(`src/i18n/locales/${locale}/${ns}.json`, "utf8"),
          ),
        ),
      ]),
    ),
  ]),
);

describe("translation resources", () => {
  it("covers static keys, all products and FAQs, and preserves interpolation across languages", () => {
    const required = new Set<string>();
    function scan(directory: string) {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = `${directory}/${entry.name}`;
        if (entry.isDirectory()) scan(path);
        else if (
          entry.name.endsWith(".tsx") ||
          entry.name === "catalogKeys.ts"
        ) {
          const source = ts.createSourceFile(
            path,
            readFileSync(path, "utf8"),
            ts.ScriptTarget.Latest,
            true,
            ts.ScriptKind.TSX,
          );
          function visit(node: ts.Node) {
            if (
              ts.isStringLiteral(node) &&
              /^(common|home|catalog|products|auth|checkout|about|faq|legal):/.test(
                node.text,
              )
            )
              required.add(node.text);
            ts.forEachChild(node, visit);
          }
          visit(source);
        }
      }
    }
    scan("src");
    for (const bike of data.bikes)
      required.add(`products:items.${bike.id}.description`);
    data.faqs.forEach((faq) => {
      required.add(`faq:items.${faq.id}.question`);
      required.add(`faq:items.${faq.id}.answer`);
    });
    for (const locale of locales) {
      for (const target of required) {
        const [ns, key] = target.split(":");
        expect(
          Boolean(
            dictionaries[locale][ns][key] ||
            dictionaries[locale][ns][`${key}_other`],
          ),
          `${locale} ${target}`,
        ).toBe(true);
      }
      for (const ns of namespaces) {
        // CLDR requires an extra 'many' form for Portuguese and Spanish.
        const keys = (dict: Record<string, string>) =>
          Object.keys(dict)
            .filter((key) => !key.endsWith("_many"))
            .sort();
        expect(keys(dictionaries[locale][ns])).toEqual(
          keys(dictionaries["en-US"][ns]),
        );
        for (const [key, value] of Object.entries(dictionaries[locale][ns])) {
          const reference =
            dictionaries["en-US"][ns][key.replace(/_many$/, "_other")];
          expect(
            value.match(/\{\{\w+\}\}/g)?.sort() ?? [],
            `${locale} ${ns}:${key}`,
          ).toEqual(reference.match(/\{\{\w+\}\}/g)?.sort() ?? []);
        }
      }
    }
  });

  it("loads namespaces on demand and resolves locale-specific plurals", async () => {
    await i18nReady;
    const instance = createInstance();
    await instance
      .use(translationBackend)
      .init({
        lng: "en-US",
        fallbackLng: "en-US",
        supportedLngs: [...locales],
        load: "currentOnly",
        ns: ["common"],
        defaultNS: "common",
      });
    expect(instance.hasResourceBundle("en-US", "common")).toBe(true);
    expect(instance.hasResourceBundle("en-US", "products")).toBe(false);
    expect(instance.hasResourceBundle("de-DE", "common")).toBe(false);
    await instance.loadNamespaces("catalog");
    for (const [locale, singular, plural] of [
      ["en-US", "1 product found", "2 products found"],
      ["pt-BR", "1 produto encontrado", "2 produtos encontrados"],
      ["es-ES", "1 producto encontrado", "2 productos encontrados"],
      ["de-DE", "1 Produkt gefunden", "2 Produkte gefunden"],
    ]) {
      await instance.changeLanguage(locale);
      expect(instance.t("catalog:results.count", { count: 1 })).toBe(singular);
      expect(instance.t("catalog:results.count", { count: 2 })).toBe(plural);
      expect(instance.t("catalog:results.count", { count: 0 })).not.toContain(
        "{{",
      );
    }
    expect(instance.hasResourceBundle("de-DE", "products")).toBe(false);
    await instance.loadNamespaces("products");
    expect(instance.t("products:items.1.description")).toContain("Stadtrad");
    instance.addResource("en-US", "common", "fallbackTest", "English fallback");
    expect(instance.t("common:fallbackTest")).toBe("English fallback");
  });
});
