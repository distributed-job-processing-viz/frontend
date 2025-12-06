# API Integration Guide

This document explains how to use the auto-generated API client in your React application.

## Overview

The API client is automatically generated from `swagger.json` using `swagger-typescript-api`. It provides fully typed TypeScript interfaces for all API endpoints with Axios as the HTTP client.

## Setup

### 1. API Client Generation

The API client has already been generated in [`src/api/Api.ts`](src/api/Api.ts). To regenerate it after updating `swagger.json`, run:

```bash
npm run generate:api
```

### 2. Global API Context

The API is made available throughout the application via React Context API:

- **Provider**: [`src/contexts/ApiContext.tsx`](src/contexts/ApiContext.tsx)
- **Hook**: [`src/hooks/useApiService.ts`](src/hooks/useApiService.ts)

The `ApiProvider` is already configured in [`src/main.tsx`](src/main.tsx).

## Usage

### Basic Usage in Components

```tsx
import { useApiService } from '../hooks/useApiService';

const MyComponent = () => {
  const api = useApiService();

  const fetchData = async () => {
    // All API methods are fully typed
    const tasks = await api.getAllTasks({
      page: 0,
      size: 20
    });

    console.log(tasks);
  };

  return <button onClick={fetchData}>Fetch Tasks</button>;
};
```

### Available API Endpoints

#### Task Management

```tsx
// Get all tasks (with pagination and filters)
const tasks = await api.getAllTasks({
  page: 0,
  size: 20,
  status: 'PENDING',
  complexity: 'HIGH',
  sort: ['createdAt,DESC']
});

// Submit a new task
const newTask = await api.submitTask({
  name: 'Process data',
  complexity: 'MEDIUM'
});

// Get a specific task by ID
const task = await api.getTask(taskId);
```

#### Worker Management

```tsx
// Get all workers
const workers = await api.getAllWorkers();

// Create a new worker (name is optional, auto-generated if not provided)
const worker = await api.createWorker({
  name: 'worker-1'  // optional
});

// Get a specific worker by ID
const worker = await api.getWorker(workerId);

// Stop a worker
const stoppedWorker = await api.stopWorker(workerId);
```

#### Engine Control

```tsx
// Get engine status
const status = await api.getEngineStatus();
// Returns: { state: 'RUNNING' | 'STOPPED', message: string, activeWorkerCount: number }

// Start the engine
const result = await api.startEngine();

// Stop the engine
const result = await api.stopEngine();
```

#### Health Check

```tsx
// Check API health
const health = await api.getHealth();
```

### Error Handling

```tsx
import { useApiService } from '../hooks/useApiService';
import { AxiosError } from 'axios';

const MyComponent = () => {
  const api = useApiService();

  const handleSubmit = async () => {
    try {
      const task = await api.submitTask({
        name: 'My Task',
        complexity: 'HIGH'
      });
      console.log('Success:', task);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('API Error:', error.response?.data);
        console.error('Status:', error.response?.status);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return <button onClick={handleSubmit}>Submit Task</button>;
};
```

### Using with React Query (Recommended)

For better state management, caching, and refetching, use React Query:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiService } from '../hooks/useApiService';

const MyComponent = () => {
  const api = useApiService();
  const queryClient = useQueryClient();

  // Fetch tasks with automatic caching and refetching
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks', { page: 0, size: 20 }],
    queryFn: () => api.getAllTasks({ page: 0, size: 20 })
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (taskData: TaskSubmissionRequestDTO) =>
      api.submitTask(taskData),
    onSuccess: () => {
      // Invalidate and refetch tasks after creating
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleCreateTask = () => {
    createTaskMutation.mutate({
      name: 'New Task',
      complexity: 'MEDIUM'
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreateTask}>Create Task</button>
      <ul>
        {tasks?.content?.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### TypeScript Types

All API types are exported from [`src/api/Api.ts`](src/api/Api.ts):

```tsx
import type {
  Task,
  TaskResponseDTO,
  TaskSubmissionRequestDTO,
  Worker,
  WorkerResponseDTO,
  WorkerCreateRequestDTO,
  EngineStatusResponse,
  Page
} from '../api/Api';

// Use in your component state
const [task, setTask] = useState<TaskResponseDTO | null>(null);
```

## Configuration

### Changing the Base URL

By default, the API base URL is `http://localhost:8080`. To change it:

```tsx
// In src/main.tsx
<ApiProvider baseURL="https://api.production.com">
  <App />
</ApiProvider>
```

Or use environment variables:

```tsx
// In src/main.tsx
<ApiProvider baseURL={import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}>
  <App />
</ApiProvider>
```

### Adding Request Interceptors

You can customize the API instance by modifying [`src/contexts/ApiContext.tsx`](src/contexts/ApiContext.tsx):

```tsx
const api = useMemo(() => {
  const apiInstance = new Api({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor
  apiInstance.instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response interceptor
  apiInstance.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
}, [baseURL]);
```

## Example Component

See [`src/examples/ApiUsageExample.tsx`](src/examples/ApiUsageExample.tsx) for a comprehensive example demonstrating all API endpoints.

## Regenerating the API Client

Whenever the backend API changes and `swagger.json` is updated:

1. Update `swagger.json` with the new OpenAPI specification
2. Run `npm run generate:api`
3. The TypeScript client will be regenerated with all new types and endpoints

The generated file is [`src/api/Api.ts`](src/api/Api.ts) - do not edit this file manually as it will be overwritten.
