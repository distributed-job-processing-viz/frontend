import { useState, useEffect } from 'react';
import { useApiService } from '../hooks/useApiService';
import type {
  TaskResponseDTO,
  WorkerResponseDTO,
  EngineStatusResponse,
  TaskSubmissionRequestDTO
} from '../api/Api';

/**
 * Example component demonstrating how to use the API service layer
 * throughout your React application.
 */
export const ApiUsageExample = () => {
  const api = useApiService();
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [workers, setWorkers] = useState<WorkerResponseDTO[]>([]);
  const [engineStatus, setEngineStatus] = useState<EngineStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example: Fetch all tasks with pagination
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllTasks({
        page: 0,
        size: 20,
        status: 'PENDING'
      });
      // Note: The response is a Page object with content property
      setTasks(response.content as TaskResponseDTO[]);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Create a new task
  const createTask = async (taskData: TaskSubmissionRequestDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await api.submitTask(taskData);
      console.log('Task created:', newTask);
      // Refresh the task list
      await fetchTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Fetch all workers
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllWorkers();
      // Assuming response is WorkerResponseDTO or array
      setWorkers(Array.isArray(response) ? response : [response]);
    } catch (err) {
      setError('Failed to fetch workers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Create a new worker
  const createWorker = async (workerName?: string) => {
    try {
      setLoading(true);
      setError(null);
      const newWorker = await api.createWorker({
        name: workerName
      });
      console.log('Worker created:', newWorker);
      await fetchWorkers();
    } catch (err) {
      setError('Failed to create worker');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Get engine status
  const fetchEngineStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const status = await api.getEngineStatus();
      setEngineStatus(status);
    } catch (err) {
      setError('Failed to fetch engine status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Start the engine
  const startEngine = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.startEngine();
      console.log('Engine started:', response);
      await fetchEngineStatus();
    } catch (err) {
      setError('Failed to start engine');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Stop the engine
  const stopEngine = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.stopEngine();
      console.log('Engine stopped:', response);
      await fetchEngineStatus();
    } catch (err) {
      setError('Failed to stop engine');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example: Get a specific task by ID (commented out to avoid unused variable warning)
  // const getTaskById = async (taskId: number) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const task = await api.getTask(taskId);
  //     console.log('Task details:', task);
  //     return task;
  //   } catch (err) {
  //     setError('Failed to fetch task');
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Example: Stop a worker
  const stopWorker = async (workerId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.stopWorker(workerId);
      console.log('Worker stopped:', response);
      await fetchWorkers();
    } catch (err) {
      setError('Failed to stop worker');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data on mount
  useEffect(() => {
    fetchTasks();
    fetchWorkers();
    fetchEngineStatus();
  }, []);

  return (
    <div className="api-usage-example">
      <h2>API Service Example</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h3>Engine Status</h3>
        {engineStatus && (
          <div>
            <p>State: {engineStatus.state}</p>
            <p>Message: {engineStatus.message}</p>
            <p>Active Workers: {engineStatus.activeWorkerCount}</p>
          </div>
        )}
        <button onClick={startEngine}>Start Engine</button>
        <button onClick={stopEngine}>Stop Engine</button>
      </section>

      <section>
        <h3>Tasks ({tasks.length})</h3>
        <button onClick={fetchTasks}>Refresh Tasks</button>
        <button onClick={() => createTask({
          name: 'Example Task',
          complexity: 'MEDIUM'
        })}>
          Create Sample Task
        </button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.name} - {task.status} - {task.complexity}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Workers ({workers.length})</h3>
        <button onClick={fetchWorkers}>Refresh Workers</button>
        <button onClick={() => createWorker()}>Create Worker</button>
        <ul>
          {workers.map((worker) => (
            <li key={worker.id}>
              {worker.name} - {worker.status}
              <button onClick={() => worker.id && stopWorker(worker.id)}>
                Stop
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
