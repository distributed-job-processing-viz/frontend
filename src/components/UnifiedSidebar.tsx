import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskSubmissionForm } from './TaskSubmissionForm';
import { WorkerManagementPanel } from './WorkerManagementPanel';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UnifiedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'tasks' | 'workers';
  onTabChange: (tab: 'tasks' | 'workers') => void;
}

/**
 * Unified sidebar component with tabs for Tasks and Workers
 * No overlay, positioned as a fixed sidebar
 * Remembers the last active tab when closed
 */
export function UnifiedSidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}: UnifiedSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-background border-l shadow-lg z-50 flex flex-col">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Controls</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => onTabChange(value as 'tasks' | 'workers')}
        className="flex-1 flex flex-col"
      >
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="tasks" className="flex-1">
            New Task
          </TabsTrigger>
          <TabsTrigger value="workers" className="flex-1">
            Workers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="flex-1 overflow-y-auto p-4 mt-0">
          <TaskSubmissionForm onSuccess={onClose} />
        </TabsContent>

        <TabsContent value="workers" className="flex-1 overflow-y-auto p-4 mt-0">
          <WorkerManagementPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
