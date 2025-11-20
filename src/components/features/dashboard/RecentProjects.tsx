// src/components/features/dashboard/RecentProjects.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../../utils/formatters";
import { TrendingUp, Clock, CheckCircle } from "lucide-react";

const recentProjects = [
  {
    id: "1",
    name: "Pune Residential Tower",
    status: "completed",
    budget: 90000000,
    savings: 9000000,
    timeline: "5 days",
    completionDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Mumbai Commercial Complex",
    status: "in-progress",
    budget: 120000000,
    savings: 15000000,
    timeline: "3 days",
    completionDate: "2024-01-18",
  },
  {
    id: "3",
    name: "Hyderabad IT Park",
    status: "draft",
    budget: 80000000,
    savings: 0,
    timeline: "-",
    completionDate: "-",
  },
];

export const RecentProjects: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Projects
          </h3>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(project.status)}
                <div>
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600">
                    Budget: {formatCurrency(project.budget)} •{" "}
                    {project.timeline}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {project.savings > 0 && (
                  <div className="text-right">
                    <div className="flex items-center text-green-600 font-semibold">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {formatCurrency(project.savings)}
                    </div>
                    <div className="text-xs text-gray-500">Savings</div>
                  </div>
                )}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status.replace("-", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-900">
                Procurement Performance
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                12 projects completed • ₹2.3Cr total savings • 91.7% vendor
                response rate
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">18.2%</div>
              <div className="text-sm text-blue-700">Avg Savings</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
