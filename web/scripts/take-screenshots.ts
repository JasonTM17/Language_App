import { chromium, type Page, type Browser } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.resolve(__dirname, '../../docs/screenshots');

const DESKTOP = { width: 1280, height: 720 };
const MOBILE = { width: 390, height: 844 };

const SCREENS = [
  { name: 'dashboard', path: '/dashboard' },
  { name: 'skill-tree', path: '/skill-tree' },
  { name: 'leaderboard', path: '/leaderboard' },
  { name: 'daily-challenge', path: '/daily-challenge' },
  { name: 'listening', path: '/listening' },
  { name: 'quiz', path: '/quiz' },
  { name: 'ai-tutor', path: '/ai-tutor' },
  { name: 'vocabulary', path: '/lessons' },
  { name: 'profile', path: '/profile' },
];

const login = async (page: Page) => {
  await page.goto(BASE_URL + '/auth/login', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);
  await page.locator('input[type="email"]').first().fill('user@linguaflow.app');
  await page.locator('input[type="password"]').first().fill('user123');
  await page.waitForTimeout(300);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(3000);
  try { await page.waitForURL('**/dashboard**', { timeout: 10000 }); } catch {}
  await page.waitForTimeout(2000);
};

const navigate = async (page: Page, targetPath: string) => {
  // Use dispatchEvent on the link - works regardless of viewport position
  const link = page.locator(`a[href="${targetPath}"]`).first();
  const count = await link.count();
  if (count > 0) {
    await link.dispatchEvent('click');
    await page.waitForTimeout(1500);
    try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
    await page.waitForTimeout(2000);
  }

  // Verify navigation happened
  if (!page.url().includes(targetPath)) {
    // Fallback: goto (works for public pages)
    await page.goto(BASE_URL + targetPath, { waitUntil: 'domcontentloaded', timeout: 15000 });
    try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}
    await page.waitForTimeout(2500);
  }
};

const main = async () => {
  console.log('Starting screenshot capture...\n');
  const browser: Browser = await chromium.launch({ headless: true });

  // Landing page
  console.log('Landing page:');
  const pubCtx = await browser.newContext({ viewport: DESKTOP });
  const pubPage = await pubCtx.newPage();
  await pubPage.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 20000 });
  await pubPage.waitForTimeout(2000);
  await pubPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-landing.png'), fullPage: false });
  console.log('  desktop-landing.png');
  await pubPage.setViewportSize(MOBILE);
  await pubPage.waitForTimeout(1000);
  await pubPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-landing.png'), fullPage: false });
  console.log('  mobile-landing.png');
  await pubCtx.close();

  // Desktop
  console.log('\nDesktop:');
  const dCtx = await browser.newContext({ viewport: DESKTOP });
  const dPage = await dCtx.newPage();
  await login(dPage);
  console.log('  Logged in: ' + dPage.url());

  for (const s of SCREENS) {
    try {
      await navigate(dPage, s.path);
      if (dPage.url().includes('/auth/')) {
        await login(dPage);
        await navigate(dPage, s.path);
      }
      const sp = await dPage.locator('.animate-spin').count();
      if (sp > 0) await dPage.waitForTimeout(3000);
      await dPage.screenshot({ path: path.join(SCREENSHOT_DIR, `desktop-${s.name}.png`), fullPage: false });
      console.log(`  desktop-${s.name}.png`);
    } catch (e) {
      console.error(`  FAIL: desktop-${s.name} - ${e}`);
    }
  }

  // Dark mode
  await navigate(dPage, '/dashboard');
  await dPage.emulateMedia({ colorScheme: 'dark' });
  await dPage.waitForTimeout(1500);
  await dPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-dark-mode.png'), fullPage: false });
  console.log('  desktop-dark-mode.png');
  await dCtx.close();

  // Mobile
  console.log('\nMobile:');
  const mCtx = await browser.newContext({ viewport: MOBILE });
  const mPage = await mCtx.newPage();
  await login(mPage);
  console.log('  Logged in: ' + mPage.url());

  for (const s of SCREENS) {
    try {
      await navigate(mPage, s.path);
      if (mPage.url().includes('/auth/')) {
        await login(mPage);
        await navigate(mPage, s.path);
      }
      const sp = await mPage.locator('.animate-spin').count();
      if (sp > 0) await mPage.waitForTimeout(3000);
      await mPage.screenshot({ path: path.join(SCREENSHOT_DIR, `mobile-${s.name}.png`), fullPage: false });
      console.log(`  mobile-${s.name}.png`);
    } catch (e) {
      console.error(`  FAIL: mobile-${s.name} - ${e}`);
    }
  }

  await mCtx.close();
  await browser.close();
  console.log('\nDone!');
};

main().catch(console.error);
