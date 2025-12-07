import type { TaskResponseDTO } from '@/api/Api';

/**
 * Grouped tasks by their status
 */
export interface GroupedTasks {
  PENDING: TaskResponseDTO[];
  PROCESSING: TaskResponseDTO[];
  COMPLETED: TaskResponseDTO[];
  FAILED: TaskResponseDTO[];
}

/**
 * Groups an array of tasks by their status
 * @param tasks - Array of tasks to group
 * @returns Object with tasks grouped by status, sorted by creation date (newest first)
 */
export function groupTasksByStatus(tasks: TaskResponseDTO[]): GroupedTasks {
  const grouped: GroupedTasks = {
    PENDING: [],
    PROCESSING: [],
    COMPLETED: [],
    FAILED: [],
  };

  tasks.forEach((task) => {
    if (task.status) {
      grouped[task.status].push(task);
    }
  });

  // Sort each group by creation date (newest first)
  Object.keys(grouped).forEach((status) => {
    grouped[status as keyof GroupedTasks].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Descending order (newest first)
    });
  });

  return grouped;
}

/**
 * Gets the count of tasks for a specific status
 * @param tasks - Grouped tasks object
 * @param status - Status to count
 * @returns Number of tasks with the given status
 */
export function getTaskCount(
  tasks: GroupedTasks,
  status: keyof GroupedTasks
): number {
  return tasks[status].length;
}
