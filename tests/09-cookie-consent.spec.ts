import { test, expect } from '@playwright/test';
import { hideAutomation } from './helpers/cookies';

test('cookie consent banner appears on first visit', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/');

  const cookieBanner = page.locator('[id*="cookie"], [class*="cookie"], [id*="consent"], [class*="consent"]').first();
  await expect(cookieBanner).toBeVisible({ timeout: 10000 });
});

test('accepting cookies dismisses the banner', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/');

  const acceptBtn = page.getByRole('button', { name: /accept all cookies/i });
  await expect(acceptBtn).toBeVisible({ timeout: 10000 });
  await acceptBtn.click();

  await expect(acceptBtn).not.toBeVisible({ timeout: 5000 });
});
