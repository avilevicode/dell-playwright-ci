import { test, expect } from '@playwright/test';

test('invalid URL does not return a 500 server error', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/this-page-does-not-exist-xyz');
  expect(response?.status()).not.toBe(500);
});

test('invalid URL still loads a page body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/this-page-does-not-exist-xyz');
  await expect(page.locator('body')).toBeVisible();
});
