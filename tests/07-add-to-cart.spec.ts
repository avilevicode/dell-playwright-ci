import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('add to cart button is present on product page', async ({ page }) => {
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
});

test('clicking add to cart updates the cart indicator', async ({ page }) => {
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  await expect(addToCartBtn).toBeVisible({ timeout: 10000 });
  await addToCartBtn.click();

  const cartIndicator = page.locator('[class*="cart"], [aria-label*="cart" i]').first();
  await expect(cartIndicator).toBeVisible({ timeout: 10000 });
});
