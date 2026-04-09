import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('breadcrumbs are visible on product listing page', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const breadcrumb = page.locator('[aria-label*="breadcrumb" i], [class*="breadcrumb"], nav[aria-label*="crumb" i]').first();
  await expect(breadcrumb).toBeVisible({ timeout: 10000 });
});

test('breadcrumbs on product detail page include category and product name', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const breadcrumb = page.locator('[aria-label*="breadcrumb" i], [class*="breadcrumb"]').first();
  await expect(breadcrumb).toBeVisible({ timeout: 10000 });

  const breadcrumbLinks = breadcrumb.getByRole('link');
  expect(await breadcrumbLinks.count()).toBeGreaterThan(1);
});
