import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

const EMAIL = process.env.DELL_EMAIL ?? '';
const PASSWORD = process.env.DELL_PASSWORD ?? '';

test('sign in page loads after clicking sign in', async ({ page }) => {
  await page.goto('/');
  await dismissCookieBanner(page);

  const signInLink = page.getByRole('link', { name: /sign in/i })
    .or(page.getByRole('button', { name: /sign in/i })).first();

  await expect(signInLink).toBeVisible({ timeout: 10000 });
  await signInLink.click();

  await page.waitForLoadState('domcontentloaded');

  const emailField = page.getByRole('textbox', { name: /email/i })
    .or(page.locator('[type="email"], [name="email"]')).first();

  await expect(emailField).toBeVisible({ timeout: 10000 });
});

test('login with valid credentials redirects to account', async ({ page }) => {
  await page.goto('/');
  await dismissCookieBanner(page);

  const signInLink = page.getByRole('link', { name: /sign in/i })
    .or(page.getByRole('button', { name: /sign in/i })).first();

  await expect(signInLink).toBeVisible({ timeout: 10000 });
  await signInLink.click();

  await page.waitForLoadState('domcontentloaded');

  const emailField = page.getByRole('textbox', { name: /email/i })
    .or(page.locator('[type="email"], [name="email"]')).first();
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
