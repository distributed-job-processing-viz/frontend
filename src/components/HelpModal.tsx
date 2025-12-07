import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Play,
  Pause,
  Square,
  Plus,
  Minus,
  Shuffle,
  Zap,
  Activity,
  Users,
  Home,
  PanelRightOpen,
  Settings,
  Trash2,
} from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Help modal explaining the distributed task queue system
 */
export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Instructions</DialogTitle>
          <DialogDescription>
            A real-time visualization of distributed task processing across
            multiple workers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overview */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <p className="text-sm text-muted-foreground">
              This system allows you to submit tasks, manage workers, and
              monitor task processing in real-time. Tasks are automatically
              distributed across available workers based on their complexity and
              worker availability.
            </p>
          </section>

          {/* Navigation */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Home className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <strong>Home Button:</strong> Click the home icon in the
                  top-left to return to the landing page
                </span>
              </li>
              <li className="flex items-start gap-2">
                <PanelRightOpen className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <strong>Sidebar Toggle:</strong> Open/close the control panel
                  to create tasks and manage workers
                </span>
              </li>
            </ul>
          </section>

          {/* Engine Controls */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Engine Controls
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Control the task processing engine from the top-right of the
              screen:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Play className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                <span>
                  <strong>Start/Resume:</strong> Start the engine or resume from
                  a paused state. Activates all available workers to begin
                  processing tasks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Pause className="h-4 w-4 mt-0.5 shrink-0 text-yellow-500" />
                <span>
                  <strong>Pause:</strong> Temporarily pause task processing.
                  Worker threads remain alive but idle. Tasks are not processed
                  until resumed.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Square className="h-4 w-4 mt-0.5 shrink-0 text-red-500" />
                <span>
                  <strong>Stop:</strong> Completely stop the engine. All workers
                  are stopped and in-flight tasks are marked as failed.
                </span>
              </li>
            </ul>
          </section>

          {/* Task Management */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Task Management</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Create and submit tasks through the sidebar control panel:
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold mb-2">
                  Single Task Creation
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>
                    • Enter a task name and select complexity (LOW, MEDIUM, or
                    HIGH)
                  </li>
                  <li className="flex items-start gap-2">
                    <Shuffle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      <strong>Random Button:</strong> Automatically fills in a
                      random task name and complexity
                    </span>
                  </li>
                  <li>
                    • Tasks are added to the PENDING queue and processed by
                    available workers
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Bulk Task Creation
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>• Create up to 100 random tasks at once</li>
                  <li>• Useful for testing system performance and load</li>
                  <li>
                    • Tasks are created sequentially with random names and
                    complexity levels
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Worker Management */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Worker Management
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Control the number of workers processing tasks:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Plus className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <strong>Add Worker:</strong> Create a new worker to increase
                  processing capacity
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Minus className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <strong>Remove Worker:</strong> Stop and remove a worker to
                  decrease capacity
                </span>
              </li>
              <li>
                • Workers are automatically named (worker-1, worker-2, etc.)
              </li>
              <li>
                • Active workers process tasks based on their availability
              </li>
            </ul>
          </section>

          {/* Task Board */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Task Board</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The main Kanban board shows tasks in four columns:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>PENDING:</strong> Tasks waiting to be processed
              </li>
              <li>
                <strong>PROCESSING:</strong> Tasks currently being executed by
                workers
              </li>
              <li>
                <strong>COMPLETED:</strong> Successfully finished tasks
              </li>
              <li>
                <strong>FAILED:</strong> Tasks that encountered errors or were
                interrupted
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Each task card displays its name, complexity, timestamps, and
              assigned worker (if applicable).
            </p>
          </section>

          {/* Task Complexity */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Task Complexity</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>LOW:</strong> Fast processing, minimal resources
              </li>
              <li>
                <strong>MEDIUM:</strong> Moderate processing time and resources
              </li>
              <li>
                <strong>HIGH:</strong> Longer processing time, more intensive
              </li>
            </ul>
          </section>

          {/* Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Access system settings and maintenance operations:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Settings className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <strong>Settings Button:</strong> Opens the settings modal in the top-right corner
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Trash2 className="h-4 w-4 mt-0.5 shrink-0 text-red-500" />
                <span>
                  <strong>Clear Database:</strong> Permanently removes all tasks and workers.
                  Only available when the engine is stopped.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
