// src/components/features/procurement/ProcurementWorkflow.tsx
import React from "react";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { ProgressTracker } from "../../layout/ProgressTracker";
import { PhaseContainer } from "./PhaseContainer";
import { PROCUREMENT_PHASES } from "../../../utils/constants";
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
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600"
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

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Start New Procurement
            </h2>

            <p className="text-gray-600 mb-8 text-sm sm:text-base">
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
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                {
                  title: "Phase 1-3",
                  desc: "AI Qualification & Specification",
                },
                { title: "Phase 4-6", desc: "Vendor Discovery & RFP" },
                { title: "Phase 7-10", desc: "Bidding & Optimization" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
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
    <div className="p-4 sm:p-6">
      <div className="w-full ">
        {/* Project Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                {state.currentProject.name}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                AI-Powered Construction Procurement
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="badge-info text-xs sm:text-sm">
                Phase {state.currentPhase} of 10
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {state.currentProject.status}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Progress on Mobile */}
        <div className="overflow-x-auto pb-2">
          <ProgressTracker
            phases={PROCUREMENT_PHASES}
            currentPhase={state.currentPhase}
          />
        </div>

        <PhaseContainer currentPhase={state.currentPhase} />
      </div>
    </div>
  );
};
