// src/components/features/dashboard/Dashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  DollarSign,
  CheckCircle,
  Users,
  TrendingUp,
  Building,
  BarChart3,
  Plus,
  FileText,
} from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export const Dashboard: React.FC = () => {
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
  ];

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

  const quickActions = [
    {
      icon: Plus,
      label: "New Procurement",
      description: "Start AI-powered procurement",
      action: "/procurement",
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      label: "Create RFP",
      description: "Generate request for proposal",
      action: "/procurement",
      color: "bg-green-500",
    },
    {
      icon: Users,
      label: "Vendor Search",
      description: "Find qualified suppliers",
      action: "/vendors",
      color: "bg-purple-500",
    },
    {
      icon: BarChart3,
      label: "View Reports",
      description: "Analytics & insights",
      action: "/analytics",
      color: "bg-orange-500",
    },
  ];

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Procurement Dashboard
        </h1>
        <p className="text-gray-600">
          AI-powered construction procurement platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
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
                      <Building className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {project.name}
                        </h4>
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
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.action}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div
                        className={`p-3 rounded-lg ${action.color} text-white mr-4`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {action.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {action.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Support Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact our support team for assistance with procurement
                  processes.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ROI Metrics */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">ROI Metrics</h3>
          <p className="text-sm text-gray-600">
            Quarterly performance and savings
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">₹2.3 Cr</div>
              <div className="text-sm font-medium text-gray-600">
                Total Savings
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Across all projects
              </div>
              <div className="text-xs font-medium text-green-600 mt-1">
                +18.2% vs last quarter
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">216 days</div>
              <div className="text-sm font-medium text-gray-600">
                Time Saved
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Compared to manual process
              </div>
              <div className="text-xs font-medium text-green-600 mt-1">
                +75% efficiency
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">91.7%</div>
              <div className="text-sm font-medium text-gray-600">
                Vendor Response
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Average response rate
              </div>
              <div className="text-xs font-medium text-green-600 mt-1">
                +12.5% improvement
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm font-medium text-gray-600">
                Automation Rate
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Of process automated
              </div>
              <div className="text-xs font-medium text-green-600 mt-1">
                +15% increase
              </div>
            </div>
          </div>

          {/* Annual ROI Summary */}
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
                <div className="text-sm text-green-700">
                  Return on Investment
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
