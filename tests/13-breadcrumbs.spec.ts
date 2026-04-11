import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('breadcrumb navigation is present on category page', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/xps/ac/5');
  const breadcrumb = page.locator('[aria-label*="breadcrumb"], nav ol, nav ul, [class*="breadcrumb"]').first();
  await expect(breadcrumb).toBeVisible({ timeout: 15000 });
});

test('breadcrumb contains at least two levels', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/xps/ac/5');
  const breadcrumbLinks = page.locator('[aria-label*="breadcrumb"] a, nav ol a, [class*="breadcrumb"] a');
  await expect(breadcrumbLinks.first()).toBeVisible({ timeout: 15000 });
  const count = await breadcrumbLinks.count();
  expect(count).toBeGreaterThan(1);
});
