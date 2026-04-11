import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('breadcrumb navigation is present on category page', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/xps/ac/5');
  const breadcrumb = page.locator('nav[aria-label*="breadcrumb"], ol[aria-label*="breadcrumb"], [class*="breadcrumb"]').first();
  await expect(breadcrumb).toBeVisible({ timeout: 15000 });
});

test('breadcrumb contains at least two levels', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/xps/ac/5');
  const breadcrumbLinks = page.locator('[class*="breadcrumb"] a, nav[aria-label*="breadcrumb"] a, ol[aria-label*="breadcrumb"] a');
  await expect(breadcrumbLinks.first()).toBeVisible({ timeout: 15000 });
  const count = await breadcrumbLinks.count();
  expect(count).toBeGreaterThan(1);
});
