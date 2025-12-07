import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEngineStatus } from "@/hooks/useEngineStatus";
import { Play, Square, Pause, Loader2 } from "lucide-react";

/**
 * Engine control buttons with pause and stop functionality
 */
export function EngineControls() {
  const { status, startEngine, pauseEngine, stopEngine } = useEngineStatus();
  const [isPauseDialogOpen, setIsPauseDialogOpen] = useState(false);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isRunning = status?.state === "RUNNING";
  const isPaused = status?.state === "PAUSED";

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await startEngine();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Error is already handled in the hook with toast
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseConfirm = async () => {
    setIsLoading(true);
    try {
      await pauseEngine();
      setIsPauseDialogOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Error is already handled in the hook with toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopConfirm = async () => {
    setIsLoading(true);
    try {
      await stopEngine();
      setIsStopDialogOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Error is already handled in the hook with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-1 sm:gap-2">
        {isRunning ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPauseDialogOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Pause className="h-4 w-4" />
                  <span className="hidden sm:inline sm:ml-2">Pause</span>
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsStopDialogOpen(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Square className="h-4 w-4" />
                  <span className="hidden sm:inline sm:ml-2">Stop</span>
                </>
              )}
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={handleStart}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span className="hidden sm:inline sm:ml-2">{isPaused ? "Resume" : "Start"}</span>
              </>
            )}
          </Button>
        )}
      </div>

      {/* Pause Confirmation Dialog */}
      <Dialog open={isPauseDialogOpen} onOpenChange={setIsPauseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause Engine</DialogTitle>
            <DialogDescription>
              This will pause task processing. Worker threads remain alive but
              idle. Tasks will not be processed until you resume. You can resume
              anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPauseDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handlePauseConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pausing...
                </>
              ) : (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Engine
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stop Confirmation Dialog */}
      <Dialog open={isStopDialogOpen} onOpenChange={setIsStopDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stop Engine</DialogTitle>
            <DialogDescription>
              Are you sure you want to completely stop the processing engine?
              All in-flight tasks will be marked as FAILED and workers will be
              stopped.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStopDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleStopConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Stopping...
                </>
              ) : (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop Engine
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
