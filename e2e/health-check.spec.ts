import { test, expect } from '@playwright/test';

/**
 * Health check test to verify backend connectivity
 * This should run first to ensure the backend is reachable before other tests
 */
test.describe('Backend Health Check', () => {
  test('should verify backend API is reachable at localhost:8080', async ({ request }) => {
    // Make a direct request to the backend health endpoint
    const response = await request.get('http://localhost:8080/api/health');

    // Verify the backend is responding
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Log the health check response
    const body = await response.text();
    console.log('Backend health check response:', body);
  });

  test('should verify frontend can reach backend through VITE_API', async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check console for any network errors to localhost:8080
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to capture any errors
    await page.waitForTimeout(1000);

    // Verify no errors about failed connections to localhost:8080
    const connectionErrors = errors.filter(err =>
      err.includes('localhost:8080') || err.includes('Failed to fetch')
    );

    expect(connectionErrors).toHaveLength(0);
  });
});
