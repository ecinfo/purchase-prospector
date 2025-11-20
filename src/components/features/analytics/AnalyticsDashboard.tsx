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
    },
    {
      icon: Users,
      label: "Vendor Network",
      value: "2,148",
      description: "Active suppliers",
    },
    {
      icon: Clock,
      label: "Avg. Time Saved",
      value: "18 days",
      description: "Per project",
    },
    {
      icon: BarChart3,
      label: "Process Efficiency",
      value: "85%",
      description: "Automation rate",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          Performance metrics and cost optimization insights
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SavingsChart />
        <PerformanceMetrics />
      </div>

      <VendorAnalytics />
    </div>
  );
};
