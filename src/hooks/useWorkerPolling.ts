import { useState, useEffect, useCallback, useRef } from 'react';
import { useApiService } from './useApiService';
import type { WorkerResponseDTO } from '@/api/Api';

const POLL_INTERVAL_MS = 2000; // 2 seconds

interface WorkerUtilization {
  total: number;
  busy: number;
  idle: number;
  stopped: number;
  utilizationPercentage: number;
}

interface UseWorkerPollingResult {
  workers: WorkerResponseDTO[];
  utilization: WorkerUtilization;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for polling workers from the API at regular intervals
 * TODO: Replace polling with WebSocket subscription for real-time worker status updates
 *
 * Features:
 * - Polls every 2 seconds
 * - Pauses when tab is not visible (Page Visibility API)
 * - Calculates worker utilization metrics
 *
 * @returns Worker data, utilization metrics, loading state, and error information
 */
export function useWorkerPolling(): UseWorkerPollingResult {
  const apiService = useApiService();
  const [workers, setWorkers] = useState<WorkerResponseDTO[]>([]);
  const [utilization, setUtilization] = useState<WorkerUtilization>({
    total: 0,
    busy: 0,
    idle: 0,
    stopped: 0,
    utilizationPercentage: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const calculateUtilization = useCallback(
    (workerList: WorkerResponseDTO[]): WorkerUtilization => {
      const total = workerList.length;
      const busy = workerList.filter((w) => w.status === 'PROCESSING').length;
      const idle = workerList.filter((w) => w.status === 'IDLE').length;
      const stopped = workerList.filter((w) => w.status === 'STOPPED').length;
      const utilizationPercentage = total > 0 ? Math.round((busy / total) * 100) : 0;

      return {
        total,
        busy,
        idle,
        stopped,
        utilizationPercentage,
      };
    },
    []
  );

  const fetchWorkers = useCallback(async () => {
    try {
      const workerList = await apiService.getAllWorkers();
      const workers = Array.isArray(workerList) ? workerList : [workerList];

      setWorkers(workers);
      setUtilization(calculateUtilization(workers));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch workers'));
      console.error('Error fetching workers:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiService, calculateUtilization]);

  // Handle page visibility changes to pause polling when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause polling when tab is hidden
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        // Resume polling when tab becomes visible
        fetchWorkers();
        intervalRef.current = setInterval(fetchWorkers, POLL_INTERVAL_MS);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchWorkers]);

  // Setup polling
  useEffect(() => {
    // Initial fetch
    fetchWorkers();

    // Setup interval only if page is visible
    if (!document.hidden) {
      intervalRef.current = setInterval(fetchWorkers, POLL_INTERVAL_MS);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchWorkers]);

  return {
    workers,
    utilization,
    isLoading,
    error,
    refetch: fetchWorkers,
  };
}
