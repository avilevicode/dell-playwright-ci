import { test, expect } from '@playwright/test';

test('storage page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/storage/index.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('storage page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/storage/index.htm');
  await expect(page.locator('body')).toBeVisible();
});
