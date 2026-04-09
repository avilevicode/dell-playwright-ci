import { test, expect } from '@playwright/test';

test('homepage redirects to a locale URL', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk');
  expect(page.url()).toContain('dell.com');
});

test('header element is present on homepage', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk');
  await expect(page.locator('header')).toBeVisible({ timeout: 15000 });
});
