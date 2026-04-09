import { test, expect } from '@playwright/test';
import { dismissCookieBanner, hideAutomation } from './helpers/cookies';

test('cart page loads and shows empty cart or items', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/cart');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  await expect(page).toHaveURL(/cart/i);

  const cartContent = page.locator('[class*="cart"], main').first();
  await expect(cartContent).toBeVisible({ timeout: 10000 });
});

test('cart page has checkout button or continue shopping link', async ({ page }) => {
  await hideAutomation(page);
  await page.goto('/shop/cart');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const actionBtn = page.getByRole('button', { name: /checkout|continue shopping/i })
    .or(page.getByRole('link', { name: /checkout|continue shopping/i })).first();

  await expect(actionBtn).toBeVisible({ timeout: 10000 });
});
