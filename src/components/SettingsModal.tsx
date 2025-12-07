import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEngineStatus } from '@/hooks/useEngineStatus';
import { useApiService } from '@/hooks/useApiService';
import { Loader2, AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Settings modal with dangerous operations like clearing the database
 */
export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { status } = useEngineStatus();
  const apiService = useApiService();
  const [isClearing, setIsClearing] = useState(false);

  const isEngineRunning = status?.state === 'RUNNING';

  const handleClearDatabase = async () => {
    setIsClearing(true);

    try {
      const response = await apiService.clearDatabase();

      toast.success('Database cleared', {
        description: response.message || 'All tasks and workers have been removed',
      });

      onOpenChange(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear database';

      toast.error('Failed to clear database', {
        description: errorMessage,
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage system settings and perform maintenance operations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Clear Database Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Danger Zone</h3>

            {isEngineRunning && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Stop the engine before clearing the database
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-lg border border-destructive/50 p-4 space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Clear Database</h4>
                <p className="text-xs text-muted-foreground">
                  Permanently remove all tasks and workers from the database. This action cannot be undone.
                </p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearDatabase}
                disabled={isEngineRunning || isClearing}
                className="w-full gap-2"
              >
                {isClearing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Clearing Database...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Clear Database
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
