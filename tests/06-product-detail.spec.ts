import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('product detail page loads successfully', async ({ page }) => {
  await dismissCookieBanner(page);
  const response = await page.goto('/en-uk/shop/laptops/xps/ac/5');
  expect(response?.status()).toBeLessThan(400);
});

test('product detail page has a heading', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/shop/laptops/xps/ac/5');
  await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 15000 });
});
