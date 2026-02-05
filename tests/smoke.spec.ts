import { test, expect } from '@playwright/test';

test.describe('Critical Path Smoke Tests', () => {
  // Mock authentication for smoke tests
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'sb-access-token', 
        value: 'fake-token',
        domain: 'localhost',
        path: '/',
      },
      {
        name: 'sb-refresh-token',
        value: 'fake-refresh',
        domain: 'localhost',
        path: '/',
      }
    ]);

    await page.route('**/auth/v1/user', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ id: 'user-123', email: 'test@example.com' })
      });
    });
  });

  test('Dashboard loads with key metrics', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('Active Cases')).toBeVisible();
    await expect(page.getByText('Recent AI Queries')).toBeVisible();
    await expect(page.getByText('Legal Alerts')).toBeVisible();
  });

  test('Legal AI interface initializes correctly', async ({ page }) => {
    await page.goto('/legal-ai');
    await expect(page.getByText('Legal Assistant')).toBeVisible();
    // Check for the input area
    await expect(page.getByPlaceholder('Ask a legal question...')).toBeVisible();
  });

  test('Expedientes list renders', async ({ page }) => {
    await page.goto('/expedientes');
    await expect(page.getByText('Expedientes')).toBeVisible();
    await expect(page.getByText('Nuevo Expediente')).toBeVisible();
  });

  test('Calendar view renders', async ({ page }) => {
    await page.goto('/calendar');
    // Check for month header (mocked as current month usually, or January 2026 based on previous static mock)
    // We'll check for a generic calendar element
    await expect(page.getByText('Add Event')).toBeVisible();
  });
});
