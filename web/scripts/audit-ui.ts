import { chromium, type Page, type Browser, type ConsoleMessage } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const API_URL = 'http://localhost:3001/api';
const REPORT_PATH = path.resolve(__dirname, '../../docs/UI_AUDIT_REPORT.md');

const DESKTOP = { width: 1280, height: 720 };
const MOBILE = { width: 390, height: 844 };

const PAGES = [
  '/dashboard', '/vocabulary', '/flashcards', '/lessons', '/quiz',
  '/listening', '/speaking', '/reading', '/writing',
  '/skill-tree', '/leaderboard', '/achievements', '/daily-challenge',
  '/quests', '/shop', '/profile', '/settings', '/notifications',
  '/ai-tutor', '/conversation', '/grammar', '/grammar-tips',
  '/sentence-builder', '/stories', '/culture', '/idioms',
  '/word-of-day', '/weak-words', '/bookmarks', '/streak-calendar',
  '/friends', '/memory-game', '/games', '/timed-challenge',
  '/typing-practice', '/word-scramble', '/matching', '/fill-blank',
  '/translation', '/pronunciation', '/dictation', '/grammar-correction',
  '/sentence', '/characters', '/search', '/analytics', '/progress',
  '/study-plan', '/daily-goals', '/onboarding'
];

interface PageIssue {
  path: string;
  severity: 'P0' | 'P1' | 'P2';
  category: string;
  message: string;
  detail?: string;
}

const issues: PageIssue[] = [];

const addIssue = (i: PageIssue) => {
  issues.push(i);
  console.log(`  [${i.severity}] ${i.category}: ${i.message}`);
};

// Login via API and inject auth state
const loginViaApi = async () => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@linguaflow.app', password: 'user123' }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  return data;
};

const injectAuth = async (page: Page, auth: any) => {
  await page.goto(BASE_URL + '/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.evaluate((a) => {
    // Try multiple known patterns
    localStorage.setItem('token', a.token);
    localStorage.setItem('auth_token', a.token);
    localStorage.setItem('authToken', a.token);
    localStorage.setItem('user', JSON.stringify(a.user));
    localStorage.setItem('auth-storage', JSON.stringify({
      state: { token: a.token, user: a.user, isAuthenticated: true },
      version: 0,
    }));
    // Zustand persist key used by web/src/lib/store.ts
    localStorage.setItem('linguaflow-auth', JSON.stringify({
      state: { user: a.user, token: a.token, isAuthenticated: true },
      version: 0,
    }));
  }, auth);
};

