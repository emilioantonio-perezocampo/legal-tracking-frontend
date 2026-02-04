import { test, expect } from '@playwright/test';

test.describe('Navigation & Shell', () => {
  // Mock authentication state for all tests in this group
  test.beforeEach(async ({ page, context }) => {
    // Set a fake auth cookie to bypass middleware/login
    await context.addCookies([
      {
        name: 'sb-access-token', // Adjust based on your Supabase cookie name pattern
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

    // Mock the user session call if the app checks it client-side
    await page.route('**/auth/v1/user', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ id: 'user-123', email: 'test@example.com' })
      });
    });
  });

  test('sidebar should update content based on route', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText("Today's Priorities")).toBeVisible();
    await expect(page.getByText('New Case')).toBeVisible();

    await page.goto('/legal-ai');
    await expect(page.getByText('New Chat')).toBeVisible();
    await expect(page.getByText('AI Settings')).toBeVisible();

    await page.goto('/expedientes');
    await expect(page.getByText('Filter by Status')).toBeVisible();
  });

  test('sidebar collapse state should persist', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check initial state (expanded)
    const sidebar = page.locator('aside');
    await expect(sidebar).toHaveClass(/w-\[280px\]/);
    
    // Click toggle button (need to find a stable selector, maybe add data-testid)
    // Assuming the button is the one with the chevron
    await page.locator('aside button').first().click();
    
    // Check collapsed state
    await expect(sidebar).toHaveClass(/w-20/);
    
    // Reload page
    await page.reload();
    
    // Should still be collapsed
    await expect(sidebar).toHaveClass(/w-20/);
  });
});
