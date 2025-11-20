// src/components/features/dashboard/Dashboard.tsx
import React from "react";
import { StatsGrid } from "./StatsGrid";
import { RecentProjects } from "./RecentProjects";
import { QuickActions } from "./QuickActions";
import { ROIMetrics } from "./ROIMetrics";

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Procurement Dashboard
        </h1>
        <p className="text-gray-600">
          AI-powered construction procurement platform
        </p>
      </div>

      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