const auditPage = async (page: Page, route: string, viewport: 'desktop' | 'mobile') => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  let httpStatus: number | null = null;

  const onConsole = (msg: ConsoleMessage) => {
    if (msg.type() === 'error') {
      const txt = msg.text();
      if (
        !txt.includes('Failed to load resource') &&
        !txt.includes('favicon')
      ) {
        consoleErrors.push(txt);
      }
    }
  };
  const onPageError = (err: Error) => pageErrors.push(err.message);
  const onResponse = (res: any) => {
    const url = res.url();
    if (url === BASE_URL + route || url === BASE_URL + route + '/') {
      httpStatus = res.status();
    }
    if (res.status() >= 500 && url.startsWith(BASE_URL)) {
      failedRequests.push(`${res.status()} ${url}`);
    }
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('response', onResponse);

  try {
    const resp = await page.goto(BASE_URL + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
    if (resp) httpStatus = resp.status();
    try { await page.waitForLoadState('networkidle', { timeout: 5000 }); } catch {}
    await page.waitForTimeout(1500);

    // If redirected to login, re-inject auth and try again - but don't loop
    if (page.url().includes('/auth/')) {
      addIssue({
        path: route,
        severity: 'P1',
        category: 'auth-redirect',
        message: `Redirected to auth on ${viewport} - auth injection may not be working for this page`,
      });
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
      page.off('response', onResponse);
      return;
    }

    // Status check
    if (httpStatus && httpStatus >= 500) {
      addIssue({
        path: route,
        severity: 'P0',
        category: 'http-500',
        message: `Page returned HTTP ${httpStatus}`,
      });
    }
    if (httpStatus === 404) {
      addIssue({
        path: route,
        severity: 'P0',
        category: 'http-404',
        message: `Page returned HTTP 404`,
      });
    }

    // Body content check
    const bodyText = await page.evaluate(() => document.body?.innerText?.trim() ?? '');
    const bodyHTML = await page.evaluate(() => document.body?.innerHTML?.length ?? 0);

    if (bodyHTML < 100) {
      addIssue({
        path: route,
        severity: 'P0',
        category: 'empty-page',
        message: `Page body is empty (HTML length: ${bodyHTML})`,
      });
    }

    // Check for error overlays / Next.js error pages
    const hasError = await page.evaluate(() => {
      const text = document.body?.innerText || '';
      return (
        text.includes('Application error') ||
        text.includes('500: Internal Server Error') ||
        text.includes('This page could not be found') ||
        text.includes('Server Error')
      );
    });
    if (hasError) {
      addIssue({
        path: route,
        severity: 'P0',
        category: 'error-page',
        message: `Error page rendered`,
        detail: bodyText.slice(0, 200),
      });
    }

    // NaN / undefined / null in user-facing text
    const badText = await page.evaluate(() => {
      const text = document.body?.innerText || '';
      const found: string[] = [];
      // Match standalone NaN, undefined, null shown to user
      const patterns = [
        { re: /\bNaN\b/g, label: 'NaN' },
        { re: /\bundefined\b/g, label: 'undefined' },
        { re: /:\s*null\b/g, label: ': null' },
        { re: /\[object Object\]/g, label: '[object Object]' },
      ];
      for (const p of patterns) {
        const m = text.match(p.re);
        if (m && m.length > 0) {
          found.push(`${p.label} (${m.length}x)`);
        }
      }
      return found;
    });
    for (const b of badText) {
      addIssue({
        path: route,
        severity: 'P1',
        category: 'bad-text',
        message: `Found "${b}" in visible text`,
      });
    }

    // Hydration warnings
    const hydrationErrors = consoleErrors.filter(e =>
      e.includes('Hydration') ||
      e.includes('hydrat') ||
      e.includes('did not match') ||
      e.includes('Text content does not match')
    );
    for (const h of hydrationErrors) {
      addIssue({
        path: route,
        severity: 'P1',
        category: 'hydration',
        message: `Hydration issue: ${h.slice(0, 200)}`,
      });
    }

    // Other console errors (filter out known noise)
    const otherErrors = consoleErrors.filter(e =>
      !hydrationErrors.includes(e) &&
      !e.includes('Failed to load resource') &&
      !e.includes('Download the React DevTools')
    );
    for (const e of otherErrors.slice(0, 5)) {
      addIssue({
        path: route,
        severity: 'P1',
        category: 'console-error',
        message: e.slice(0, 250),
      });
    }

    // Page errors (uncaught exceptions)
    for (const e of pageErrors.slice(0, 3)) {
      addIssue({
        path: route,
        severity: 'P0',
        category: 'page-error',
        message: e.slice(0, 250),
      });
    }

    // Failed network requests
    for (const r of failedRequests.slice(0, 3)) {
      addIssue({
        path: route,
        severity: 'P1',
        category: 'failed-request',
        message: r,
      });
    }

    // Mobile-only: horizontal scroll
    if (viewport === 'mobile') {
      const overflow = await page.evaluate(() => {
        const scrollW = document.documentElement.scrollWidth;
        const clientW = document.documentElement.clientWidth;
        return { scrollW, clientW, diff: scrollW - clientW };
      });
      if (overflow.diff > 5) {
        addIssue({
          path: route,
          severity: 'P1',
          category: 'horizontal-scroll',
          message: `Horizontal scroll on mobile: scrollWidth=${overflow.scrollW} > clientWidth=${overflow.clientW} (diff ${overflow.diff}px)`,
        });
      }
    }

    // Check for visible "Loading..." that never resolved
    const stuckLoading = await page.evaluate(() => {
      const spinners = document.querySelectorAll('.animate-spin').length;
      const loadingText = (document.body?.innerText || '').match(/^Loading\.\.\.$/m);
      return { spinners, hasLoadingText: !!loadingText };
    });
    if (stuckLoading.spinners > 0) {
      // Wait a bit more - if still spinning, flag as issue
      await page.waitForTimeout(3500);
      const stillSpinning = await page.evaluate(() => document.querySelectorAll('.animate-spin').length);
      if (stillSpinning > 0) {
        addIssue({
          path: route,
          severity: 'P2',
          category: 'stuck-loading',
          message: `${stillSpinning} spinner(s) still visible after 5s`,
        });
      }
    }

  } catch (err: any) {
    addIssue({
      path: route,
      severity: 'P0',
      category: 'navigation-error',
      message: `Failed to load: ${err.message}`,
    });
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
    page.off('response', onResponse);
  }
};

const main = async () => {
  console.log('Starting UI audit...\n');

  const auth = await loginViaApi();
  console.log('Logged in via API:', auth.user.email);

  const browser: Browser = await chromium.launch({ headless: true });

  // Desktop pass
  console.log('\n=== DESKTOP PASS (1280x720) ===');
  const dCtx = await browser.newContext({ viewport: DESKTOP });
  const dPage = await dCtx.newPage();
  await injectAuth(dPage, auth);

  for (const route of PAGES) {
    console.log(`\n[D] ${route}`);
    await auditPage(dPage, route, 'desktop');
  }
  await dCtx.close();

  // Mobile pass
  console.log('\n=== MOBILE PASS (390x844) ===');
  const mCtx = await browser.newContext({ viewport: MOBILE });
  const mPage = await mCtx.newPage();
  await injectAuth(mPage, auth);

  for (const route of PAGES) {
    console.log(`\n[M] ${route}`);
    await auditPage(mPage, route, 'mobile');
  }
  await mCtx.close();
  await browser.close();

  // Generate report
  const p0 = issues.filter(i => i.severity === 'P0');
  const p1 = issues.filter(i => i.severity === 'P1');
  const p2 = issues.filter(i => i.severity === 'P2');

  const groupByPath = (arr: PageIssue[]) => {
    const m: Record<string, PageIssue[]> = {};
    for (const i of arr) (m[i.path] ||= []).push(i);
    return m;
  };

  const renderGroup = (title: string, arr: PageIssue[]) => {
    if (arr.length === 0) return `## ${title}\n_No issues._\n`;
    const grouped = groupByPath(arr);
    let s = `## ${title}\n\n`;
    for (const [p, list] of Object.entries(grouped)) {
      s += `### ${p}\n`;
      for (const i of list) {
        s += `- **[${i.category}]** ${i.message}\n`;
        if (i.detail) s += `  - Detail: \`${i.detail.replace(/`/g, "'")}\`\n`;
      }
      const fileGuess = `web/src/app${p}/page.tsx`;
      s += `- File: \`${fileGuess}\`\n\n`;
    }
    return s;
  };

  const report = `# UI Audit Report
Date: ${new Date().toISOString().slice(0, 10)}
Pages audited: ${PAGES.length}
Total bugs found: ${issues.length}
Viewports: Desktop 1280x720, Mobile 390x844

## Summary
| Severity | Count |
|----------|-------|
| P0 (broken) | ${p0.length} |
| P1 (visible bug) | ${p1.length} |
| P2 (polish) | ${p2.length} |

${renderGroup('P0 Bugs', p0)}
${renderGroup('P1 Bugs', p1)}
${renderGroup('P2 Polish', p2)}
`;

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`\n\nReport written to ${REPORT_PATH}`);
  console.log(`P0: ${p0.length}, P1: ${p1.length}, P2: ${p2.length}`);
};

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
