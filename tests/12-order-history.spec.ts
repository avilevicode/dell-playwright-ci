import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('order history redirects to sign-in when unauthenticated', async ({ page }) => {
  await dismissCookieBanner(page);
  const response = await page.goto('/en-uk/my-account/orders');
  expect(response?.status()).toBeLessThan(400);
  await expect(page).toHaveURL(/login|signin|sign-in|myaccount/i);
});

test('order history page has a sign-in form', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/my-account/orders');
  const form = page.locator('form, input[type="email"], input[type="password"]').first();
  await expect(form).toBeVisible({ timeout: 10000 });
});
