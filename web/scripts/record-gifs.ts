/**
 * Records 3 demo flows for LinguaFlow as Playwright videos (webm),
 * then converts each into a GIF via ffmpeg.
 *
 * Outputs:
 *   docs/gifs/demo-full-flow.gif         (~15s)
 *   docs/gifs/demo-quiz-interaction.gif  (~8s)
 *   docs/gifs/demo-dark-mode-toggle.gif  (~5s)
 *
 * Usage:
 *   cd web && npx tsx scripts/record-gifs.ts
 *
 * Requires: ffmpeg in PATH, web on :3000, api on :3001.
 */
import { chromium, type Page, type Browser, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const BASE_URL = 'http://localhost:3000';
const REPO_ROOT = path.resolve(__dirname, '../..');
const GIF_DIR = path.join(REPO_ROOT, 'docs', 'gifs');
const VIDEO_DIR = path.join(REPO_ROOT, 'web', 'scripts', '.video-tmp');

const VIEWPORT = { width: 1280, height: 720 };

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const login = async (page: Page) => {
  await page.goto(BASE_URL + '/auth/login', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(800);
  await page.locator('input[type="email"]').first().fill('user@linguaflow.app');
  await page.locator('input[type="password"]').first().fill('user123');
  await page.waitForTimeout(300);
  await page.locator('button[type="submit"]').first().click();
  try { await page.waitForURL('**/dashboard**', { timeout: 10000 }); } catch {}
  await page.waitForTimeout(1500);
};

const newRecCtx = async (browser: Browser, name: string): Promise<BrowserContext> => {
  return browser.newContext({
    viewport: VIEWPORT,
    recordVideo: { dir: path.join(VIDEO_DIR, name), size: VIEWPORT },
  });
};

/** Find the latest .webm in dir. */
const latestVideo = (dir: string): string | null => {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.webm'))
    .map(f => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  return files.length ? path.join(dir, files[0].f) : null;
};

/** Convert a webm to a high-quality looping GIF using ffmpeg palettegen/paletteuse. */
const webmToGif = (input: string, output: string, fps = 12, width = 800) => {
  const filter = `fps=${fps},scale=${width}:-1:flags=lanczos`;
  const palette = output + '.palette.png';
  // Quote paths for Windows
  const q = (s: string) => `"${s}"`;
  execSync(
    `ffmpeg -y -i ${q(input)} -vf "${filter},palettegen=stats_mode=diff" ${q(palette)}`,
    { stdio: 'inherit' }
  );
  execSync(
    `ffmpeg -y -i ${q(input)} -i ${q(palette)} -lavfi "${filter} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" -loop 0 ${q(output)}`,
    { stdio: 'inherit' }
  );
  fs.unlinkSync(palette);
};

// ─────────────────────── Flow 1: Full flow ───────────────────────
const recordFullFlow = async (browser: Browser) => {
  console.log('\n[1/3] Recording demo-full-flow ...');
  const ctx = await newRecCtx(browser, 'full-flow');
  const page = await ctx.newPage();

  // Landing
  await page.goto(BASE_URL + '/', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(2000);

  // Click "Start Free" header link → /auth/login
  try {
    await page.getByRole('link', { name: /Start Free/i }).first().click({ timeout: 4000 });
  } catch {
    await page.goto(BASE_URL + '/auth/login', { waitUntil: 'networkidle' });
  }
  await page.waitForTimeout(1500);

  // Login
  await page.locator('input[type="email"]').first().fill('user@linguaflow.app');
  await page.waitForTimeout(300);
  await page.locator('input[type="password"]').first().fill('user123');
  await page.waitForTimeout(400);
  await page.locator('button[type="submit"]').first().click();
  try { await page.waitForURL('**/dashboard**', { timeout: 10000 }); } catch {}
  await page.waitForTimeout(2500);

  // Go to quiz
  await page.goto(BASE_URL + '/quiz', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Click first option
  try {
    const opt = page.locator('button[aria-label^="Lựa chọn"]').first();
    await opt.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await opt.click({ timeout: 4000 });
  } catch (e) { console.warn('  option click failed:', e); }
  await page.waitForTimeout(2500);

  await ctx.close();
  const v = latestVideo(path.join(VIDEO_DIR, 'full-flow'));
  if (!v) throw new Error('full-flow video missing');
  webmToGif(v, path.join(GIF_DIR, 'demo-full-flow.gif'), 10, 800);
  console.log('  -> demo-full-flow.gif');
};

// ─────────────────── Flow 2: Quiz interaction ────────────────────
const recordQuizInteraction = async (browser: Browser) => {
  console.log('\n[2/3] Recording demo-quiz-interaction ...');
  const ctx = await newRecCtx(browser, 'quiz');
  const page = await ctx.newPage();

  await login(page);
  await page.goto(BASE_URL + '/quiz', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  const options = page.locator('button[aria-label^="Lựa chọn"]');
  const count = await options.count();
  if (count === 0) {
    console.warn('  No quiz options visible.');
  } else {
    // Hover a couple options
    for (let i = 0; i < Math.min(count, 3); i++) {
      try { await options.nth(i).hover({ timeout: 2000 }); } catch {}
      await page.waitForTimeout(500);
    }
    // Click an option (1st)
    try { await options.first().click({ timeout: 3000 }); } catch {}
    await page.waitForTimeout(1800);

    // Click "Tiếp theo" / Next button if appears
    try {
      const next = page.getByRole('button', { name: /Tiếp|Next|Câu/ }).first();
      if (await next.count()) {
        await next.click({ timeout: 2500 });
        await page.waitForTimeout(1500);
        // Click another option in the next question
        const opts2 = page.locator('button[aria-label^="Lựa chọn"]');
        if (await opts2.count()) await opts2.nth(1).click({ timeout: 2500 });
        await page.waitForTimeout(1500);
      }
    } catch {}
  }

  await ctx.close();
  const v = latestVideo(path.join(VIDEO_DIR, 'quiz'));
  if (!v) throw new Error('quiz video missing');
  webmToGif(v, path.join(GIF_DIR, 'demo-quiz-interaction.gif'), 12, 800);
  console.log('  -> demo-quiz-interaction.gif');
};

// ─────────────────── Flow 4: Vocabulary flashcard ───────────────
const recordFlashcard = async (browser: Browser) => {
  console.log('\n[4/4] Recording demo-vocabulary-flashcard ...');
  const ctx = await newRecCtx(browser, 'flashcard');
  const page = await ctx.newPage();

  await login(page);
  await page.goto(BASE_URL + '/flashcards', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2200);

  // Flip the card a few times via clicks + keyboard arrows
  try {
    const card = page.locator('[role="button"], .cursor-pointer, button').filter({ hasText: /./ }).first();
    // Prefer clicking the visible card surface
    await page.mouse.click(640, 380);
    await page.waitForTimeout(1200);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(900);
    await page.mouse.click(640, 380);
    await page.waitForTimeout(1200);
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(1200);
    await page.mouse.click(640, 380);
    await page.waitForTimeout(1500);
  } catch (e) { console.warn('  flashcard interaction failed:', e); }

  await ctx.close();
  const v = latestVideo(path.join(VIDEO_DIR, 'flashcard'));
  if (!v) throw new Error('flashcard video missing');
  webmToGif(v, path.join(GIF_DIR, 'demo-vocabulary-flashcard.gif'), 12, 800);
  console.log('  -> demo-vocabulary-flashcard.gif');
};

// ─────────────────── Flow 3: Dark mode toggle ────────────────────
const recordDarkToggle = async (browser: Browser) => {
  console.log('\n[3/3] Recording demo-dark-mode-toggle ...');
  const ctx = await newRecCtx(browser, 'dark');
  const page = await ctx.newPage();

  await login(page);
  await page.goto(BASE_URL + '/dashboard', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2200);

  const toggle = page.locator('button[aria-label="Toggle dark mode"]').first();
  // Toggle to dark
  try { await toggle.click({ timeout: 3000 }); } catch (e) { console.warn('  dark toggle 1 failed:', e); }
  await page.waitForTimeout(1800);
  // Toggle back to light
  try { await toggle.click({ timeout: 3000 }); } catch {}
  await page.waitForTimeout(1500);

  await ctx.close();
  const v = latestVideo(path.join(VIDEO_DIR, 'dark'));
  if (!v) throw new Error('dark video missing');
  webmToGif(v, path.join(GIF_DIR, 'demo-dark-mode-toggle.gif'), 14, 800);
  console.log('  -> demo-dark-mode-toggle.gif');
};

const main = async () => {
  ensureDir(GIF_DIR);
  ensureDir(VIDEO_DIR);

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  try {
    await recordFlashcard(browser);
  } finally {
    await browser.close();
  }

  // Cleanup video tmp dir
  try { fs.rmSync(VIDEO_DIR, { recursive: true, force: true }); } catch {}
  console.log('\nAll GIFs written to', GIF_DIR);
};

main().catch(err => { console.error(err); process.exit(1); });
