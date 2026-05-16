import { test } from '@playwright/test';

const pages = [
  { name: 'landing', path: '/', wait: 1000 },
  { name: 'login', path: '/auth/login', wait: 500 },
  { name: 'dashboard', path: '/dashboard', wait: 1000 },
  { name: 'vocabulary', path: '/vocabulary', wait: 500 },
  { name: 'quiz', path: '/quiz', wait: 500 },
  { name: 'listening', path: '/listening', wait: 500 },
  { name: 'skill-tree', path: '/skill-tree', wait: 500 },
  { name: 'leaderboard', path: '/leaderboard', wait: 500 },
  { name: 'ai-tutor', path: '/ai-tutor', wait: 500 },
  { name: 'daily-challenge', path: '/daily-challenge', wait: 500 },
];

test.describe('Screenshot Capture - Desktop', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const p of pages) {
    test(`capture ${p.name}`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForTimeout(p.wait);
      await page.screenshot({ 
        path: `../docs/screenshots/${p.name}-desktop.png`,
        fullPage: false 
      });
    });
  }
});

test.describe('Screenshot Capture - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const p of pages.slice(0, 5)) {
    test(`capture mobile ${p.name}`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForTimeout(p.wait);
      await page.screenshot({ 
        path: `../docs/screenshots/${p.name}-mobile.png`,
        fullPage: false 
      });
    });
  }
});
