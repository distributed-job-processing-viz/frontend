import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTaskSubmission } from './useTaskSubmission';
import { toast } from 'sonner';

// Mock dependencies
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('./useApiService', () => ({
  useApiService: () => ({
    submitTask: vi.fn().mockResolvedValue({
      id: 1,
      name: 'Test Task',
      complexity: 'LOW',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    }),
  }),
}));

/**
 * Unit tests for useTaskSubmission hook
 * Quality criteria: State management, error handling, user feedback
 */
describe('useTaskSubmission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useTaskSubmission());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.submitTask).toBe('function');
  });

  it('should submit task successfully', async () => {
    const { result } = renderHook(() => useTaskSubmission());

    const taskData = { name: 'Test Task', complexity: 'LOW' as const };

    // Submit and await completion
    const success = await result.current.submitTask(taskData);

    // Verify final state after async operation completes
    expect(success).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(toast.success).toHaveBeenCalledWith(
      'Task created successfully',
      expect.objectContaining({
        description: expect.stringContaining('Test Task'),
      })
    );
  });

  it('should not show toast when silent option is true', async () => {
    const { result } = renderHook(() => useTaskSubmission());

    const taskData = { name: 'Test Task', complexity: 'LOW' as const };
    await result.current.submitTask(taskData, { silent: true });

    expect(toast.success).not.toHaveBeenCalled();
  });
});
