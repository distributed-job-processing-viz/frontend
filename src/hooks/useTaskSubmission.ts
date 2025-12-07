import { useState } from 'react';
import { useApiService } from './useApiService';
import type { TaskSubmissionRequestDTO } from '@/api/Api';
import { toast } from 'sonner';

interface UseTaskSubmissionResult {
  submitTask: (data: TaskSubmissionRequestDTO, options?: { silent?: boolean }) => Promise<boolean>;
  isSubmitting: boolean;
  error: Error | null;
}

/**
 * Custom hook for submitting new tasks
 *
 * Features:
 * - Handles form submission with loading state
 * - Displays success toast on successful submission
 * - Displays error toast on failure
 * - Returns success/failure status for form reset logic
 *
 * @returns Task submission function, loading state, and error information
 */
export function useTaskSubmission(): UseTaskSubmissionResult {
  const apiService = useApiService();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitTask = async (
    data: TaskSubmissionRequestDTO,
    options?: { silent?: boolean }
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const task = await apiService.submitTask(data);

      if (!options?.silent) {
        toast.success('Task created successfully', {
          description: `"${task.name}" has been added to the queue`,
        });
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create task';
      setError(err instanceof Error ? err : new Error(errorMessage));

      if (!options?.silent) {
        toast.error('Failed to create task', {
          description: errorMessage,
        });
      }

      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitTask,
    isSubmitting,
    error,
  };
}
