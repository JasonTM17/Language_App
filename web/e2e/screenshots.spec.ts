import { test } from '@playwright/test';

const pages = [
  { name: 'landing', path: '/', wait: 1000 },
  { name: 'dashboard', path: '/dashboard', wait: 1000 },
  { name: 'vocabulary', path: '/vocabulary', wait: 500 },
  { name: 'quiz', path: '/quiz', wait: 500 },
  { name: 'listening', path: '/listening', wait: 500 },
  { name: 'skill-tree', path: '/skill-tree', wait: 500 },
  { name: 'leaderboard', path: '/leaderboard', wait: 500 },
  { name: 'ai-tutor', path: '/ai-tutor', wait: 500 },
  { name: 'daily-challenge', path: '/daily-challenge', wait: 500 },
  { name: 'profile', path: '/profile', wait: 500 },
];

test.describe('Screenshots - Desktop (1280x720)', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const p of pages) {
    test(`${p.name} - Desktop`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForTimeout(p.wait);
      await page.screenshot({
        path: `../docs/screenshots/desktop-${p.name}.png`,
        fullPage: false,
      });
    });
  }

  test('Dark Mode - Desktop', async ({ page }) => {
    await page.goto('/dashboard');
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    });
    await page.waitForTimeout(800);
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
      await page.goto(p.path);
      await page.waitForTimeout(p.wait);
      await page.screenshot({
        path: `../docs/screenshots/mobile-${p.name}.png`,
        fullPage: false,
      });
    });
  }
});
