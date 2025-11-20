// src/components/features/dashboard/StatsGrid.tsx
import React from "react";
import {
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  TrendingUp,
  Building,
} from "lucide-react";
import { Card } from "../../ui/Card";

const stats = [
  {
    icon: Clock,
    label: "Time Saved",
    value: "75%",
    description: "vs manual process",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: DollarSign,
    label: "Cost Savings",
    value: "10-25%",
    description: "per project",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: CheckCircle,
    label: "Process Speed",
    value: "10x Faster",
    description: "procurement cycle",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Users,
    label: "Vendor Response",
    value: "91.7%",
    description: "average rate",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: TrendingUp,
    label: "Automation Rate",
    value: "85%",
    description: "of process automated",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Building,
    label: "Active Projects",
    value: "12",
    description: "in procurement",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6" hover>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
