import { test, expect } from '@playwright/test';

test('search results page for laptops loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/search/results?q=laptop');
  expect(response?.status()).toBeLessThan(500);
});

test('search results page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/search/results?q=laptop');
  await expect(page.locator('body')).toBeVisible();
});
