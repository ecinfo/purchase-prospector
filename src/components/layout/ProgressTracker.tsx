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
    <div className="mb-8 w-full overflow-x-auto">
      <div className="min-w-max sm:min-w-0 flex items-center justify-between relative px-2 sm:px-0">
        {/* Background Track */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />

        {/* Active Progress Line */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
          style={{
            width: `${((currentPhase - 1) / (phases.length - 1)) * 100}%`,
          }}
        />

        {phases.map((phase) => {
          const isCompleted = phase.number < currentPhase;
          const isCurrent = phase.number === currentPhase;

          return (
            <div
              key={phase.number}
              className="flex flex-col items-center mx-2 sm:mx-0"
            >
              <div
                className={`flex items-center justify-center 
                w-10 h-10 sm:w-8 sm:h-8 
                rounded-full border-2 transition-colors text-sm sm:text-xs
                ${
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isCurrent
                    ? "border-blue-600 bg-white text-blue-600"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 sm:h-4 sm:w-4" />
                ) : (
                  <span className="font-medium">{phase.number}</span>
                )}
              </div>

              {/* Title + Description */}
              <div className="mt-2 text-center w-max sm:w-auto">
                <div
                  className={`text-xs sm:text-xs font-medium ${
                    isCompleted || isCurrent ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {phase.title}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-1 hidden sm:block">
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
