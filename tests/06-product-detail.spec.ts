import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('product detail page shows name and price', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const productTitle = page.locator('h1').first();
  await expect(productTitle).toBeVisible({ timeout: 10000 });

  const price = page.locator('[class*="price"]').first();
  await expect(price).toBeVisible({ timeout: 10000 });
});

test('product detail page has product description', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const description = page.locator('[class*="description"], [class*="overview"], [id*="overview"]').first();
  await expect(description).toBeVisible({ timeout: 10000 });
});
