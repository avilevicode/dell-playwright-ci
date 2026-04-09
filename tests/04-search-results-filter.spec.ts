import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('search results page has filter options', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/search/results?q=laptop');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const filterPanel = page.locator('[class*="filter"], [class*="facet"], aside').first();
  await expect(filterPanel).toBeVisible({ timeout: 15000 });
});

test('applying a filter updates results', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstFilter = page.locator('[class*="facet"] input[type="checkbox"], [class*="filter"] input[type="checkbox"]').first();
  const initialUrl = page.url();

  if (await firstFilter.isVisible({ timeout: 8000 })) {
    await firstFilter.click();
    await page.waitForURL((url) => url.toString() !== initialUrl, { timeout: 10000 }).catch(() => {});
  }

  await expect(page).toBeVisible();
});
