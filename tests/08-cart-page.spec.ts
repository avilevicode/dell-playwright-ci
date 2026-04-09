import { test, expect } from '@playwright/test';

test('gaming page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/gaming');
  expect(response?.status()).toBeLessThan(500);
});

test('gaming page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/gaming');
  await expect(page.locator('body')).toBeVisible();
});
