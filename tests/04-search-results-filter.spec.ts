import { test, expect } from '@playwright/test';

test('search results page for monitors loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/search/results?q=monitor');
  expect(response?.status()).toBeLessThan(500);
});

test('search results page title is not empty', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/search/results?q=monitor');
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});
