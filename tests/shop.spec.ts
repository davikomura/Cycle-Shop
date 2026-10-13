import { expect, test } from '@playwright/test';

test('search, favorites, cart persistence and checkout login return', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByPlaceholder('Search bikes...').fill('EcoRider');
  await page.getByRole('button', { name: 'Search bikes', exact: true }).click();
  await expect(page).toHaveURL(/search\?q=EcoRider/);
  await page.getByRole('link', { name: 'EcoRider 3000', exact: true }).first().click();
  await expect(page).toHaveURL(/product\/1$/);
  await page.getByRole('button', { name: /save/i }).click();
  await page.getByRole('link', { name: 'Go to favorites' }).click();
  await expect(page.getByRole('heading', { name: 'EcoRider 3000' })).toBeVisible();
  await page.getByRole('button', { name: 'Add to cart', exact: true }).click();
  await page.getByRole('link', { name: 'Go to cart' }).click();
  await page.getByLabel('Quantity').selectOption('2');
  await page.reload();
  await expect(page.getByLabel('Quantity')).toHaveValue('2');
  await page.getByRole('link', { name: 'Proceed to checkout' }).click();
  await expect(page).toHaveURL(/Login/);
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('input[name="password"]').fill('demo-password');
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/checkout$/);
  await page.locator('input[name="fullName"]').fill('Test Rider');
  await page.locator('input[name="address"]').fill('123 Test Street');
  await page.locator('input[name="city"]').fill('Test City');
  await page.locator('input[name="cardNumber"]').fill('4242424242424242');
  await page.getByRole('button', { name: 'Place order' }).click();
  await expect(page).toHaveURL(/checkout\/success\?order=/);
  await expect(page.getByRole('heading', { name: /Thanks/ })).toBeVisible();
  await page.getByRole('link', { name: 'Go to cart' }).click();
  await expect(page.getByRole('heading', { name: /empty/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('category filters and mobile navigation', async ({ page }) => {
  await page.goto('/Mountain-Bike');
  await expect(page.getByRole('heading', { name: 'Mountain Bike', exact: true })).toBeVisible();
  await page.getByPlaceholder('Search within mountain bike...').fill('no-such-bike');
  await expect(page.getByRole('heading', { name: 'This category is being prepared' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'E-Bike', exact: true }).click();
  await expect(page).toHaveURL(/E-Bike$/);
  await expect(page.getByRole('heading', { name: 'E-Bike', exact: true })).toBeVisible();
});
