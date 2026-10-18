import { expect, test } from "@playwright/test";

test("language and currency changes persist across product, cart and reload", async ({
  page,
}) => {
  await page.goto("/");
  const languages = [
    [
      "pt-BR",
      "Idioma",
      "Moeda",
      "Menos rotina.",
      "Adicionar ao carrinho",
      "Ir para o carrinho",
    ],
    [
      "es-ES",
      "Idioma",
      "Moneda",
      "Menos rutina.",
      "Añadir a la cesta",
      "Ir a la cesta",
    ],
    [
      "de-DE",
      "Sprache",
      "Währung",
      "Weniger Alltag.",
      "In den Warenkorb",
      "Zum Warenkorb",
    ],
    [
      "en-US",
      "Language",
      "Currency",
      "Less routine.",
      "Add to cart",
      "Go to cart",
    ],
  ];
  for (const [locale, language, currency, heading, add, cart] of languages) {
    await page.locator(".preferences select").first().selectOption(locale);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      heading,
    );
    await page
      .getByRole("combobox", { name: currency, exact: true })
      .selectOption("USD");
    await page.goto("/product/1");
    await expect(page.locator("section")).toContainText(
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
      }).format(825),
    );
    await page.getByRole("button", { name: add, exact: true }).click();
    await page.getByRole("link", { name: cart, exact: true }).click();
    await page.reload();
    await expect(
      page.getByRole("combobox", { name: language, exact: true }),
    ).toHaveValue(locale);
    await expect(
      page.getByRole("combobox", { name: currency, exact: true }),
    ).toHaveValue("USD");
    await expect(
      page.getByRole("heading", { name: "EcoRider 3000" }),
    ).toBeVisible();
    await page.goto("/");
  }
  for (const [currency, price] of [
    ["BRL", "R$4,500.00"],
    ["EUR", "€750.00"],
    ["USD", "$825.00"],
  ]) {
    await page
      .getByRole("combobox", { name: "Currency", exact: true })
      .selectOption(currency);
    await expect(page.locator(".catalog-card").first()).toContainText(price);
  }
});

test("mobile storefront works in German without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".preferences select").first().selectOption("de-DE");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Mehr Abenteuer.",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Menü", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Kinderfahrräder", exact: true })
    .click();
  await expect(page).toHaveURL(/Kids$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Kinderfahrräder",
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator(".preferences select").first().selectOption("pt-BR");
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
});

test("downloads translation areas and languages only when needed", async ({
  page,
}) => {
  const scripts: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "script") scripts.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Less routine.",
  );
  const chunks = (area: string) =>
    scripts.filter((url) =>
      new RegExp(`/assets/${area}-[^/]+\\.js$`).test(url),
    );
  expect(chunks("home")).toHaveLength(1);
  expect(chunks("products")).toHaveLength(0);
  expect(chunks("legal")).toHaveLength(0);
  expect(chunks("faq")).toHaveLength(0);
  await page
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("de-DE");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Weniger Alltag.",
  );
  expect(chunks("home")).toHaveLength(2);
  expect(chunks("products")).toHaveLength(0);
  await page
    .getByRole("combobox", { name: "Sprache", exact: true })
    .selectOption("en-US");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Less routine.",
  );
  expect(chunks("home")).toHaveLength(2);
  await page
    .locator(".catalog-card")
    .first()
    .getByRole("link", { name: "Details" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "EcoRider 3000",
  );
  expect(chunks("products")).toHaveLength(1);
  expect(chunks("legal")).toHaveLength(0);
  await page.getByRole("link", { name: "Privacy Policy", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy Policy",
  );
  expect(chunks("legal")).toHaveLength(1);
});
