import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('product gallery images are visible on listing page', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/ac/5');
  const images = page.locator('img[src*="dell"], img[data-src*="dell"], img[alt]').first();
  await expect(images).toBeVisible({ timeout: 15000 });
});

test('product gallery has multiple images', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/ac/5');
  const images = page.locator('img[alt]');
  await expect(images.first()).toBeVisible({ timeout: 15000 });
  const count = await images.count();
  expect(count).toBeGreaterThan(1);
});
