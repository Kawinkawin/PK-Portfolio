import { expect, test } from '@playwright/test';

test.describe('PK Portfolio E2E Verification', () => {
  test('renders all sections, assets, and interactions cleanly without console or network errors', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const failedResponses: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });
    page.on('response', (response) => {
      const url = response.url();
      if (url.startsWith('http://127.0.0.1:4173') && response.status() >= 400) {
        failedResponses.push(`${response.status()} ${url}`);
      }
    });

    await page.goto('/');

    // Primary sections
    await expect(page.getByRole('heading', { name: /Kawin P/i })).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#internships')).toBeVisible();
    await expect(page.locator('#education')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#skills')).toBeVisible();
    await expect(page.locator('#certifications')).toBeVisible();
    await expect(page.locator('#achievements')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();

    // Verify 9 certification cards and 3 experience tiles
    await expect(page.locator('.stack-card')).toHaveCount(9);
    await expect(page.locator('.exp-tile')).toHaveCount(3);

    // Check horizontal overflow on current viewport
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasHorizontalOverflow).toBe(false);

    // Theme toggle persistence
    const themeToggle = page.locator('#themeToggle');
    await themeToggle.click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
    await page.reload();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
    await themeToggle.click();
    await expect(page.locator('body')).toHaveAttribute('data-theme', 'light');

    // Experience modal interactions across tiles
    await page.locator('#expTile1').click();
    const modal = page.locator('#expModalOverlay');
    await expect(modal).toHaveClass(/active/);
    await expect(page.locator('#expModalRole')).toHaveText('AIML Engineer');
    await page.locator('#expModalClose').click();
    await expect(modal).not.toHaveClass(/active/);

    await page.locator('#expTile2').click();
    await expect(modal).toHaveClass(/active/);
    await expect(page.locator('#expModalRole')).toHaveText('Data Science Intern');
    await expect(page.locator('#expModalDuration')).toHaveText('2024 (6 Months)');
    await page.keyboard.press('Escape');
    await expect(modal).not.toHaveClass(/active/);

    // Projects carousel navigation
    const dots = page.locator('.carousel-dot');
    await expect(dots).toHaveCount(6);
    await expect(dots.nth(0)).toHaveClass(/active/);
    await page.locator('#projectNext').click();
    await expect(dots.nth(1)).toHaveClass(/active/);

    // Back to top button appears after scrolling
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(page.locator('#backToTop')).toHaveClass(/visible/);

    // Contact form validation & submission
    await page.locator('#contactForm button[type="submit"]').click();
    await expect(page.locator('.form-error').first()).toBeVisible();

    await page.locator('#name').fill('Kawin Tester');
    await page.locator('#email').fill('tester@example.com');
    await page.locator('#message').fill('Testing Playwright form submission');
    await page.locator('#contactForm button[type="submit"]').click();
    await expect(page.locator('#contactForm button[type="submit"]')).toContainText('Message Sent!', {
      timeout: 5000,
    });

    // 404 route check and return home
    await page.goto('/missing-page');
    await expect(page.getByText('404')).toBeVisible();
    await page.getByRole('link', { name: /Back to Portfolio/i }).click();
    await expect(page.getByRole('heading', { name: /Kawin P/i })).toBeVisible();

    expect(failedResponses).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
