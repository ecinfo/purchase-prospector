// src/components/features/procurement/ProcurementWorkflow.tsx
import React from "react";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { PhaseContainer } from "./PhaseContainer";
import { Button } from "../../ui/Button";
import { Card, CardContent } from "../../ui/Card";

export const ProcurementWorkflow: React.FC = () => {
  const { state, createNewProject } = useProcurement();

  const handleCreateNewProject = () => {
    createNewProject(
      `Project ${new Date().toLocaleDateString()}`,
      "New construction procurement project"
    );
  };

  if (!state.currentProject) {
    return (
      <div className="p-4 sm:p-6">
        <Card className="w-full">
          <CardContent className="p-6 text-center sm:p-8">
            <div className="flex items-center justify-center mx-auto mb-4 bg-blue-100 rounded-full w-14 h-14 sm:w-16 sm:h-16">
              <svg
                className="w-6 h-6 text-blue-600 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>

            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
              Start New Procurement
            </h2>

            <p className="mb-8 text-sm text-gray-600 sm:text-base">
              Begin your AI-powered procurement journey. Create a new project to
              access all 10 phases of automated procurement.
            </p>

            <Button
              onClick={handleCreateNewProject}
              size="lg"
              className="w-full sm:w-auto"
            >
              Create New Project
            </Button>

            {/* Responsive Phases */}
            <div className="grid grid-cols-1 gap-4 mt-8 text-center sm:grid-cols-3">
              {[
                {
                  title: "Phase 1-3",
                  desc: "AI Qualification & Specification",
                },
                { title: "Phase 4-6", desc: "Vendor Discovery & RFP" },
                { title: "Phase 7-10", desc: "Bidding & Optimization" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg sm:p-4 bg-gray-50">
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full ">
      {/* Project Header */}
      {/* <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900 break-words sm:text-2xl">
                {state.currentProject.name}
              </h1>
              <p className="text-sm text-gray-600 sm:text-base">
                AI-Powered Construction Procurement
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs badge-info sm:text-sm">
                Phase {state.currentPhase} of 10
              </div>
              <div className="mt-1 text-xs text-gray-500 sm:text-sm">
                {state.currentProject.status}
              </div>
            </div>
          </div>
        </div> */}

      {/* Scrollable Progress on Mobile */}
      {/* <div className="pb-2 overflow-x-auto">
          <ProgressTracker
            phases={PROCUREMENT_PHASES}
            currentPhase={state.currentPhase}
          />
        </div> */}

      <PhaseContainer currentPhase={state.currentPhase} />
    </div>
  );
};
