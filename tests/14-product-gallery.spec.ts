import { test, expect } from '@playwright/test';

test('networking page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/networking/index.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('networking page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/networking/index.htm');
  await expect(page.locator('body')).toBeVisible();
});
