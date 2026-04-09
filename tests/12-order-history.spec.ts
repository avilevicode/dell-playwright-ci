import { test, expect } from '@playwright/test';

test('workstations page loads successfully', async ({ page }) => {
  const response = await page.goto('https://www.dell.com/en-uk/dt/workstations/index.htm');
  expect(response?.status()).toBeLessThan(500);
});

test('workstations page has a body', async ({ page }) => {
  await page.goto('https://www.dell.com/en-uk/dt/workstations/index.htm');
  await expect(page.locator('body')).toBeVisible();
});
