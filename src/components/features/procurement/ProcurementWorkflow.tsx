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

  // ============================
  // 🆕 No Project Screen
  // ============================
  if (!state.currentProject) {
    return (
      <div className="p-4 sm:p-6">
        <Card className="w-full transition-shadow bg-white border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 hover:shadow-md">
          <CardContent className="p-6 text-center sm:p-8">
            {/* Icon */}
            <div className="flex items-center justify-center mx-auto mb-4 bg-blue-100 rounded-full dark:bg-blue-900/40 w-14 h-14 sm:w-16 sm:h-16">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-300 sm:w-8 sm:h-8"
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

            {/* Title */}
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
              Start New Procurement
            </h2>

            {/* Description */}
            <p className="max-w-md mx-auto mb-8 text-sm text-gray-600 dark:text-gray-400 sm:text-base">
              Begin your AI-powered procurement journey. Create a new project to
              access all 10 phases of automated procurement.
            </p>

            {/* Button */}
            <Button
              onClick={handleCreateNewProject}
              size="lg"
              className="w-full transition-shadow shadow-sm sm:w-auto hover:shadow-md"
            >
              Create New Project
            </Button>

            {/* Responsive Phases Preview */}
            <div className="grid grid-cols-1 gap-4 mt-10 text-center sm:grid-cols-3">
              {[
                {
                  title: "Phase 1–3",
                  desc: "AI Qualification & Specification",
                },
                { title: "Phase 4–6", desc: "Vendor Discovery & RFP" },
                { title: "Phase 7–10", desc: "Bidding & Optimization" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 transition-all border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
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

  // ============================
  // 🏗️ Active Project Workflow
  // ============================
  return (
    <div className="w-full">
      <PhaseContainer currentPhase={state.currentPhase} />
    </div>
  );
};
