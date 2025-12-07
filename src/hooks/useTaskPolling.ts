import { useState, useEffect, useCallback, useRef } from 'react';
import { useApiService } from './useApiService';
import type { TaskResponseDTO } from '@/api/Api';
import { groupTasksByStatus, type GroupedTasks } from '@/lib/taskUtils';

const POLL_INTERVAL_MS = 2000; // 2 seconds

interface UseTaskPollingResult {
  tasks: TaskResponseDTO[];
  groupedTasks: GroupedTasks;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for polling tasks from the API at regular intervals
 * TODO: Replace polling with WebSocket subscription for real-time task updates
 *
 * Features:
 * - Polls every 2 seconds
 * - Pauses when tab is not visible (Page Visibility API)
 * - Groups tasks by status automatically
 * - Provides task counts per status
 *
 * @returns Task data, loading state, and error information
 */
export function useTaskPolling(): UseTaskPollingResult {
  const apiService = useApiService();
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({
    PENDING: [],
    PROCESSING: [],
    COMPLETED: [],
    FAILED: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      // Fetch all tasks (no pagination for now, adjust if needed)
      const response = await apiService.getAllTasks({ size: 1000 });
      const taskList = (response.content || []) as TaskResponseDTO[];

      setTasks(taskList);
      setGroupedTasks(groupTasksByStatus(taskList));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  }, [apiService]);

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
        fetchTasks();
        intervalRef.current = setInterval(fetchTasks, POLL_INTERVAL_MS);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchTasks]);

  // Setup polling
  useEffect(() => {
    // Initial fetch
    fetchTasks();

    // Setup interval only if page is visible
    if (!document.hidden) {
      intervalRef.current = setInterval(fetchTasks, POLL_INTERVAL_MS);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchTasks]);

  return {
    tasks,
    groupedTasks,
    isLoading,
    error,
    refetch: fetchTasks,
  };
}
