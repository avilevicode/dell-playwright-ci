import { Page } from '@playwright/test';
import { dismissCookieBanner } from './cookies';

export async function goToLaptopsPage(page: Page): Promise<void> {
  await page.goto('/en-uk');
  await dismissCookieBanner(page);
  await page.waitForLoadState('domcontentloaded');

  const laptopsLink = page
    .getByRole('link', { name: /^laptops/i })
    .or(page.getByRole('link', { name: /laptops & 2-in-1/i }))
    .first();

  if (await laptopsLink.isVisible({ timeout: 5000 })) {
    await laptopsLink.click();
  } else {
    // Nav might require hover to reveal dropdown
    const productsBtn = page.getByRole('button', { name: /products/i }).first();
    await productsBtn.hover();
    await page.getByRole('link', { name: /laptop/i }).first().click();
  }

  await page.waitForLoadState('domcontentloaded');
}

export async function getFirstProductLink(page: Page) {
  return page
    .locator('a[href*="/shop"][href*="laptop"], a[href*="/shop"][href*="xps"], a[href*="/shop"][href*="inspiron"]')
    .or(page.locator('h3 a, h2 a').filter({ hasText: /\w+/ }))
    .first();
}
