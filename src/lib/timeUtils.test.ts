import { describe, it, expect } from 'vitest';
import {
  calculateDuration,
  calculateTotalDuration,
  calculateProcessingDuration,
  formatTimestamp,
} from './timeUtils';

/**
 * Unit tests for time utility functions
 * Quality criteria: Code correctness, edge case handling
 */
describe('timeUtils', () => {
  describe('calculateDuration', () => {
    it('should calculate duration in seconds for short durations', () => {
      const start = '2024-12-08T10:00:00.000Z';
      const end = '2024-12-08T10:00:45.000Z';
      expect(calculateDuration(start, end)).toBe('45s');
    });

    it('should calculate duration in minutes and seconds', () => {
      const start = '2024-12-08T10:00:00.000Z';
      const end = '2024-12-08T10:02:34.000Z';
      expect(calculateDuration(start, end)).toBe('2m 34s');
    });

    it('should calculate duration in hours and minutes', () => {
      const start = '2024-12-08T10:00:00.000Z';
      const end = '2024-12-08T11:23:00.000Z';
      expect(calculateDuration(start, end)).toBe('1h 23m');
    });

    it('should return "N/A" when start time is undefined', () => {
      const end = '2024-12-08T10:00:00.000Z';
      expect(calculateDuration(undefined, end)).toBe('N/A');
    });

    it('should return "N/A" when end time is undefined', () => {
      const start = '2024-12-08T10:00:00.000Z';
      expect(calculateDuration(start, undefined)).toBe('N/A');
    });

    it('should return "N/A" when end time is before start time', () => {
      const start = '2024-12-08T10:00:00.000Z';
      const end = '2024-12-08T09:00:00.000Z';
      expect(calculateDuration(start, end)).toBe('N/A');
    });

    it('should handle zero duration', () => {
      const time = '2024-12-08T10:00:00.000Z';
      expect(calculateDuration(time, time)).toBe('0s');
    });
  });

  describe('calculateTotalDuration', () => {
    it('should calculate total duration from creation to completion', () => {
      const created = '2024-12-08T10:00:00.000Z';
      const completed = '2024-12-08T10:05:30.000Z';
      expect(calculateTotalDuration(created, completed)).toBe('5m 30s');
    });

    it('should return "N/A" for incomplete tasks', () => {
      const created = '2024-12-08T10:00:00.000Z';
      expect(calculateTotalDuration(created, undefined)).toBe('N/A');
    });
  });

  describe('calculateProcessingDuration', () => {
    it('should calculate processing duration', () => {
      const started = '2024-12-08T10:00:00.000Z';
      const completed = '2024-12-08T10:01:15.000Z';
      expect(calculateProcessingDuration(started, completed)).toBe('1m 15s');
    });

    it('should return "N/A" when processing never started', () => {
      const completed = '2024-12-08T10:00:00.000Z';
      expect(calculateProcessingDuration(undefined, completed)).toBe('N/A');
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp correctly', () => {
      const timestamp = '2024-12-08T14:30:00.000Z';
      const formatted = formatTimestamp(timestamp);
      // Check that it contains expected parts (exact format may vary by locale)
      expect(formatted).toMatch(/Dec/);
      expect(formatted).toMatch(/8/);
    });

    it('should return "N/A" for undefined timestamp', () => {
      expect(formatTimestamp(undefined)).toBe('N/A');
    });

    it('should handle different time formats', () => {
      const timestamp = '2024-01-15T09:05:00.000Z';
      const formatted = formatTimestamp(timestamp);
      expect(formatted).toMatch(/Jan/);
      expect(formatted).toMatch(/15/);
    });
  });
});
