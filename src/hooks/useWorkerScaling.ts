import { useState } from 'react';
import { useApiService } from './useApiService';
import { toast } from 'sonner';

interface UseWorkerScalingResult {
  addWorker: () => Promise<void>;
  removeWorker: (workerId: number) => Promise<void>;
  setWorkerCount: (targetCount: number, currentCount: number) => Promise<void>;
  isScaling: boolean;
  error: Error | null;
}

/**
 * Custom hook for managing worker scaling operations
 *
 * Features:
 * - Add single worker
 * - Remove single worker
 * - Bulk set workers to a target count
 * - Loading states during operations
 * - Success/error toasts for user feedback
 *
 * @returns Worker scaling functions, loading state, and error information
 */
export function useWorkerScaling(): UseWorkerScalingResult {
  const apiService = useApiService();
  const [isScaling, setIsScaling] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addWorker = async (): Promise<void> => {
    setIsScaling(true);
    setError(null);

    try {
      const worker = await apiService.createWorker({});

      toast.success('Worker added', {
        description: `${worker.name} is now active`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to add worker';
      setError(err instanceof Error ? err : new Error(errorMessage));

      toast.error('Failed to add worker', {
        description: errorMessage,
      });
    } finally {
      setIsScaling(false);
    }
  };

  const removeWorker = async (workerId: number): Promise<void> => {
    setIsScaling(true);
    setError(null);

    try {
      const worker = await apiService.stopWorker(workerId);

      toast.success('Worker removed', {
        description: `${worker.name} has been stopped`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to remove worker';
      setError(err instanceof Error ? err : new Error(errorMessage));

      toast.error('Failed to remove worker', {
        description: errorMessage,
      });
    } finally {
      setIsScaling(false);
    }
  };

  const setWorkerCount = async (
    targetCount: number,
    currentCount: number
  ): Promise<void> => {
    if (targetCount === currentCount) {
      return;
    }

    setIsScaling(true);
    setError(null);

    try {
      const difference = targetCount - currentCount;

      if (difference > 0) {
        // Add workers
        const addPromises = Array.from({ length: difference }, () =>
          apiService.createWorker({})
        );
        await Promise.all(addPromises);

        toast.success(`Added ${difference} worker${difference > 1 ? 's' : ''}`, {
          description: `Worker count scaled to ${targetCount}`,
        });
      } else {
        // Remove workers - get current workers and stop the required number
        const workers = await apiService.getAllWorkers();
        const workersArray = Array.isArray(workers) ? workers : [workers];

        // Filter out already stopped workers and get active ones
        const activeWorkers = workersArray.filter(w => w.status !== 'STOPPED');
        const workersToRemove = activeWorkers.slice(0, Math.abs(difference));

        const removePromises = workersToRemove.map((worker) =>
          worker.id ? apiService.stopWorker(worker.id) : Promise.resolve()
        );
        await Promise.all(removePromises);

        toast.success(
          `Removed ${Math.abs(difference)} worker${Math.abs(difference) > 1 ? 's' : ''}`,
          {
            description: `Worker count scaled to ${targetCount}`,
          }
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to scale workers';
      setError(err instanceof Error ? err : new Error(errorMessage));

      toast.error('Failed to scale workers', {
        description: errorMessage,
      });
    } finally {
      setIsScaling(false);
    }
  };

  return {
    addWorker,
    removeWorker,
    setWorkerCount,
    isScaling,
    error,
  };
}
