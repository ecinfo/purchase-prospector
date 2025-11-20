// src/components/features/dashboard/ROIMetrics.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

export const ROIMetrics: React.FC = () => {
  const roiMetrics = [
    {
      icon: DollarSign,
      label: "Cost Savings",
      value: "₹2.3 Cr",
      description: "Total savings across all projects",
      change: "+18.2%",
      changeType: "positive",
    },
    {
      icon: Clock,
      label: "Time Saved",
      value: "216 days",
      description: "Compared to manual process",
      change: "+75%",
      changeType: "positive",
    },
    {
      icon: Users,
      label: "Vendor Efficiency",
      value: "91.7%",
      description: "Average response rate",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      icon: TrendingUp,
      label: "Process Automation",
      value: "85%",
      description: "Of procurement automated",
      change: "+15%",
      changeType: "positive",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">ROI Metrics</h3>
        <p className="text-sm text-gray-600">
          Quarterly performance and savings
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roiMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const changeColor =
              metric.changeType === "positive"
                ? "text-green-600"
                : "text-red-600";

            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {metric.description}
                </div>
                <div className={`text-xs font-medium mt-1 ${changeColor}`}>
                  {metric.change} vs last quarter
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">
                Estimated Annual ROI
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Based on current performance and savings trends
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">3.5x</div>
              <div className="text-sm text-green-700">Return on Investment</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
