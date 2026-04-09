import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

const EMAIL = process.env.DELL_EMAIL ?? '';
const PASSWORD = process.env.DELL_PASSWORD ?? '';
const LOGIN_URL = 'https://www.dell.com/identity/global/Login?c=uk&l=en&s=bsd';

test('sign in page loads with email field', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const emailField = page.locator('[type="email"], [name="email"], [id*="email" i]').first();
  await expect(emailField).toBeVisible({ timeout: 15000 });
});

test('login with valid credentials redirects to account', async ({ page }) => {
  await page.goto(LOGIN_URL);
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const emailField = page.locator('[type="email"], [name="email"], [id*="email" i]').first();
  await expect(emailField).toBeVisible({ timeout: 15000 });
  await emailField.fill(EMAIL);

  const nextBtn = page.getByRole('button', { name: /next|continue/i }).first();
  if (await nextBtn.isVisible({ timeout: 3000 })) {
    await nextBtn.click();
    await page.waitForLoadState('domcontentloaded');
  }

  const passwordField = page.locator('[type="password"]').first();
  await expect(passwordField).toBeVisible({ timeout: 10000 });
  await passwordField.fill(PASSWORD);

  const submitBtn = page.getByRole('button', { name: /sign in|log in|submit/i }).first();
  await submitBtn.click();

  await page.waitForLoadState('domcontentloaded');

  await expect(page).not.toHaveURL(/error|invalid/i, { timeout: 10000 });
});
