import { describe, it, expect } from 'vitest';
import { groupTasksByStatus, getTaskCount } from './taskUtils';
import type { TaskResponseDTO } from '@/api/Api';

/**
 * Unit tests for task utility functions
 * Quality criteria: Data transformation correctness, sorting logic
 */
describe('taskUtils', () => {
  describe('groupTasksByStatus', () => {
    it('should group tasks by status', () => {
      const tasks: TaskResponseDTO[] = [
        { id: 1, name: 'Task 1', complexity: 'LOW', status: 'PENDING', createdAt: '2024-12-08T10:00:00Z' },
        { id: 2, name: 'Task 2', complexity: 'MEDIUM', status: 'PROCESSING', createdAt: '2024-12-08T10:01:00Z' },
        { id: 3, name: 'Task 3', complexity: 'HIGH', status: 'COMPLETED', createdAt: '2024-12-08T10:02:00Z' },
        { id: 4, name: 'Task 4', complexity: 'LOW', status: 'FAILED', createdAt: '2024-12-08T10:03:00Z' },
      ];

      const grouped = groupTasksByStatus(tasks);

      expect(grouped.PENDING).toHaveLength(1);
      expect(grouped.PROCESSING).toHaveLength(1);
      expect(grouped.COMPLETED).toHaveLength(1);
      expect(grouped.FAILED).toHaveLength(1);
      expect(grouped.PENDING[0].name).toBe('Task 1');
      expect(grouped.PROCESSING[0].name).toBe('Task 2');
    });

    it('should handle multiple tasks with the same status', () => {
      const tasks: TaskResponseDTO[] = [
        { id: 1, name: 'Task 1', complexity: 'LOW', status: 'PENDING', createdAt: '2024-12-08T10:00:00Z' },
        { id: 2, name: 'Task 2', complexity: 'MEDIUM', status: 'PENDING', createdAt: '2024-12-08T10:05:00Z' },
        { id: 3, name: 'Task 3', complexity: 'HIGH', status: 'PENDING', createdAt: '2024-12-08T10:03:00Z' },
      ];

      const grouped = groupTasksByStatus(tasks);

      expect(grouped.PENDING).toHaveLength(3);
      expect(grouped.PROCESSING).toHaveLength(0);
      expect(grouped.COMPLETED).toHaveLength(0);
      expect(grouped.FAILED).toHaveLength(0);
    });

    it('should sort tasks by creation date (newest first)', () => {
      const tasks: TaskResponseDTO[] = [
        { id: 1, name: 'Oldest', complexity: 'LOW', status: 'PENDING', createdAt: '2024-12-08T10:00:00Z' },
        { id: 2, name: 'Newest', complexity: 'MEDIUM', status: 'PENDING', createdAt: '2024-12-08T10:10:00Z' },
        { id: 3, name: 'Middle', complexity: 'HIGH', status: 'PENDING', createdAt: '2024-12-08T10:05:00Z' },
      ];

      const grouped = groupTasksByStatus(tasks);

      expect(grouped.PENDING[0].name).toBe('Newest');
      expect(grouped.PENDING[1].name).toBe('Middle');
      expect(grouped.PENDING[2].name).toBe('Oldest');
    });

    it('should handle empty task array', () => {
      const grouped = groupTasksByStatus([]);

      expect(grouped.PENDING).toHaveLength(0);
      expect(grouped.PROCESSING).toHaveLength(0);
      expect(grouped.COMPLETED).toHaveLength(0);
      expect(grouped.FAILED).toHaveLength(0);
    });

    it('should handle tasks without createdAt timestamp', () => {
      const tasks: TaskResponseDTO[] = [
        { id: 1, name: 'Task 1', complexity: 'LOW', status: 'PENDING' },
        { id: 2, name: 'Task 2', complexity: 'MEDIUM', status: 'PENDING', createdAt: '2024-12-08T10:00:00Z' },
      ];

      const grouped = groupTasksByStatus(tasks);

      expect(grouped.PENDING).toHaveLength(2);
      // Task with timestamp should come first
      expect(grouped.PENDING[0].name).toBe('Task 2');
    });

    it('should handle all tasks in one status', () => {
      const tasks: TaskResponseDTO[] = [
        { id: 1, name: 'Task 1', complexity: 'LOW', status: 'COMPLETED', createdAt: '2024-12-08T10:00:00Z' },
        { id: 2, name: 'Task 2', complexity: 'MEDIUM', status: 'COMPLETED', createdAt: '2024-12-08T10:01:00Z' },
        { id: 3, name: 'Task 3', complexity: 'HIGH', status: 'COMPLETED', createdAt: '2024-12-08T10:02:00Z' },
      ];

      const grouped = groupTasksByStatus(tasks);

      expect(grouped.COMPLETED).toHaveLength(3);
      expect(grouped.PENDING).toHaveLength(0);
      expect(grouped.PROCESSING).toHaveLength(0);
      expect(grouped.FAILED).toHaveLength(0);
    });
  });

  describe('getTaskCount', () => {
    it('should return correct count for each status', () => {
      const grouped = {
        PENDING: [
          { id: 1, name: 'Task 1', complexity: 'LOW' as const, status: 'PENDING' as const, createdAt: '2024-12-08T10:00:00Z' },
          { id: 2, name: 'Task 2', complexity: 'MEDIUM' as const, status: 'PENDING' as const, createdAt: '2024-12-08T10:01:00Z' },
        ],
        PROCESSING: [
          { id: 3, name: 'Task 3', complexity: 'HIGH' as const, status: 'PROCESSING' as const, createdAt: '2024-12-08T10:02:00Z' },
        ],
        COMPLETED: [],
        FAILED: [],
      };

      expect(getTaskCount(grouped, 'PENDING')).toBe(2);
      expect(getTaskCount(grouped, 'PROCESSING')).toBe(1);
      expect(getTaskCount(grouped, 'COMPLETED')).toBe(0);
      expect(getTaskCount(grouped, 'FAILED')).toBe(0);
    });

    it('should return 0 for empty status', () => {
      const grouped = {
        PENDING: [],
        PROCESSING: [],
        COMPLETED: [],
        FAILED: [],
      };

      expect(getTaskCount(grouped, 'PENDING')).toBe(0);
    });
  });
});
