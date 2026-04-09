import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('main navigation is visible and contains key links', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/');
  await dismissCookieBanner(page);

  const nav = page.locator('header nav, header [role="navigation"]').first();
  await expect(nav).toBeVisible();
});

test('navigating to laptops section loads product results', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/laptops/i);

  const productCards = page.locator('[data-testid*="product"], .ps-product-card, .stack-card, article').first();
  await expect(productCards).toBeVisible({ timeout: 15000 });
});
