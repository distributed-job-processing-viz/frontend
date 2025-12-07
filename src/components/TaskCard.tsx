import type { TaskResponseDTO } from "@/api/Api";
import { Badge } from "@/components/ui/badge";
import {
  calculateTotalDuration,
  calculateProcessingDuration,
  formatTimestamp,
} from "@/lib/timeUtils";

interface TaskCardProps {
  task: TaskResponseDTO;
}

/**
 * Task card component displaying task information in a clean row format
 */
export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="border rounded-md p-2.5 md:p-3 hover:bg-accent/50 transition-colors bg-card">
      {/* Header: Task Name + Complexity Badge */}
      <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
        <div className="font-medium text-xs md:text-sm leading-snug flex-1 break-words">
          {task.name || "Unnamed Task"}
        </div>
        <Badge variant="outline" className="text-xs font-normal shrink-0 min-w-[3.5rem] md:min-w-[4.5rem] justify-center">
          {task.complexity}
        </Badge>
      </div>

      {/* ID */}
      <div className="text-xs text-muted-foreground mb-1.5 md:mb-2">
        <span className="font-mono">ID {task.id}</span>
      </div>

      {/* Timestamp */}
      <div className="text-xs text-muted-foreground">
        {formatTimestamp(task.createdAt)}
      </div>

      {/* Processing worker (only for PROCESSING status) */}
      {task.status === "PROCESSING" && task.assignedWorkerName && (
        <div className="mt-2 pt-2 border-t text-xs">
          <span className="text-muted-foreground">Worker: </span>
          <span className="font-medium truncate inline-block max-w-[150px] align-bottom">{task.assignedWorkerName}</span>
        </div>
      )}

      {/* Duration info (only for COMPLETED or FAILED status) */}
      {(task.status === "COMPLETED" || task.status === "FAILED") && (
        <div className="mt-2 pt-2 border-t text-xs space-y-1">
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Since Creation</span>
            <span className="font-mono text-right">
              {calculateTotalDuration(task.createdAt, task.completedAt)}
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-muted-foreground shrink-0">Processing Time</span>
            <span className="font-mono text-right">
              {calculateProcessingDuration(
                task.processingStartedAt,
                task.completedAt
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
