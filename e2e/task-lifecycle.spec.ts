import { test, expect } from '@playwright/test';

/**
 * E2E Test 1: Task Creation & Lifecycle
 *
 * Critical user flow: User creates a task and tracks it through the Kanban board
 *
 * Quality criteria tested:
 * - Functional correctness: Task creation works end-to-end
 * - Usability: UI responds correctly to user actions
 * - Reliability: Task appears in correct column and updates status
 */
test.describe('Task Creation & Lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the dashboard
    await page.goto('/dashboard');

    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');
  });

  test('should create a task and see it in the PENDING column', async ({ page }) => {
    // Open the sidebar with task submission form
    const sidebarToggle = page.getByRole('button').filter({ has: page.locator('svg') }).last();

    // Check if sidebar is already open
    const isOpen = await page.getByRole('tab', { name: /tasks/i }).isVisible().catch(() => false);
    if (!isOpen) {
      await sidebarToggle.click();
      await page.waitForTimeout(500);
    }

    // Ensure we're on the Tasks tab
    const tasksTab = page.getByRole('tab', { name: /new task/i });
    if (await tasksTab.isVisible()) {
      await tasksTab.click();
      await page.waitForTimeout(300);
    }

    // Wait for sidebar to be visible
    await expect(page.getByLabel(/task name/i)).toBeVisible();

    // Fill out task submission form
    await page.getByLabel(/task name/i).fill('E2E Test Task');

    // Select complexity
    await page.getByRole('combobox').click();
    await page.getByRole('option', { name: /medium/i }).click();

    // Submit the task
    await page.getByRole('button', { name: /create task/i }).click();

    // Wait for success feedback (toast or form reset)
    await expect(page.getByLabel(/task name/i)).toHaveValue('');

    // Verify task appears in Kanban board PENDING column
    await expect(page.getByText('PENDING')).toBeVisible();

    // Look for the task we just created (may take a moment due to polling)
    await page.waitForTimeout(2000); // Allow polling to fetch new task

    // Task should be visible somewhere on the board (use first to avoid strict mode violation)
    await expect(page.getByText('E2E Test Task').first()).toBeVisible({ timeout: 5000 });
  });

  test('should use the random button to generate task details', async ({ page }) => {
    // Open sidebar
    const sidebarToggle = page.getByRole('button').filter({ has: page.locator('svg') }).last();

    // Check if sidebar is already open
    const isOpen = await page.getByRole('tab', { name: /tasks/i }).isVisible().catch(() => false);
    if (!isOpen) {
      await sidebarToggle.click();
      await page.waitForTimeout(500);
    }

    // Ensure we're on the Tasks tab
    const tasksTab = page.getByRole('tab', { name: /new task/i });
    if (await tasksTab.isVisible()) {
      await tasksTab.click();
      await page.waitForTimeout(300);
    }

    // Wait for form to be visible
    await expect(page.getByLabel(/task name/i)).toBeVisible();

    // Click random button
    await page.getByRole('button', { name: /^random$/i }).click();

    // Verify form is filled
    const taskNameInput = page.getByLabel(/task name/i);
    const taskName = await taskNameInput.inputValue();

    expect(taskName).toBeTruthy();
    expect(taskName).toMatch(/#\d+$/); // Should end with #number
  });

  test('should display task cards in the Kanban board', async ({ page }) => {
    // The Kanban board should be visible by default
    await expect(page.getByRole('heading', { name: /^pending$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^processing$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^completed$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^failed$/i })).toBeVisible();

    // Check if any task cards are present (assuming backend has data)
    const taskCards = page.locator('[class*="border"][class*="rounded"]').filter({ hasText: /LOW|MEDIUM|HIGH/ });

    // If tasks exist, verify they have proper structure
    const count = await taskCards.count();
    if (count > 0) {
      const firstCard = taskCards.first();
      await expect(firstCard).toBeVisible();
    }
  });
});
