import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { KanbanBoard } from '@/components/KanbanBoard';
import { UnifiedSidebar } from '@/components/UnifiedSidebar';
import { EngineStatusPopover } from '@/components/EngineStatusPopover';
import { EngineControls } from '@/components/EngineControls';
import { HelpModal } from '@/components/HelpModal';
import { SettingsModal } from '@/components/SettingsModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTaskPolling } from '@/hooks/useTaskPolling';
import { PanelRightClose, PanelRightOpen, Home, HelpCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Main dashboard page for the distributed task queue system
 *
 * Features:
 * - Table-like Kanban board with PENDING, PROCESSING, COMPLETED, FAILED columns
 * - Unified sidebar with tabs for tasks and workers (no overlay)
 * - Engine status and controls in header
 * - Fixed height layout (max 100vh)
 *
 * Layout:
 * - Header with engine controls and sidebar toggle
 * - Main content: Fixed-height Kanban board
 * - Right sidebar: Toggleable, no overlay
 */
function DashboardPage() {
  const { groupedTasks, isLoading } = useTaskPolling();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'workers'>('tasks');
  const navigate = useNavigate();

  const toggleSidebar = (tab?: 'tasks' | 'workers') => {
    if (tab) {
      setActiveTab(tab);
      setSidebarOpen(true);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-background z-10 shrink-0">
        <div className={`px-6 py-3 transition-all duration-300 ${sidebarOpen ? 'mr-96' : ''}`}>
          <div className="flex items-center justify-between">
            {/* Left: Home Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
            </Button>

            {/* Right: Engine Controls & Sidebar Toggle */}
            <div className="flex items-center gap-3">
              <EngineStatusPopover />
              <EngineControls />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHelpOpen(true)}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSidebar()}
              >
                {sidebarOpen ? (
                  <PanelRightClose className="h-4 w-4" />
                ) : (
                  <PanelRightOpen className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <HelpModal open={helpOpen} onOpenChange={setHelpOpen} />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Kanban Board */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? 'mr-96' : ''
          }`}
        >
          <KanbanBoard groupedTasks={groupedTasks} isLoading={isLoading} />
        </main>

        {/* Unified Sidebar */}
        <UnifiedSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
