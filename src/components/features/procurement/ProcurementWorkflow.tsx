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
      <div className="p-6">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Start New Procurement
            </h2>
            <p className="text-gray-600 mb-8">
              Begin your AI-powered procurement journey. Create a new project to
              access all 10 phases of automated procurement.
            </p>
            <Button onClick={handleCreateNewProject} size="lg">
              Create New Project
            </Button>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Phase 1-3</h3>
                <p className="text-sm text-gray-600">
                  AI Qualification & Specification
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Phase 4-6</h3>
                <p className="text-sm text-gray-600">Vendor Discovery & RFP</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Phase 7-10</h3>
                <p className="text-sm text-gray-600">Bidding & Optimization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {state.currentProject.name}
              </h1>
              <p className="text-gray-600">
                AI-Powered Construction Procurement
              </p>
            </div>
            <div className="text-right">
              <div className="badge-info">Phase {state.currentPhase} of 10</div>
              <div className="text-sm text-gray-500 mt-1">
                {state.currentProject.status}
              </div>
            </div>
          </div>
        </div>

        <ProgressTracker
          phases={PROCUREMENT_PHASES}
          currentPhase={state.currentPhase}
        />

        <PhaseContainer currentPhase={state.currentPhase} />
      </div>
    </div>
  );
};
