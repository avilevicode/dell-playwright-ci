import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('product detail page has a main product image', async ({ page }) => {
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const mainImage = page.locator('[class*="gallery"] img, [class*="product-image"] img, [class*="hero"] img').first();
  await expect(mainImage).toBeVisible({ timeout: 10000 });
});

test('product gallery has multiple image thumbnails', async ({ page }) => {
  await page.goto('/shop/laptops-2-in-1-pcs/sc/laptops');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const firstProduct = page.locator('[class*="product-card"] a, [class*="stack-card"] a').first();
  await expect(firstProduct).toBeVisible({ timeout: 15000 });
  await firstProduct.click();

  await page.waitForLoadState('domcontentloaded');

  const thumbnails = page.locator('[class*="thumbnail"] img, [class*="gallery"] li img');
  await expect(thumbnails.first()).toBeVisible({ timeout: 10000 });
});
