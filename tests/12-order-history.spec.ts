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

test('order history page is accessible after login', async ({ page }) => {
  await login(page);

  const ordersLink = page.getByRole('link', { name: /order/i }).first();
  if (await ordersLink.isVisible({ timeout: 5000 })) {
    await ordersLink.click();
  } else {
    await page.goto('https://account.dell.com/orders');
  }

  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL(/order/i, { timeout: 10000 });
});

test('order history page loads without errors', async ({ page }) => {
  await login(page);
  await page.goto('https://account.dell.com/orders');
  await page.waitForLoadState('domcontentloaded');

  const errorMsg = page.locator('[class*="error"]').first();
  const hasError = await errorMsg.isVisible({ timeout: 3000 });
  expect(hasError).toBe(false);
});
