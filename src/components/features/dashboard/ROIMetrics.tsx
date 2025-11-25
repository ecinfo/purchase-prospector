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
    const colors: Record<
      string,
      { bg: string; text: string; darkBg: string; darkText: string }
    > = {
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        darkBg: "bg-blue-900/30",
        darkText: "text-blue-300",
      },
      green: {
        bg: "bg-green-100",
        text: "text-green-600",
        darkBg: "bg-green-900/30",
        darkText: "text-green-300",
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        darkBg: "bg-purple-900/30",
        darkText: "text-purple-300",
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        darkBg: "bg-orange-900/30",
        darkText: "text-orange-300",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <Card className="dark:bg-gray-900 dark:border-gray-700">
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg">
          ROI Metrics
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Quarterly performance and savings
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {roiMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const c = getColorClasses(metric.color);

            return (
              <div key={index} className="text-center">
                <div
                  className={`
                    inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
                    rounded-lg mb-2 sm:mb-3
                    ${c.bg} ${c.text}
                    dark:${c.darkBg} dark:${c.darkText}
                  `}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6`} />
                </div>

                <div className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
                  {metric.value}
                </div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300 sm:text-sm">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 hidden sm:block">
                  {metric.description}
                </div>
                <div className="mt-1 text-xs font-medium text-green-600 dark:text-green-400">
                  {metric.change} vs last quarter
                </div>
              </div>
            );
          })}
        </div>

        {/* Annual ROI Summary */}
        <div
          className="p-4 border border-blue-200 rounded-lg  bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 dark:border-blue-900/40"
        >
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Estimated Annual ROI
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                Based on current performance trends
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 sm:text-3xl">
                3.5x
              </div>
              <div className="text-xs text-green-700 dark:text-green-400 sm:text-sm">
                Return on Investment
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
