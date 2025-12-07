import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTaskSubmission } from '@/hooks/useTaskSubmission';
import type { TaskSubmissionRequestDTO } from '@/api/Api';
import { Loader2, Zap } from 'lucide-react';
import { toast } from 'sonner';

const TASK_NAMES = [
  'Process Invoice',
  'Generate Report',
  'Validate Data',
  'Send Notification',
  'Update Database',
  'Calculate Statistics',
  'Export Data',
  'Import Records',
  'Sync Inventory',
  'Analyze Metrics',
  'Backup Files',
  'Compress Images',
  'Transform Data',
  'Index Documents',
  'Clean Cache',
  'Render Video',
  'Encode Media',
  'Parse Logs',
  'Aggregate Stats',
  'Build Package',
];

const COMPLEXITIES: Array<'LOW' | 'MEDIUM' | 'HIGH'> = ['LOW', 'MEDIUM', 'HIGH'];

const getRandomTaskName = () => {
  const randomName = TASK_NAMES[Math.floor(Math.random() * TASK_NAMES.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomName} #${randomNumber}`;
};

const getRandomComplexity = () => {
  return COMPLEXITIES[Math.floor(Math.random() * COMPLEXITIES.length)];
};

/**
 * Bulk task creator component for generating multiple random tasks
 */
export function BulkTaskCreator() {
  const { submitTask } = useTaskSubmission();
  const [bulkCount, setBulkCount] = useState('10');
  const [isBulkCreating, setIsBulkCreating] = useState(false);

  const handleBulkCreate = async () => {
    const count = parseInt(bulkCount);

    if (isNaN(count) || count < 1 || count > 100) {
      toast.error('Invalid count', {
        description: 'Please enter a number between 1 and 100',
      });
      return;
    }

    setIsBulkCreating(true);

    let successCount = 0;
    let failCount = 0;

    // Create tasks sequentially to avoid overwhelming the backend
    for (let i = 0; i < count; i++) {
      const taskData: TaskSubmissionRequestDTO = {
        name: getRandomTaskName(),
        complexity: getRandomComplexity(),
      };

      const success = await submitTask(taskData, { silent: true });
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    setIsBulkCreating(false);

    if (failCount > 0) {
      toast.error('Bulk creation completed with errors', {
        description: `Created ${successCount} tasks, ${failCount} failed`,
      });
    } else {
      toast.success('Bulk creation complete', {
        description: `Successfully created ${successCount} tasks`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Bulk Task Creator</h3>
        <p className="text-sm text-muted-foreground">
          Create multiple random tasks at once
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bulkCount">Number of Tasks</Label>
        <Input
          id="bulkCount"
          type="number"
          min="1"
          max="100"
          value={bulkCount}
          onChange={(e) => setBulkCount(e.target.value)}
          disabled={isBulkCreating}
          placeholder="Enter number (1-100)"
        />
        <p className="text-xs text-muted-foreground">
          Maximum 100 tasks per batch
        </p>
      </div>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleBulkCreate}
        disabled={isBulkCreating}
      >
        {isBulkCreating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating {bulkCount} Tasks...
          </>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" />
            Create {bulkCount} Random Tasks
          </>
        )}
      </Button>
    </div>
  );
}
