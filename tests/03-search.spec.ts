import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('search bar is present on homepage', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/');
  await dismissCookieBanner(page);

  const searchInput = page.getByRole('searchbox').or(page.locator('[type="search"], [name="q"], [aria-label*="search" i]')).first();
  await expect(searchInput).toBeVisible({ timeout: 10000 });
});

test('searching for a product returns results', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/search/results?q=laptop');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/search|results/i);

  const results = page.locator('[class*="product"], [class*="result"], article').first();
  await expect(results).toBeVisible({ timeout: 15000 });
});
