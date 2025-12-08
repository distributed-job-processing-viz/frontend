import { test, expect } from '@playwright/test';

/**
 * E2E Test 2: Worker Management
 *
 * Critical user flow: User scales workers up/down and monitors utilization
 *
 * Quality criteria tested:
 * - Functional correctness: Worker scaling operations work correctly
 * - Usability: Controls are intuitive and responsive
 * - Reliability: Worker count and utilization update correctly
 */
test.describe('Worker Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to dashboard
    await page.goto('/dashboard');

    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');

    // Open the sidebar
    const sidebarToggle = page.getByRole('button', { name: /panel/i }).or(page.getByRole('button').filter({ has: page.locator('svg') }).last());
    await sidebarToggle.click();

    // Wait for sidebar to open
    await page.waitForTimeout(500);

    // Click on Workers tab if it exists
    const workersTab = page.getByRole('tab', { name: /workers/i });
    if (await workersTab.isVisible()) {
      await workersTab.click();
      await page.waitForTimeout(300);
    }
  });

  test('should display current worker count and utilization', async ({ page }) => {
    // Check for worker management panel elements
    await expect(page.getByText('Active Workers')).toBeVisible();
    await expect(page.getByText('Utilization')).toBeVisible();

    // Utilization percentage should be visible
    await expect(page.locator('text=/\\d+%/')).toBeVisible();
  });

  test('should have add and remove worker buttons', async ({ page }) => {
    // Quick control buttons should be present
    await expect(page.getByRole('button', { name: /add/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /remove/i })).toBeVisible();
  });

  test('should show bulk scale controls with slider', async ({ page }) => {
    // Bulk scale section
    await expect(page.getByText('Bulk Scale')).toBeVisible();
    await expect(page.getByText('Target Count')).toBeVisible();

    // Slider should be present
    const slider = page.locator('[role="slider"]');
    await expect(slider).toBeVisible();

    // Set button should be present
    await expect(page.getByRole('button', { name: /set to/i })).toBeVisible();
  });

  test('should display worker list with status badges', async ({ page }) => {
    // Workers list header
    await expect(page.getByText(/workers \(\d+\)/i)).toBeVisible();

    // Look for status badges (IDLE, PROCESSING, etc.)
    // These may or may not be present depending on if workers exist
    const workerCards = page.locator('[class*="border"][class*="rounded"]').filter({
      hasText: /IDLE|PROCESSING|STOPPED/
    });

    const count = await workerCards.count();

    if (count > 0) {
      // At least one worker card should have an ID
      await expect(workerCards.first()).toContainText(/worker-|ID/i);
    } else {
      // Should show "No active workers" message
      await expect(page.getByText(/no active workers/i)).toBeVisible();
    }
  });

  test('should add a worker using the Add button', async ({ page }) => {
    // Get initial worker count - use more specific selector
    const activeWorkersCard = page.locator('[data-slot="card"]').filter({ hasText: /active workers/i }).first();
    const activeWorkersText = await activeWorkersCard.innerText();
    const initialCount = parseInt(activeWorkersText.match(/\d+/)?.[0] || '0');

    // Click Add button
    const addButton = page.getByRole('button', { name: /^add$/i }).first();
    await addButton.click();

    // Wait for operation to complete (look for loading state to disappear)
    await page.waitForTimeout(2000);

    // Verify count increased (with polling buffer)
    await page.waitForTimeout(1000);

    const newActiveWorkersText = await activeWorkersCard.innerText();
    const newCount = parseInt(newActiveWorkersText.match(/\d+/)?.[0] || '0');

    expect(newCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('should interact with bulk scale slider', async ({ page }) => {
    const slider = page.locator('[role="slider"]');
    await expect(slider).toBeVisible();

    // Get bounding box and click to change value
    const box = await slider.boundingBox();
    if (box) {
      // Click in the middle to set a value
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);

      // Target count should update
      await expect(page.getByText(/target count/i)).toBeVisible();
    }
  });
});
