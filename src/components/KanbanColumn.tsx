import type { TaskResponseDTO } from "@/api/Api";
import { TaskCard } from "./TaskCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface KanbanColumnProps {
  title: string;
  tasks: TaskResponseDTO[];
  count: number;
  isLoading?: boolean;
  statusColor?: string;
}

/**
 * Kanban column component displaying a list of tasks for a specific status
 * Includes loading states and empty states
 */
export function KanbanColumn({
  title,
  tasks,
  count,
  isLoading = false,
}: KanbanColumnProps) {
  return (
    <div className="border-r last:border-r-0 sm:odd:border-r-0 lg:odd:border-r border-b sm:even:border-b-0 sm:last:border-b-0 lg:border-b-0 flex flex-col lg:h-full lg:min-h-0">
      {/* Column Header - Fixed */}
      <div className="p-3 md:p-4 border-b bg-muted/30 shrink-0 sticky top-0 lg:static z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <Badge variant="outline" className="font-mono text-xs">
            {count}
          </Badge>
        </div>
      </div>

      {/* Tasks Container - Scrollable on desktop, auto-height on mobile/tablet */}
      <div className="p-2 md:p-3 space-y-2 lg:overflow-y-auto lg:flex-1 lg:min-h-0">
        {isLoading ? (
          // Loading state - show skeleton cards
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : tasks.length === 0 ? (
          // Empty state
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-center h-24 md:h-32">
              <p className="text-xs md:text-sm text-muted-foreground">
                No {title.toLowerCase()} tasks
              </p>
            </CardContent>
          </Card>
        ) : (
          // Task cards with smooth transitions
          tasks.map((task) => (
            <div
              key={task.id}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <TaskCard task={task} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
