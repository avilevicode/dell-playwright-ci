import { test, expect } from '@playwright/test';

test('about dell page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/corporate/about-dell.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('about dell page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/corporate/about-dell.htm');
  await expect(page.locator('body')).toBeVisible();
});
