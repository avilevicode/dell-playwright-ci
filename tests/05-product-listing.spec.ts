import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('product listing page shows multiple products', async ({ page }) => {
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const productCards = page.locator('[class*="product-card"], [class*="stack-card"], [data-testid*="product"]');
  await expect(productCards.first()).toBeVisible({ timeout: 15000 });
  expect(await productCards.count()).toBeGreaterThan(1);
});

test('product listing page shows product prices', async ({ page }) => {
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const price = page.locator('[class*="price"], [data-testid*="price"]').first();
  await expect(price).toBeVisible({ timeout: 15000 });
  await expect(price).toContainText(/£/);
});
