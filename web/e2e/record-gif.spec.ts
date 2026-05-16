import { test } from '@playwright/test';

test('record desktop demo', async ({ page }) => {
  const pages = [
    { path: '/', name: 'frame-01-landing' },
    { path: '/auth/login', name: 'frame-02-login' },
    { path: '/dashboard', name: 'frame-03-dashboard' },
    { path: '/vocabulary', name: 'frame-04-vocabulary' },
    { path: '/quiz', name: 'frame-05-quiz' },
    { path: '/listening', name: 'frame-06-listening' },
    { path: '/skill-tree', name: 'frame-07-skilltree' },
    { path: '/daily-challenge', name: 'frame-08-challenge' },
    { path: '/leaderboard', name: 'frame-09-leaderboard' },
    { path: '/ai-tutor', name: 'frame-10-aitutor' },
  ];

  for (const p of pages) {
    await page.goto(p.path);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `../docs/screenshots/gif-frames/${p.name}.png` });
  }
});

test('record mobile demo', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();

  const mobilepages = [
    { path: '/', name: 'mobile-01-landing' },
    { path: '/dashboard', name: 'mobile-02-dashboard' },
    { path: '/vocabulary', name: 'mobile-03-vocabulary' },
    { path: '/quiz', name: 'mobile-04-quiz' },
    { path: '/listening', name: 'mobile-05-listening' },
  ];

  for (const p of mobilepages) {
    await page.goto(p.path);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `../docs/screenshots/gif-frames/${p.name}.png` });
  }

  await context.close();
});
