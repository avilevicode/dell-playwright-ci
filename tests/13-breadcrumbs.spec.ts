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
  // Count all breadcrumb items — links AND the current-page span (which is not an <a>).
  const breadcrumbItems = page.locator('[class*="breadcrumb"] li, [class*="breadcrumb"] [class*="item"], nav[aria-label*="breadcrumb"] li, ol[aria-label*="breadcrumb"] li');
  await expect(breadcrumbItems.first()).toBeVisible({ timeout: 15000 });
  const count = await breadcrumbItems.count();
  expect(count).toBeGreaterThan(1);
});
