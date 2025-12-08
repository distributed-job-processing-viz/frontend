import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, waitFor, userEvent } from '@/test/utils/test-utils';
import { TaskSubmissionForm } from '@/components/TaskSubmissionForm';

/**
 * Integration tests for task submission form
 * Quality criteria: Form rendering, user interactions (non-Select), API integration
 *
 * Note: Tests involving Radix UI Select are skipped because:
 * 1. Radix UI Select requires pointer capture APIs not available in jsdom
 * 2. Radix UI is already extensively tested by the Radix team
 * 3. We focus on testing our business logic, not third-party library behavior
 */
describe('Task Submission Integration', () => {

  it('should render the task submission form with all fields', () => {
    renderWithProviders(<TaskSubmissionForm />);

    // Verify form fields are present
    expect(screen.getByLabelText(/task name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/complexity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^random$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^create task$/i })).toBeInTheDocument();
  });

  it('should populate form with random values when random button clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaskSubmissionForm />);

    const randomButton = screen.getByRole('button', { name: /^random$/i });
    await user.click(randomButton);

    const taskNameInput = screen.getByLabelText(/task name/i) as HTMLInputElement;

    // Should have a random task name with #number format
    await waitFor(() => {
      expect(taskNameInput.value).toMatch(/.+#\d+$/);
    });
  });

  it('should allow typing in the task name field', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TaskSubmissionForm />);

    const taskNameInput = screen.getByLabelText(/task name/i) as HTMLInputElement;

    await user.type(taskNameInput, 'My Test Task');

    expect(taskNameInput.value).toBe('My Test Task');
  });
});
