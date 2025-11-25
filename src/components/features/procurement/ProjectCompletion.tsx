// src/components/features/procurement/ProjectCompletion.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { formatCurrency, formatPercentage } from "../../../utils/formatters";
import {
  CheckCircle,
  Calendar,
  FileText,
  Award,
  Download,
  Share2,
} from "lucide-react";

interface ProjectCompletionProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

export const ProjectCompletion: React.FC<ProjectCompletionProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state } = useProcurement();
  const project = state.currentProject;
  const analysis = project?.analysis;

  if (!project || !analysis) return null;

  const handleDownloadReport = () => alert("Downloading procurement report...");
  const handleShareResults = () => alert("Sharing results with team...");
  const handleCreatePO = () => alert("Creating purchase order...");

  return (
    <div className="max-w-6xl p-3 mx-auto space-y-6 sm:p-4 lg:p-0 dark:bg-gray-900">
      {/* 🎉 Success Header */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:border-green-800">
        <CardContent className="p-6 text-center sm:p-10">
          <div className="flex justify-center mb-5">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full dark:bg-green-900">
              <CheckCircle className="text-green-600 dark:text-green-300 h-9 w-9" />
            </div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            Procurement Completed Successfully!
          </h1>

          <p className="mb-8 text-base text-gray-700 dark:text-gray-300 sm:text-lg">
            Project <strong>{project.name}</strong> has been optimized and
            awarded to the most competitive vendor.
          </p>

          {/* Summary Highlights */}
          <div className="grid max-w-xl grid-cols-3 gap-2 mx-auto sm:gap-4">
            <div className="p-3 text-center bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 sm:p-4">
              <div className="text-xl font-bold text-green-600 dark:text-green-300 sm:text-2xl">
                {formatCurrency(analysis.costSavings)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Total Savings
              </p>
            </div>
            <div className="p-3 text-center bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 sm:p-4">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-300 sm:text-2xl">
                {formatPercentage(analysis.savingsPercentage)}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Savings %
              </p>
            </div>
            <div className="p-3 text-center bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-700 sm:p-4">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-300 sm:text-2xl">
                10x
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                Faster
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Split Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-2">
          {/* 📜 Next Steps */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Next Steps
              </h3>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Vendor Award */}
              <div className="flex items-start p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <Award className="h-5 w-5 text-green-600 dark:text-green-300 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Vendor Award Notification
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Send official award letter and contract to the L1 vendor.
                  </p>
                  <Button size="sm" className="mt-2">
                    Send Award Letter
                  </Button>
                </div>
              </div>

              {/* Purchase Order */}
              <div className="flex items-start p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Purchase Order Generation
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create and issue the purchase order for finalized materials.
                  </p>
                  <Button size="sm" className="mt-2" onClick={handleCreatePO}>
                    Generate PO
                  </Button>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-start p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-300 mr-3 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Delivery Schedule
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Project Summary
              </h3>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <SummaryField label="Project Name" value={project.name} />
                <SummaryField
                  label="Location"
                  value={project.requirement.location}
                />
                <SummaryField
                  label="Total Value"
                  value={formatCurrency(project.requirement.budget)}
                />
                <SummaryField
                  label="Savings Achieved"
                  value={`${formatCurrency(
                    analysis.costSavings
                  )} (${formatPercentage(analysis.savingsPercentage)})`}
                  highlight
                />
                <SummaryField
                  label="Vendors Participated"
                  value={project.vendors.length}
                />
                <SummaryField
                  label="Bids Received"
                  value={project.bids.length}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="space-y-6">
          {/* ⚡ Quick Actions */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Quick Actions
              </h3>
            </CardHeader>

            <CardContent className="space-y-3">
              <Button
                className="justify-start w-full"
                variant="outline"
                onClick={handleDownloadReport}
              >
                <Download className="w-4 h-4 mr-2" /> Download Report
              </Button>

              <Button
                className="justify-start w-full"
                variant="outline"
                onClick={handleShareResults}
              >
                <Share2 className="w-4 h-4 mr-2" /> Share Results
              </Button>

              <Button
                className="justify-start w-full"
                variant="outline"
                onClick={onPrevious}
              >
                <FileText className="w-4 h-4 mr-2" /> New Project
              </Button>
            </CardContent>
          </Card>

          {/* 📈 ROI Summary */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                ROI Summary
              </h3>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 text-sm">
                <ROIItem label="Time Saved" value="18 days" />
                <ROIItem label="Process Efficiency" value="85%" />
                <ROIItem label="Vendor Response Rate" value="91.7%" />
                <div className="flex justify-between pt-2 font-semibold text-gray-900 border-t dark:border-gray-700 dark:text-gray-100">
                  <span>Estimated ROI</span>
                  <span className="text-green-600 dark:text-green-300">
                    3.5x
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 🎯 Final Actions */}
          <div className="space-y-3">
            <Button className="w-full" onClick={onNext}>
              Start New Procurement
            </Button>
            <Button className="w-full" variant="outline" onClick={onPrevious}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ♻️ Reusable Components
const SummaryField = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div>
    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
      {label}
    </label>
    <p
      className={`text-sm sm:text-base ${
        highlight
          ? "font-semibold text-green-600 dark:text-green-300"
          : "text-gray-900 dark:text-gray-100"
      }`}
    >
      {value}
    </p>
  </div>
);

const ROIItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className="font-semibold text-gray-900 dark:text-gray-100">
      {value}
    </span>
  </div>
);
