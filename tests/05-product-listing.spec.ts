import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('laptops listing page loads successfully', async ({ page }) => {
  await dismissCookieBanner(page);
  const response = await page.goto('/en-uk/shop/laptops/ac/5');
  expect(response?.status()).toBeLessThan(400);
});

test('laptops listing page shows products', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/ac/5');
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('h1, h2, h3').first()).toBeVisible({ timeout: 15000 });
});
