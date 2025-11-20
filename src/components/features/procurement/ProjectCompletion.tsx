// src/components/features/procurement/ProjectCompletion.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { formatCurrency, formatPercentage } from "../../../utils/formatters";
import {
  CheckCircle,
  Download,
  Share2,
  Calendar,
  FileText,
  Award,
} from "lucide-react";

interface ProjectCompletionProps {
  onNewProject: () => void;
  onViewDashboard: () => void;
}

export const ProjectCompletion: React.FC<ProjectCompletionProps> = ({
  onNewProject,
  onViewDashboard,
}) => {
  const { state } = useProcurement();
  const project = state.currentProject;
  const analysis = project?.analysis;

  if (!project || !analysis) return null;

  // Placeholder actions
  const handleDownloadReport = () => alert("Downloading procurement report...");
  const handleShareResults = () => alert("Sharing results with team...");
  const handleCreatePO = () => alert("Creating purchase order...");

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-3 sm:p-4 lg:p-0">
      {/* 🎉 Success Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 sm:p-10 text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-9 w-9 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Procurement Completed Successfully!
          </h1>

          <p className="text-base sm:text-lg text-gray-700 mb-8">
            Project <strong>{project.name}</strong> has been optimized and
            awarded to the most competitive vendor.
          </p>

          {/* Summary Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto">
            <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {formatCurrency(analysis.costSavings)}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Total Savings</p>
            </div>
            <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                {formatPercentage(analysis.savingsPercentage)}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Savings %</p>
            </div>
            <div className="bg-white rounded-lg border p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                10x
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Faster</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 🧾 Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* 📜 Next Steps */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Next Steps
              </h3>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Award Notification */}
              <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                <Award className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    Vendor Award Notification
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Send official award letter and contract to the L1 vendor.
                  </p>
                  <Button size="sm" className="mt-2">
                    Send Award Letter
                  </Button>
                </div>
              </div>

              {/* Purchase Order */}
              <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    Purchase Order Generation
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Create and issue the purchase order for finalized materials.
                  </p>
                  <Button size="sm" className="mt-2" onClick={handleCreatePO}>
                    Generate PO
                  </Button>
                </div>
              </div>

              {/* Delivery Schedule */}
              <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    Delivery Schedule
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Coordinate timelines and quality checks with the vendor.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Schedule Delivery
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 🧠 Project Summary */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Project Summary
              </h3>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Project Name
                  </label>
                  <p className="text-gray-900 text-sm sm:text-base">
                    {project.name}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Location
                  </label>
                  <p className="text-gray-900 text-sm sm:text-base">
                    {project.requirement.location}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Total Value
                  </label>
                  <p className="text-gray-900 text-sm sm:text-base">
                    {formatCurrency(project.requirement.budget)}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Savings Achieved
                  </label>
                  <p className="text-green-600 font-semibold text-sm sm:text-base">
                    {formatCurrency(analysis.costSavings)} (
                    {formatPercentage(analysis.savingsPercentage)})
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Vendors Participated
                  </label>
                  <p className="text-gray-900 text-sm sm:text-base">
                    {project.vendors.length}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Bids Received
                  </label>
                  <p className="text-gray-900 text-sm sm:text-base">
                    {project.bids.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="space-y-6">
          {/* ⚡ Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleDownloadReport}
              >
                <Download className="h-4 w-4 mr-2" /> Download Report
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleShareResults}
              >
                <Share2 className="h-4 w-4 mr-2" /> Share Results
              </Button>

              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={onNewProject}
              >
                <FileText className="h-4 w-4 mr-2" /> New Project
              </Button>
            </CardContent>
          </Card>

          {/* 📈 ROI Summary */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                ROI Summary
              </h3>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time Saved</span>
                  <span className="font-semibold">18 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Process Efficiency</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vendor Response Rate</span>
                  <span className="font-semibold">91.7%</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-sm font-semibold">
                  <span className="text-gray-900">Estimated ROI</span>
                  <span className="text-green-600">3.5x</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 🎯 Final Actions */}
          <div className="space-y-3">
            <Button className="w-full" onClick={onNewProject}>
              Start New Procurement
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={onViewDashboard}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
