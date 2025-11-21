// src/components/features/dashboard/RecentProjects.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../../utils/formatters";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Building,
  FileEdit,
} from "lucide-react";

const recentProjects = [
  {
    id: "1",
    name: "Pune Residential Tower",
    status: "completed",
    budget: 90000000,
    savings: 9000000,
    timeline: "5 days",
  },
  {
    id: "2",
    name: "Mumbai Commercial Complex",
    status: "in-progress",
    budget: 120000000,
    savings: 15000000,
    timeline: "3 days",
  },
  {
    id: "3",
    name: "Hyderabad IT Park",
    status: "draft",
    budget: 80000000,
    savings: 0,
    timeline: "-",
  },
];

export const RecentProjects: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <FileEdit className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
              Recent Projects
            </h3>
            <p className="text-xs text-gray-500 sm:text-sm">
              Track your procurement progress
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between gap-3 p-4 transition-colors rounded-lg sm:flex-row sm:items-center bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border rounded-lg shrink-0">
                <Building className="w-5 h-5 text-gray-400" />
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {project.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {formatCurrency(project.budget)} • {project.timeline}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 ml-10 sm:justify-end sm:ml-0">
              {project.savings > 0 && (
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    {formatCurrency(project.savings)}
                  </div>
                  <div className="text-xs text-gray-500">Saved</div>
                </div>
              )}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${getStatusStyles(
                  project.status
                )}`}
              >
                {getStatusIcon(project.status)}
                {project.status.replace("-", " ")}
              </span>
            </div>
          </div>
        ))}

        {/* Performance Summary */}
        <div className="p-4 mt-4 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h4 className="font-semibold text-blue-900">
                Procurement Performance
              </h4>
              <p className="text-sm text-blue-700 mt-0.5">
                12 projects • ₹2.3Cr savings • 91.7% response
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-2xl font-bold text-blue-600">18.2%</div>
              <div className="text-xs text-blue-700">Avg Savings</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
