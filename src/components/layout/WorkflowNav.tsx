// src/components/layout/WorkflowNav.tsx
import React from "react";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WorkflowNavProps {
  currentPhase: number;
  totalPhases: number;
  onPrevious: () => void;
  onNext: () => void;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  className?: string;
}

export const WorkflowNav: React.FC<WorkflowNavProps> = ({
  currentPhase,
  totalPhases,
  onPrevious,
  onNext,
  isPreviousDisabled = false,
  isNextDisabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="flex items-center"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <div className="text-sm text-gray-600">
        Step {currentPhase} of {totalPhases}
      </div>

      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex items-center"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
