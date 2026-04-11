import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('account dashboard redirects to sign-in when unauthenticated', async ({ page }) => {
  await dismissCookieBanner(page);
  const response = await page.goto('/en-uk/my-account');
  expect(response?.status()).toBeLessThan(400);
  await expect(page).toHaveURL(/login|signin|sign-in|myaccount/i);
});

test('account dashboard sign-in page has an email field', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/my-account');
  const emailInput = page.locator('input[type="email"], input[name*="email"], input[id*="email"]').first();
  await expect(emailInput).toBeVisible({ timeout: 10000 });
});
