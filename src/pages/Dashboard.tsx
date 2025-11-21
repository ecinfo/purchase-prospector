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
  ArrowRight,
  HelpCircle,
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

  const roiMetrics = [
    {
      icon: DollarSign,
      value: "₹2.3 Cr",
      label: "Total Savings",
      sub: "Across all projects",
      change: "+18.2% vs last quarter",
      color: "blue",
    },
    {
      icon: Clock,
      value: "216 days",
      label: "Time Saved",
      sub: "Compared to manual process",
      change: "+75% efficiency",
      color: "green",
    },
    {
      icon: Users,
      value: "91.7%",
      label: "Vendor Response",
      sub: "Average response rate",
      change: "+12.5% improvement",
      color: "purple",
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Automation Rate",
      sub: "Of process automated",
      change: "+15% increase",
      color: "orange",
    },
  ];

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
    <div className="w-full p-4 space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Procurement Dashboard
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          AI-powered construction procurement platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-4 transition-shadow sm:p-6 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg shrink-0 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
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
            <CardContent>
              <div className="space-y-3">
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
                        className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${getStatusStyles(
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
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                Quick Actions
              </h3>
              <p className="text-xs text-gray-500 sm:text-sm">
                Get started quickly
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.action}
                    className="flex items-center gap-3 p-3 transition-colors border border-transparent rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 group"
                  >
                    <div
                      className={`p-2.5 rounded-lg ${action.color} text-white shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {action.label}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {action.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 transition-colors group-hover:text-blue-500 shrink-0" />
                  </Link>
                );
              })}

              {/* Support Section */}
              <div className="p-4 mt-4 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white border rounded-lg shrink-0">
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Need Help?
                    </h4>
                    <p className="mt-1 mb-3 text-xs text-gray-500">
                      Contact support for assistance
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Get Support
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ROI Metrics */}
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
              const bgColor =
                metric.color === "blue"
                  ? "bg-blue-100"
                  : metric.color === "green"
                  ? "bg-green-100"
                  : metric.color === "purple"
                  ? "bg-purple-100"
                  : "bg-orange-100";
              const textColor =
                metric.color === "blue"
                  ? "text-blue-600"
                  : metric.color === "green"
                  ? "text-green-600"
                  : metric.color === "purple"
                  ? "text-purple-600"
                  : "text-orange-600";

              return (
                <div key={index} className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-lg mb-2 sm:mb-3`}
                  >
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${textColor}`} />
                  </div>
                  <div className="text-lg font-bold text-gray-900 sm:text-2xl">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-gray-600 sm:text-sm">
                    {metric.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                    {metric.sub}
                  </div>
                  <div className="mt-1 text-xs font-medium text-green-600">
                    {metric.change}
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
    </div>
  );
};
