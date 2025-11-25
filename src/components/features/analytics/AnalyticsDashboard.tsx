// src/components/features/analytics/AnalyticsDashboard.tsx
import React from "react";
import { Card } from "../../ui/Card";
import { SavingsChart } from "./SavingsChart";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { VendorAnalytics } from "./VendorAnalytics";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

export const AnalyticsDashboard: React.FC = () => {
  const overviewStats = [
    {
      icon: TrendingUp,
      label: "Total Savings",
      value: "₹2.3 Cr",
      description: "Across all projects",
      color: {
        lightBg: "bg-green-50",
        darkBg: "dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
      },
    },
    {
      icon: Users,
      label: "Vendor Network",
      value: "2,148",
      description: "Active suppliers",
      color: {
        lightBg: "bg-blue-50",
        darkBg: "dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
      },
    },
    {
      icon: Clock,
      label: "Avg. Time Saved",
      value: "18 days",
      description: "Per project",
      color: {
        lightBg: "bg-purple-50",
        darkBg: "dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
      },
    },
    {
      icon: BarChart3,
      label: "Process Efficiency",
      value: "85%",
      description: "Automation rate",
      color: {
        lightBg: "bg-orange-50",
        darkBg: "dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
      },
    },
  ];

  return (
    <div className="w-full p-4 space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          Performance metrics and cost optimization insights
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-4 transition-all duration-300  sm:p-6 hover:shadow-md dark:bg-gray-900 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg shrink-0 ${stat.color.lightBg} ${stat.color.darkBg}`}
                >
                  <Icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color.text}`}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                    {stat.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-6">
        <SavingsChart />
        <PerformanceMetrics />
      </div>

      {/* Vendor Analytics */}
      <VendorAnalytics />
    </div>
  );
};
