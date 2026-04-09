import { test, expect } from '@playwright/test';

test('servers page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/servers/index.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('servers page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/servers/index.htm');
  await expect(page.locator('body')).toBeVisible();
});
