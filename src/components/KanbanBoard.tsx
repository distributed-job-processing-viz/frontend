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
 * - Responsive grid layout (1 col on mobile, 2 on tablet, 4 on desktop)
 * - Scrollable on mobile/tablet when content overflows
 * - Loading states
 * - Empty states per column
 */
export function KanbanBoard({ groupedTasks, isLoading }: KanbanBoardProps) {
  return (
    <div className="h-full overflow-y-auto lg:overflow-hidden border rounded-lg bg-card">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:h-full">
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
    </div>
  );
}
