// src/components/features/dashboard/ROIMetrics.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

const roiMetrics = [
  {
    icon: DollarSign,
    label: "Cost Savings",
    value: "₹2.3 Cr",
    description: "Total savings across all projects",
    change: "+18.2%",
    color: "blue",
  },
  {
    icon: Clock,
    label: "Time Saved",
    value: "216 days",
    description: "Compared to manual process",
    change: "+75%",
    color: "green",
  },
  {
    icon: Users,
    label: "Vendor Efficiency",
    value: "91.7%",
    description: "Average response rate",
    change: "+12.5%",
    color: "purple",
  },
  {
    icon: TrendingUp,
    label: "Process Automation",
    value: "85%",
    description: "Of procurement automated",
    change: "+15%",
    color: "orange",
  },
];

export const ROIMetrics: React.FC = () => {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          ROI Metrics
        </h3>
        <p className="text-xs text-gray-500 sm:text-sm">
          Quarterly performance and savings
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {roiMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const colors = getColorClasses(metric.color);

            return (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${colors.bg} rounded-lg mb-2 sm:mb-3`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${colors.text}`} />
                </div>
                <div className="text-lg font-bold text-gray-900 sm:text-2xl">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-gray-600 sm:text-sm">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                  {metric.description}
                </div>
                <div className="mt-1 text-xs font-medium text-green-600">
                  {metric.change} vs last quarter
                </div>
              </div>
            );
          })}
        </div>

        {/* Annual ROI Summary */}
        <div className="p-4 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h4 className="font-semibold text-gray-900">
                Estimated Annual ROI
              </h4>
              <p className="text-sm text-gray-600 mt-0.5">
                Based on current performance trends
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-green-600 sm:text-3xl">
                3.5x
              </div>
              <div className="text-xs text-green-700 sm:text-sm">
                Return on Investment
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
