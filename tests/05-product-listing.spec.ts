import { test, expect } from '@playwright/test';

test('support page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/support/index.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('support page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/support/index.htm');
  await expect(page.locator('body')).toBeVisible();
});
