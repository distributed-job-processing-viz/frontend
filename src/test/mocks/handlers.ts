import { http, HttpResponse } from 'msw';
import type { TaskResponseDTO, WorkerResponseDTO, EngineStatusResponse } from '@/api/Api';

const BASE_URL = 'http://localhost:3000';

/**
 * Mock API handlers for testing
 * Simulates backend responses for tasks, workers, and engine operations
 */

// Mock data
const mockTasks: TaskResponseDTO[] = [
  {
    id: 1,
    name: 'Test Task 1',
    complexity: 'LOW',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Test Task 2',
    complexity: 'MEDIUM',
    status: 'PROCESSING',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Test Task 3',
    complexity: 'HIGH',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
];

const mockWorkers: WorkerResponseDTO[] = [
  {
    id: 1,
    name: 'Worker 1',
    status: 'IDLE',
  },
  {
    id: 2,
    name: 'Worker 2',
    status: 'PROCESSING',
  },
];

const mockEngineStatus: EngineStatusResponse = {
  state: 'RUNNING',
  message: 'Engine is running',
};

export const handlers = [
  // Tasks endpoints
  http.get(`${BASE_URL}/api/tasks`, () => {
    return HttpResponse.json(mockTasks);
  }),

  http.post(`${BASE_URL}/api/tasks`, async ({ request }) => {
    const body = await request.json() as { name: string; complexity: string };
    const newTask: TaskResponseDTO = {
      id: Math.floor(Date.now() / 1000),
      name: body.name,
      complexity: body.complexity as 'LOW' | 'MEDIUM' | 'HIGH',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Workers endpoints
  http.get(`${BASE_URL}/api/workers`, () => {
    return HttpResponse.json(mockWorkers);
  }),

  http.post(`${BASE_URL}/api/workers`, () => {
    const workerId = Math.floor(Date.now() / 1000);
    const newWorker: WorkerResponseDTO = {
      id: workerId,
      name: `Worker ${workerId}`,
      status: 'IDLE',
    };
    return HttpResponse.json(newWorker, { status: 201 });
  }),

  http.delete(`${BASE_URL}/api/workers/:id`, ({ params }) => {
    return HttpResponse.json({ message: `Worker ${params.id} removed` });
  }),

  // Engine endpoints
  http.get(`${BASE_URL}/api/engine/status`, () => {
    return HttpResponse.json(mockEngineStatus);
  }),

  http.post(`${BASE_URL}/api/engine/start`, () => {
    return HttpResponse.json({ status: 'RUNNING' });
  }),

  http.post(`${BASE_URL}/api/engine/pause`, () => {
    return HttpResponse.json({ status: 'PAUSED' });
  }),

  http.post(`${BASE_URL}/api/engine/stop`, () => {
    return HttpResponse.json({ status: 'STOPPED' });
  }),
];

// Export mock data for use in tests
export const mockData = {
  tasks: mockTasks,
  workers: mockWorkers,
  engineStatus: mockEngineStatus,
};
