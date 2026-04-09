import { Page } from '@playwright/test';

export async function dismissCookieBanner(page: Page): Promise<void> {
  try {
    const acceptBtn = page.getByRole('button', { name: /accept all cookies/i });
    await acceptBtn.waitFor({ timeout: 6000 });
    await acceptBtn.click();
  } catch {
    // Banner not present or already dismissed
  }
}

export async function hideAutomation(page: Page): Promise<void> {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });
}
