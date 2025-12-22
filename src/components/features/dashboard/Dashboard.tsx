// src/components/features/dashboard/Dashboard.tsx
import React, { useEffect } from "react";
import { StatsGrid } from "./StatsGrid";
import { RecentProjects } from "./RecentProjects";
import { QuickActions } from "./QuickActions";
import { ROIMetrics } from "./ROIMetrics";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUserProfile } from "../../../store/slices/profileSlice";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    // Fetch profile only if token exists and profile is not already loaded
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

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
