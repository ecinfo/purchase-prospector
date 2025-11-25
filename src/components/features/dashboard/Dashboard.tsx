// src/components/features/dashboard/Dashboard.tsx
import React from "react";
import { StatsGrid } from "./StatsGrid";
import { RecentProjects } from "./RecentProjects";
import { QuickActions } from "./QuickActions";
import { ROIMetrics } from "./ROIMetrics";

export const Dashboard: React.FC = () => {
  return (
    <div className="w-full p-4 space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
          Procurement Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          AI-powered construction procurement platform
        </p>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-6">
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <ROIMetrics />
    </div>
  );
};
