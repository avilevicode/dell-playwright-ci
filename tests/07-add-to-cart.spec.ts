import { test, expect } from '@playwright/test';

test('deals page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/shop/deals/sc/sale');
  expect(response?.status()).toBeLessThan(500);
});

test('deals page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/shop/deals/sc/sale');
  await expect(page.locator('body')).toBeVisible();
});
