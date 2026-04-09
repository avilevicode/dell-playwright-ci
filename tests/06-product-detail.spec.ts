import { test, expect } from '@playwright/test';

test('business solutions page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/solutions/index.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('business solutions page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/solutions/index.htm');
  await expect(page.locator('body')).toBeVisible();
});
