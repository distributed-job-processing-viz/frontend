import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils/test-utils';
import { WorkerManagementPanel } from './WorkerManagementPanel';

// Mock the hooks
vi.mock('@/hooks/useWorkerPolling', () => ({
  useWorkerPolling: () => ({
    workers: [
      { id: 'worker-1', name: 'Worker 1', status: 'IDLE' },
      { id: 'worker-2', name: 'Worker 2', status: 'PROCESSING', currentTaskId: 5 },
    ],
    utilization: {
      busy: 1,
      idle: 1,
      utilizationPercentage: 50,
    },
    isLoading: false,
  }),
}));

vi.mock('@/hooks/useWorkerScaling', () => ({
  useWorkerScaling: () => ({
    addWorker: vi.fn(),
    removeWorker: vi.fn(),
    setWorkerCount: vi.fn(),
    isScaling: false,
  }),
}));

/**
 * Component tests for WorkerManagementPanel
 * Quality criteria: UI display, worker information presentation, controls
 */
describe('WorkerManagementPanel', () => {
  it('should render active worker count card', () => {
    renderWithProviders(<WorkerManagementPanel />);

    // Verify the "Active Workers" card header is present
    expect(screen.getByText('Active Workers')).toBeInTheDocument();
    // The actual count is tested via the "Workers (2)" header test
  });

  it('should render quick control buttons', () => {
    renderWithProviders(<WorkerManagementPanel />);

    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('should show utilization metrics', () => {
    renderWithProviders(<WorkerManagementPanel />);

    expect(screen.getByText('Utilization')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText(/1 of 2/i)).toBeInTheDocument(); // 1 busy of 2 total
  });

  it('should display worker list with statuses', () => {
    renderWithProviders(<WorkerManagementPanel />);

    expect(screen.getByText('Worker 1')).toBeInTheDocument();
    expect(screen.getByText('Worker 2')).toBeInTheDocument();
    expect(screen.getByText('IDLE')).toBeInTheDocument();
    expect(screen.getByText('PROCESSING')).toBeInTheDocument();
  });

  it('should show worker IDs', () => {
    renderWithProviders(<WorkerManagementPanel />);

    expect(screen.getByText(/worker-1/i)).toBeInTheDocument();
    expect(screen.getByText(/worker-2/i)).toBeInTheDocument();
  });

  it('should have bulk scale controls', () => {
    renderWithProviders(<WorkerManagementPanel />);

    expect(screen.getByText('Bulk Scale')).toBeInTheDocument();
    expect(screen.getByText('Target Count')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /set to/i })).toBeInTheDocument();
  });

  it('should show worker count in the header', () => {
    renderWithProviders(<WorkerManagementPanel />);

    // Should show "(2)" in the Workers header
    expect(screen.getByText(/workers \(2\)/i)).toBeInTheDocument();
  });
});
