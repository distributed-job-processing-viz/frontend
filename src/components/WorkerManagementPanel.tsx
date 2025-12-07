import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useWorkerPolling } from '@/hooks/useWorkerPolling';
import { useWorkerScaling } from '@/hooks/useWorkerScaling';
import { Plus, Minus, Users, Loader2, Activity } from 'lucide-react';

const MAX_WORKERS = 10;

/**
 * Worker management panel component
 * TODO: Worker status updates in real-time - currently using polling, will be replaced with WebSocket
 */
export function WorkerManagementPanel() {
  const { workers, utilization, isLoading } = useWorkerPolling();
  const { addWorker, removeWorker, setWorkerCount, isScaling } = useWorkerScaling();
  const [targetWorkerCount, setTargetWorkerCount] = useState(0);

  const activeWorkers = workers.filter((w) => w.status !== 'STOPPED');
  const activeWorkerCount = activeWorkers.length;

  useEffect(() => {
    setTargetWorkerCount(activeWorkerCount);
  }, [activeWorkerCount]);

  const handleAddWorker = async () => {
    await addWorker();
  };

  const handleRemoveWorker = async () => {
    const workerToRemove = activeWorkers[0];
    if (workerToRemove?.id) {
      await removeWorker(workerToRemove.id);
    }
  };

  const handleBulkScale = async () => {
    await setWorkerCount(targetWorkerCount, activeWorkerCount);
  };

  const getStatusBadgeVariant = (
    status: string | undefined
  ): 'default' | 'secondary' | 'outline' => {
    switch (status) {
      case 'PROCESSING':
        return 'default';
      case 'IDLE':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Worker Count */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : (
            <div className="text-4xl font-bold">{activeWorkerCount}</div>
          )}
        </CardContent>
      </Card>

      {/* Quick Controls */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Quick Controls</h3>
        <div className="flex gap-2">
          <Button
            onClick={handleAddWorker}
            disabled={isScaling || activeWorkerCount >= MAX_WORKERS}
            className="flex-1"
            variant="outline"
          >
            {isScaling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </>
            )}
          </Button>
          <Button
            onClick={handleRemoveWorker}
            disabled={isScaling || activeWorkerCount === 0}
            className="flex-1"
            variant="outline"
          >
            {isScaling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Minus className="mr-2 h-4 w-4" />
                Remove
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Bulk Scale Control */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Bulk Scale</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target Count</span>
              <span className="font-semibold">{targetWorkerCount}</span>
            </div>
            <Slider
              value={[targetWorkerCount]}
              onValueChange={(value) => setTargetWorkerCount(value[0])}
              max={MAX_WORKERS}
              min={0}
              step={1}
              disabled={isScaling || isLoading}
            />
          </div>
          <Button
            onClick={handleBulkScale}
            disabled={
              isScaling || targetWorkerCount === activeWorkerCount || isLoading
            }
            className="w-full"
          >
            {isScaling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scaling...
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Set to {targetWorkerCount}
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Utilization Metrics */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          <h3 className="text-sm font-medium">Utilization</h3>
        </div>
        {isLoading ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Busy Workers</span>
              <span className="font-semibold">
                {utilization.busy} of {activeWorkerCount}
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${utilization.utilizationPercentage}%`,
                }}
              />
            </div>
            <div className="text-2xl font-bold">
              {utilization.utilizationPercentage}%
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Worker List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Workers ({activeWorkers.length})</h3>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </>
          ) : activeWorkers.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex items-center justify-center h-16 p-4">
                <p className="text-sm text-muted-foreground">No active workers</p>
              </CardContent>
            </Card>
          ) : (
            activeWorkers.map((worker) => (
              <Card key={worker.id} className="transition-all hover:bg-accent/50">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {worker.name || 'Unknown Worker'}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ID: {worker.id}
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(worker.status)}>
                      {worker.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
