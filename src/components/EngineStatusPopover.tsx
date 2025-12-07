import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useEngineStatus } from '@/hooks/useEngineStatus';
import { Activity, Circle } from 'lucide-react';

/**
 * Engine status popover showing current engine state
 */
export function EngineStatusPopover() {
  const { status, isLoading } = useEngineStatus();

  const isRunning = status?.state === 'RUNNING';
  const isPaused = status?.state === 'PAUSED';
  const isStopped = status?.state === 'STOPPED';

  const getStatusColor = () => {
    if (isRunning) return 'text-green-500';
    if (isPaused) return 'text-yellow-500';
    if (isStopped) return 'text-red-500';
    return 'text-gray-400';
  };

  const getStatusVariant = () => {
    if (isRunning) return 'default';
    if (isPaused) return 'secondary';
    if (isStopped) return 'destructive';
    return 'outline';
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Circle className={`h-2 w-2 fill-current ${getStatusColor()}`} />
          <Activity className="h-4 w-4" />
          Engine
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Engine Status</h4>

          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">State:</span>
                <Badge variant={getStatusVariant()}>
                  {status?.state || 'UNKNOWN'}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Workers:</span>
                <span className="font-semibold">{status?.activeWorkerCount || 0}</span>
              </div>

              {status?.message && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">{status.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
