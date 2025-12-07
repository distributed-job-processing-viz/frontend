/**
 * Utility functions for time calculations and formatting
 */

/**
 * Calculates the duration between two timestamps and formats it as a human-readable string
 * @param startTime - ISO 8601 timestamp string
 * @param endTime - ISO 8601 timestamp string
 * @returns Formatted duration string (e.g., "2m 34s", "45s", "1h 23m")
 */
export function calculateDuration(
  startTime: string | undefined,
  endTime: string | undefined
): string {
  if (!startTime || !endTime) {
    return 'N/A';
  }

  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();
  const durationMs = end - start;

  if (durationMs < 0) {
    return 'N/A';
  }

  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  } else if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Calculates the total duration from task creation to completion
 * @param createdAt - Task creation timestamp
 * @param completedAt - Task completion timestamp
 * @returns Formatted total duration string
 */
export function calculateTotalDuration(
  createdAt: string | undefined,
  completedAt: string | undefined
): string {
  return calculateDuration(createdAt, completedAt);
}

/**
 * Calculates the processing duration (time spent actively processing)
 * @param processingStartedAt - When processing started
 * @param completedAt - When processing completed
 * @returns Formatted processing duration string
 */
export function calculateProcessingDuration(
  processingStartedAt: string | undefined,
  completedAt: string | undefined
): string {
  return calculateDuration(processingStartedAt, completedAt);
}

/**
 * Formats a timestamp into a readable format
 * @param timestamp - ISO 8601 timestamp string
 * @returns Formatted timestamp (e.g., "Dec 7, 2:30 PM")
 */
export function formatTimestamp(timestamp: string | undefined): string {
  if (!timestamp) {
    return 'N/A';
  }

  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
