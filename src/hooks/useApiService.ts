import { useApi } from './useApi';

/**
 * Custom hook providing access to the API service layer.
 * This hook wraps the API client generated from swagger.json and provides
 * convenient access to all API endpoints throughout the application.
 *
 * @example
 * ```tsx
 * const apiService = useApiService();
 *
 * // Fetch all workers
 * const workers = await apiService.getAllWorkers();
 *
 * // Create a new task
 * const task = await apiService.submitTask({
 *   name: 'Process data',
 *   complexity: 'HIGH'
 * });
 *
 * // Get engine status
 * const status = await apiService.getEngineStatus();
 * ```
 *
 * @returns The API client instance with all available endpoints
 */
export const useApiService = () => {
  const api = useApi();
  return api.api;
};
