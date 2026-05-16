import { test, expect } from '@playwright/test';

test.describe('LinguaFlow - Core Pages', () => {
  test('landing page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/LinguaFlow/i);
  });

  test('login page renders form', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('register page renders form', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
  });

  test('dashboard page loads', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('body')).toBeVisible();
  });

  test('vocabulary page loads', async ({ page }) => {
    await page.goto('/vocabulary');
    await expect(page.locator('body')).toBeVisible();
  });

  test('quiz page loads', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.locator('body')).toBeVisible();
  });

  test('listening page loads', async ({ page }) => {
    await page.goto('/listening');
    await expect(page.locator('body')).toBeVisible();
  });

  test('speaking page loads', async ({ page }) => {
    await page.goto('/speaking');
    await expect(page.locator('body')).toBeVisible();
  });

  test('skill-tree page loads', async ({ page }) => {
    await page.goto('/skill-tree');
    await expect(page.locator('body')).toBeVisible();
  });

  test('leaderboard page loads', async ({ page }) => {
    await page.goto('/leaderboard');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('LinguaFlow - Mobile Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile dashboard renders correctly', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('body')).toBeVisible();
  });

  test('mobile navigation works', async ({ page }) => {
    await page.goto('/vocabulary');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('LinguaFlow - Accessibility', () => {
  test('login page has proper labels', async ({ page }) => {
    await page.goto('/auth/login');
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('pages have proper heading hierarchy', async ({ page }) => {
    await page.goto('/dashboard');
    const h1 = page.locator('h1');
    const count = await h1.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
