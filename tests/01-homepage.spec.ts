import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('homepage loads with title, header and footer', async ({ page }) => {
  await page.goto('/');
  await dismissCookieBanner(page);

  await expect(page).toHaveTitle(/dell/i);
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

test('homepage hero section is visible', async ({ page }) => {
  await page.goto('/');
  await dismissCookieBanner(page);

  await expect(page.locator('main')).toBeVisible();
  const heroSection = page.locator('main').first();
  await expect(heroSection).toBeVisible();
});
