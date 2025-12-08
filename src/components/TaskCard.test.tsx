import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils/test-utils';
import { TaskCard } from './TaskCard';
import type { TaskResponseDTO } from '@/api/Api';

/**
 * Component tests for TaskCard
 * Quality criteria: Data display, conditional rendering, formatting
 */
describe('TaskCard', () => {
  const baseTask: TaskResponseDTO = {
    id: 123,
    name: 'Test Task',
    complexity: 'MEDIUM',
    status: 'PENDING',
    createdAt: '2024-12-08T10:00:00.000Z',
  };

  it('should render task name and basic information', () => {
    renderWithProviders(<TaskCard task={baseTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText(/ID 123/i)).toBeInTheDocument();
    expect(screen.getByText('MEDIUM')).toBeInTheDocument();
  });

  it('should display "Unnamed Task" when name is missing', () => {
    const taskWithoutName = { ...baseTask, name: undefined };
    renderWithProviders(<TaskCard task={taskWithoutName} />);

    expect(screen.getByText('Unnamed Task')).toBeInTheDocument();
  });

  it('should show complexity badge', () => {
    renderWithProviders(<TaskCard task={baseTask} />);

    const badge = screen.getByText('MEDIUM');
    expect(badge).toBeInTheDocument();
  });

  it('should show worker name for PROCESSING tasks', () => {
    const processingTask: TaskResponseDTO = {
      ...baseTask,
      status: 'PROCESSING',
      assignedWorkerName: 'Worker-A',
    };

    renderWithProviders(<TaskCard task={processingTask} />);

    expect(screen.getByText(/worker:/i)).toBeInTheDocument();
    expect(screen.getByText('Worker-A')).toBeInTheDocument();
  });

  it('should not show worker name for PENDING tasks', () => {
    renderWithProviders(<TaskCard task={baseTask} />);

    expect(screen.queryByText(/worker:/i)).not.toBeInTheDocument();
  });

  it('should show duration information for COMPLETED tasks', () => {
    const completedTask: TaskResponseDTO = {
      ...baseTask,
      status: 'COMPLETED',
      processingStartedAt: '2024-12-08T10:01:00.000Z',
      completedAt: '2024-12-08T10:05:00.000Z',
    };

    renderWithProviders(<TaskCard task={completedTask} />);

    expect(screen.getByText(/since creation/i)).toBeInTheDocument();
    expect(screen.getByText(/processing time/i)).toBeInTheDocument();
  });

  it('should show duration information for FAILED tasks', () => {
    const failedTask: TaskResponseDTO = {
      ...baseTask,
      status: 'FAILED',
      processingStartedAt: '2024-12-08T10:01:00.000Z',
      completedAt: '2024-12-08T10:03:00.000Z',
    };

    renderWithProviders(<TaskCard task={failedTask} />);

    expect(screen.getByText(/since creation/i)).toBeInTheDocument();
    expect(screen.getByText(/processing time/i)).toBeInTheDocument();
  });

  it('should not show duration for PENDING tasks', () => {
    renderWithProviders(<TaskCard task={baseTask} />);

    expect(screen.queryByText(/since creation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/processing time/i)).not.toBeInTheDocument();
  });

  it('should display all complexity levels correctly', () => {
    const { rerender } = renderWithProviders(
      <TaskCard task={{ ...baseTask, complexity: 'LOW' }} />
    );
    expect(screen.getByText('LOW')).toBeInTheDocument();

    rerender(<TaskCard task={{ ...baseTask, complexity: 'HIGH' }} />);
    expect(screen.getByText('HIGH')).toBeInTheDocument();
  });

  it('should have proper hover styling classes', () => {
    const { container } = renderWithProviders(<TaskCard task={baseTask} />);
    const card = container.firstChild as HTMLElement;

    expect(card).toHaveClass('hover:bg-accent/50');
    expect(card).toHaveClass('transition-colors');
  });
});
