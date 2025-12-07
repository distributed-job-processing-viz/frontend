import { KanbanColumn } from './KanbanColumn';
import type { GroupedTasks } from '@/lib/taskUtils';

interface KanbanBoardProps {
  groupedTasks: GroupedTasks;
  isLoading: boolean;
}

/**
 * Kanban board displaying all task columns
 * TODO: Add smooth animations for task movements when WebSocket updates are implemented
 *
 * Features:
 * - Four columns: PENDING, PROCESSING, COMPLETED, FAILED
 * - Responsive grid layout
 * - Loading states
 * - Empty states per column
 */
export function KanbanBoard({ groupedTasks, isLoading }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-4 border rounded-lg overflow-hidden bg-card" style={{ height: 'calc(100vh - 120px)' }}>
      <KanbanColumn
        title="Pending"
        tasks={groupedTasks.PENDING}
        count={groupedTasks.PENDING.length}
        isLoading={isLoading}
      />
      <KanbanColumn
        title="Processing"
        tasks={groupedTasks.PROCESSING}
        count={groupedTasks.PROCESSING.length}
        isLoading={isLoading}
      />
      <KanbanColumn
        title="Completed"
        tasks={groupedTasks.COMPLETED}
        count={groupedTasks.COMPLETED.length}
        isLoading={isLoading}
      />
      <KanbanColumn
        title="Failed"
        tasks={groupedTasks.FAILED}
        count={groupedTasks.FAILED.length}
        isLoading={isLoading}
      />
    </div>
  );
}
