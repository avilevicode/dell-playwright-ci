import { test, expect } from '@playwright/test';

test('cookie consent banner appears on homepage', async ({ page }) => {
  await page.goto('/en-uk');
  const banner = page.locator('[id*="cookie"], [class*="cookie"], [id*="consent"], [class*="consent"]').first();
  await expect(banner).toBeVisible({ timeout: 10000 });
});

test('cookie consent banner can be dismissed', async ({ page }) => {
  await page.goto('/en-uk');
  const acceptBtn = page.getByRole('button', { name: /accept all/i });
  await acceptBtn.waitFor({ timeout: 10000 });
  await acceptBtn.click();
  await expect(acceptBtn).not.toBeVisible({ timeout: 5000 });
});
