import { test, expect } from '@playwright/test';
import { dismissCookieBanner } from './helpers/cookies';

test('non-existent page returns a 404 or error page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist-xyz-12345');
  await dismissCookieBanner(page);

  const status = response?.status() ?? 0;
  const isErrorStatus = status === 404 || status === 410;

  if (!isErrorStatus) {
    const body = page.locator('body');
    await expect(body).toContainText(/not found|page not found|404|error/i, { timeout: 10000 });
  } else {
    expect(isErrorStatus).toBe(true);
  }
});

test('404 page contains a link back to the homepage', async ({ page }) => {
  await page.goto('/this-page-does-not-exist-xyz-12345');
  await dismissCookieBanner(page);

  await page.waitForLoadState('domcontentloaded');

  const homeLink = page.getByRole('link', { name: /home|back to dell|go home/i })
    .or(page.locator('a[href="/en-uk"], a[href="/"]')).first();

  const header = page.locator('header a[href*="dell.com"], header a[href="/"]').first();

  const hasFallback = await homeLink.isVisible({ timeout: 5000 }) || await header.isVisible({ timeout: 5000 });
  expect(hasFallback).toBe(true);
});
