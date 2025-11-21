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
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Users,
      label: "Vendor Network",
      value: "2,148",
      description: "Active suppliers",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Clock,
      label: "Avg. Time Saved",
      value: "18 days",
      description: "Per project",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: BarChart3,
      label: "Process Efficiency",
      value: "85%",
      description: "Automation rate",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="w-full p-4 space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          Performance metrics and cost optimization insights
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          const [bgColor, textColor] = stat.color.split(" ");
          return (
            <Card
              key={index}
              className="p-4 transition-shadow sm:p-6 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg shrink-0 ${bgColor}`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${textColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 sm:text-sm">
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
