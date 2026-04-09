import { test, expect } from '@playwright/test';

test('accessories page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/shop/accessories/ac/4');
  expect(response?.status()).toBeLessThan(500);
});

test('accessories page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/shop/accessories/ac/4');
  await expect(page.locator('body')).toBeVisible();
});
