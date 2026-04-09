import { test, expect } from '@playwright/test';

test('homepage returns a successful response', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk');
  expect(response?.status()).toBeLessThan(400);
});

test('homepage title is not empty', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk');
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});
