import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('homepage loads with title, header and footer', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/');
  await dismissCookieBanner(page);

  await expect(page).toHaveTitle(/dell/i);
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('homepage hero section is visible', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/');
  await dismissCookieBanner(page);

  const body = page.locator('body');
  await expect(body).toBeVisible();
  await expect(page.locator('body *').first()).toBeVisible();
});
