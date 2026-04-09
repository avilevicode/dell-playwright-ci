import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

const EMAIL = process.env.DELL_EMAIL ?? '';
const PASSWORD = process.env.DELL_PASSWORD ?? '';

const LOGIN_URL = 'https://www.dell.com/identity/global/Login?c=uk&l=en&s=bsd';

async function login(page: import('@playwright/test').Page) {
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
  await passwordField.fill(PASSWORD);

  const submitBtn = page.getByRole('button', { name: /sign in|log in|submit/i }).first();
  await submitBtn.click();
  await page.waitForLoadState('domcontentloaded');
}

test('account dashboard is accessible after login', async ({ page }) => {
  await login(page);

  const accountNav = page.locator('[class*="account"], [aria-label*="account" i], [href*="account"]').first();
  await expect(accountNav).toBeVisible({ timeout: 15000 });
});

test('account page shows user email or name', async ({ page }) => {
  await login(page);

  await page.goto('https://account.dell.com');
  await page.waitForLoadState('domcontentloaded');

  const userIdentifier = page.locator('body');
  await expect(userIdentifier).toContainText(new RegExp(EMAIL.split('@')[0], 'i'), { timeout: 10000 });
});
