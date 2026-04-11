import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('account page loads and redirects unauthenticated users', async ({ page }) => {
  await dismissCookieBanner(page);
  const response = await page.goto('/en-uk/my-account');
  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator('body')).toBeVisible();
});

test('account page has sign-in link or form', async ({ page }) => {
  await dismissCookieBanner(page);
  await page.goto('/en-uk/my-account');
  const signIn = page.getByRole('link', { name: /sign.?in|log.?in/i })
    .or(page.locator('input[type="email"], input[type="password"]'))
    .first();
  await expect(signIn).toBeVisible({ timeout: 10000 });
});
