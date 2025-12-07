import { useState, useEffect, useCallback, useRef } from 'react';
import { useApiService } from './useApiService';
import type { EngineStatusResponse } from '@/api/Api';
import { toast } from 'sonner';

const POLL_INTERVAL_MS = 2000; // 2 seconds

interface UseEngineStatusResult {
  status: EngineStatusResponse | null;
  isLoading: boolean;
  error: Error | null;
  startEngine: () => Promise<void>;
  pauseEngine: () => Promise<void>;
  stopEngine: () => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for managing engine status and controls
 * TODO: Replace polling with WebSocket subscription for real-time engine status updates
 *
 * Features:
 * - Polls engine status every 2 seconds
 * - Start/stop engine controls
 * - Toast notifications for actions
 *
 * @returns Engine status, control functions, and loading state
 */
export function useEngineStatus(): UseEngineStatusResult {
  const apiService = useApiService();
  const [status, setStatus] = useState<EngineStatusResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const engineStatus = await apiService.getEngineStatus();
      setStatus(engineStatus);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch engine status'));
      console.error('Error fetching engine status:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiService]);

  const startEngine = async (): Promise<void> => {
    try {
      const response = await apiService.startEngine();
      setStatus(response);

      toast.success('Engine started', {
        description: response.message || 'The processing engine is now running',
      });

      await fetchStatus();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to start engine';

      toast.error('Failed to start engine', {
        description: errorMessage,
      });

      throw err;
    }
  };

  const pauseEngine = async (): Promise<void> => {
    try {
      const response = await apiService.pauseEngine();
      setStatus(response);

      toast.info('Engine paused', {
        description: response.message || 'The processing engine has been paused',
      });

      await fetchStatus();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to pause engine';

      toast.error('Failed to pause engine', {
        description: errorMessage,
      });

      throw err;
    }
  };

  const stopEngine = async (): Promise<void> => {
    try {
      const response = await apiService.stopEngine();
      setStatus(response);

      toast.success('Engine stopped', {
        description: response.message || 'The processing engine has been stopped',
      });

      await fetchStatus();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to stop engine';

      toast.error('Failed to stop engine', {
        description: errorMessage,
      });

      throw err;
    }
  };

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        fetchStatus();
        intervalRef.current = setInterval(fetchStatus, POLL_INTERVAL_MS);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchStatus]);

  // Setup polling
  useEffect(() => {
    fetchStatus();

    if (!document.hidden) {
      intervalRef.current = setInterval(fetchStatus, POLL_INTERVAL_MS);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchStatus]);

  return {
    status,
    isLoading,
    error,
    startEngine,
    pauseEngine,
    stopEngine,
    refetch: fetchStatus,
  };
}
