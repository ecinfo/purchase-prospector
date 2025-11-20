// src/components/layout/ProgressTracker.tsx
import React from "react";
import { CheckCircle } from "lucide-react";

interface Phase {
  number: number;
  title: string;
  description: string;
}

interface ProgressTrackerProps {
  phases: Phase[];
  currentPhase: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  phases,
  currentPhase,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
          style={{
            width: `${((currentPhase - 1) / (phases.length - 1)) * 100}%`,
          }}
        />

        {phases.map((phase) => {
          const isCompleted = phase.number < currentPhase;
          const isCurrent = phase.number === currentPhase;
          //   const isUpcoming = phase.number > currentPhase;

          return (
            <div key={phase.number} className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isCurrent
                    ? "border-blue-600 bg-white text-blue-600"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{phase.number}</span>
                )}
              </div>

              <div className="mt-2 text-center">
                <div
                  className={`text-xs font-medium ${
                    isCompleted || isCurrent ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {phase.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {phase.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
