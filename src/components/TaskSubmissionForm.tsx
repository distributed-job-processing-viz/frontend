import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskSubmission } from "@/hooks/useTaskSubmission";
import type { TaskSubmissionRequestDTO } from "@/api/Api";
import { Loader2, Shuffle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BulkTaskCreator } from "./BulkTaskCreator";

const TASK_NAMES = [
  "Process Invoice",
  "Generate Report",
  "Validate Data",
  "Send Notification",
  "Update Database",
  "Calculate Statistics",
  "Export Data",
  "Import Records",
  "Sync Inventory",
  "Analyze Metrics",
  "Backup Files",
  "Compress Images",
  "Transform Data",
  "Index Documents",
  "Clean Cache",
];

const COMPLEXITIES: Array<"LOW" | "MEDIUM" | "HIGH"> = [
  "LOW",
  "MEDIUM",
  "HIGH",
];

const getRandomTaskName = () => {
  const randomName = TASK_NAMES[Math.floor(Math.random() * TASK_NAMES.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${randomName} #${randomNumber}`;
};

const getRandomComplexity = () => {
  return COMPLEXITIES[Math.floor(Math.random() * COMPLEXITIES.length)];
};

/**
 * Task submission form component
 */
export function TaskSubmissionForm() {
  const { submitTask, isSubmitting } = useTaskSubmission();
  const [taskName, setTaskName] = useState("");
  const [complexity, setComplexity] = useState<"LOW" | "MEDIUM" | "HIGH" | "">(
    ""
  );

  const handleRandomize = () => {
    setTaskName(getRandomTaskName());
    setComplexity(getRandomComplexity());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!taskName.trim() || !complexity) {
      return;
    }

    const taskData: TaskSubmissionRequestDTO = {
      name: taskName.trim(),
      complexity: complexity as "LOW" | "MEDIUM" | "HIGH",
    };

    const success = await submitTask(taskData);

    if (success) {
      setTaskName("");
      setComplexity("");
    }
  };

  const isFormValid = taskName.trim().length > 0 && complexity !== "";

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Name Field */}
        <div className="space-y-2">
          <Label htmlFor="taskName">
            Task Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="taskName"
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            disabled={isSubmitting}
            required
            minLength={1}
          />
          <p className="text-xs text-muted-foreground">
            A descriptive name for your task
          </p>
        </div>

        {/* Complexity Field */}
        <div className="space-y-2">
          <Label htmlFor="complexity">
            Complexity <span className="text-destructive">*</span>
          </Label>
          <Select
            value={complexity}
            onValueChange={(value) =>
              setComplexity(value as "LOW" | "MEDIUM" | "HIGH")
            }
            disabled={isSubmitting}
            required
          >
            <SelectTrigger id="complexity">
              <SelectValue placeholder="Select complexity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Determines task processing duration
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleRandomize}
            disabled={isSubmitting}
            className="flex-1"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Random
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Task"
            )}
          </Button>
        </div>
      </form>

      {/* Bulk Task Creator Section */}
      <Separator />
      <BulkTaskCreator />
    </div>
  );
}
