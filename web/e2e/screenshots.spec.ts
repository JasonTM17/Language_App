import { test, expect, Page } from '@playwright/test';

const pages = [
  { name: 'landing', path: '/', selector: 'h1' },
  { name: 'dashboard', path: '/dashboard', selector: '[class*="font-display"], h1' },
  { name: 'vocabulary', path: '/vocabulary', selector: 'h1' },
  { name: 'quiz', path: '/quiz', selector: 'h1' },
  { name: 'listening', path: '/listening', selector: 'h1' },
  { name: 'skill-tree', path: '/skill-tree', selector: 'h1' },
  { name: 'leaderboard', path: '/leaderboard', selector: 'h1' },
  { name: 'ai-tutor', path: '/ai-tutor', selector: 'h1' },
  { name: 'daily-challenge', path: '/daily-challenge', selector: 'h1' },
  { name: 'profile', path: '/profile', selector: 'h1' },
];

async function waitForContent(page: Page) {
  await page.waitForLoadState('domcontentloaded');

  // Wait for loading skeletons/spinners to disappear
  await page.waitForFunction(() => {
    const skeletons = document.querySelectorAll('[class*="animate-pulse"], [class*="skeleton"]');
    return skeletons.length === 0;
  }, { timeout: 10000 }).catch(() => {});

  // Extra settle time for animations
  await page.waitForTimeout(500);
}

async function isValidPage(page: Page): Promise<boolean> {
  const is404 = await page.locator('text=404').count();
  const isNotFound = await page.locator('text=not found').count();
  const isError = await page.locator('text=Something went wrong').count();
  return is404 === 0 && isNotFound === 0 && isError === 0;
}

test.describe('Screenshots - Desktop (1280x720)', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const p of pages) {
    test(`${p.name} - Desktop`, async ({ page }) => {
      const response = await page.goto(p.path, { waitUntil: 'domcontentloaded' });

      // Skip if HTTP error
      if (response && response.status() >= 400) {
        test.skip(true, `Page ${p.path} returned ${response.status()}`);
        return;
      }

      await waitForContent(page);

      // Verify page has real content (not 404/error)
      const valid = await isValidPage(page);
      if (!valid) {
        test.skip(true, `Page ${p.path} shows error/404 content`);
        return;
      }

      // Wait for the main content selector
      await page.locator(p.selector).first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});

      await page.screenshot({
        path: `../docs/screenshots/desktop-${p.name}.png`,
        fullPage: false,
      });
    });
  }

  test('Dark Mode - Desktop', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    });
    await waitForContent(page);
    await page.screenshot({
      path: '../docs/screenshots/desktop-dark-mode.png',
      fullPage: false,
    });
  });
});

test.describe('Screenshots - Mobile (390x844)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const p of pages) {
    test(`${p.name} - Mobile`, async ({ page }) => {
      const response = await page.goto(p.path, { waitUntil: 'domcontentloaded' });

      if (response && response.status() >= 400) {
        test.skip(true, `Page ${p.path} returned ${response.status()}`);
        return;
      }

      await waitForContent(page);

      const valid = await isValidPage(page);
      if (!valid) {
        test.skip(true, `Page ${p.path} shows error/404 content`);
        return;
      }

      await page.locator(p.selector).first().waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});

      await page.screenshot({
        path: `../docs/screenshots/mobile-${p.name}.png`,
        fullPage: false,
      });
    });
  }
});
