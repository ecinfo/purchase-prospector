// src/components/features/procurement/AnalysisReport.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import {
  type AnalysisReport as AnalysisReportType,
  type Bid,
} from "../../../types";
import { formatCurrency, formatPercentage } from "../../../utils/formatters";
import {
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { ProjectCompletion } from "./ProjectCompletion";

interface AnalysisReportProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({
  onPrevious,
}) => {
  const { state, completeProject, resetCurrentProject } = useProcurement();
  const [isCompleted, setIsCompleted] = useState(false);

  const analysisReport: AnalysisReportType = React.useMemo(() => {
    if (!state.currentProject?.bids.length) {
      return {
        optimalBid: {} as Bid,
        costSavings: 0,
        savingsPercentage: 0,
        qualityScore: 0,
        deliveryScore: 0,
        riskAssessment: { level: "low", factors: [] },
        recommendations: [],
      };
    }

    const bids = state.currentProject.bids;
    const totalValue = state.currentProject.bom.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const optimalBid = bids.reduce((best, current) => {
      const scoreBest =
        best.qualityScore * 0.4 +
        ((totalValue - best.totalAmount) / totalValue) * 0.4 +
        ((60 - best.deliveryTime) / 60) * 0.2;
      const scoreCurrent =
        current.qualityScore * 0.4 +
        ((totalValue - current.totalAmount) / totalValue) * 0.4 +
        ((60 - current.deliveryTime) / 60) * 0.2;
      return scoreCurrent > scoreBest ? current : best;
    }, bids[0]);

    const savings = totalValue - optimalBid.totalAmount;
    const percentage = (savings / totalValue) * 100;

    return {
      optimalBid,
      costSavings: savings,
      savingsPercentage: percentage,
      qualityScore: optimalBid.qualityScore,
      deliveryScore: ((60 - optimalBid.deliveryTime) / 60) * 100,
      riskAssessment: {
        level: percentage > 20 ? "low" : percentage > 10 ? "medium" : "high",
        factors:
          percentage > 20
            ? ["Competitive bidding achieved", "Quality vendors participated"]
            : ["Limited vendor participation", "Market prices increased"],
      },
      recommendations: [
        "Proceed with L1 vendor award",
        "Monitor delivery timelines closely",
        "Consider backup vendor for critical items",
        "Schedule quality checks upon delivery",
      ],
    };
  }, [state.currentProject?.bids, state.currentProject?.bom]);

  const handleApproveAnalysis = () => {
    completeProject(analysisReport);
    setIsCompleted(true);
  };

  const handleNewProject = () => {
    resetCurrentProject();
    setIsCompleted(false);
  };

  const handleViewDashboard = () => (window.location.href = "/");

  const getVendorName = (id: string) =>
    state.currentProject?.vendors.find((v) => v.id === id)?.name ||
    "Unknown Vendor";

  if (isCompleted && state.currentProject) {
    return (
      <ProjectCompletion
        onNewProject={handleNewProject}
        onViewDashboard={handleViewDashboard}
      />
    );
  }

  if (!state.currentProject?.bids.length) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Bids Available
          </h3>
          <p className="text-gray-600 mb-4">
            Please complete the bid collection phase first.
          </p>
          <Button onClick={onPrevious}>← Back to Bid Collection</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-6xl mx-auto w-full">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Phase 10: AI Analysis & Optimization
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          L1 vendor selection with cost-quality optimization
        </p>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <Card className="p-4 text-center bg-green-50 border-green-200">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {formatCurrency(analysisReport.costSavings)}
            </div>
            <p className="text-xs sm:text-sm text-green-700">Cost Savings</p>
          </Card>

          <Card className="p-4 text-center bg-blue-50 border-blue-200">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {formatPercentage(analysisReport.savingsPercentage)}
            </div>
            <p className="text-xs sm:text-sm text-blue-700">Savings %</p>
          </Card>

          <Card className="p-4 text-center bg-purple-50 border-purple-200">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-purple-600">
              {analysisReport.qualityScore.toFixed(1)}
            </div>
            <p className="text-xs sm:text-sm text-purple-700">Quality Score</p>
          </Card>

          <Card className="p-4 text-center bg-orange-50 border-orange-200">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-orange-600">
              {analysisReport.optimalBid.deliveryTime} days
            </div>
            <p className="text-xs sm:text-sm text-orange-700">Delivery Time</p>
          </Card>
        </div>

        {/* RECOMMENDED VENDOR */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Recommended Award (L1 Vendor)
            </h3>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vendor Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Vendor Details
                </h4>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vendor Name:</span>
                    <span className="font-semibold">
                      {getVendorName(analysisReport.optimalBid.vendorId)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bid Amount:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(analysisReport.optimalBid.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-semibold">
                      {analysisReport.optimalBid.deliveryTime} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-semibold">
                      {analysisReport.optimalBid.paymentTerms}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality Metrics */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Quality Metrics
                </h4>
                <div className="space-y-4">
                  {/* Quality Score */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-600">Quality Score</span>
                      <span className="font-semibold">
                        {analysisReport.qualityScore.toFixed(1)}/5
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(analysisReport.qualityScore / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Delivery Score */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-600">Delivery Score</span>
                      <span className="font-semibold">
                        {analysisReport.deliveryScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${analysisReport.deliveryScore}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RISK ASSESSMENT */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Risk Assessment
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                  analysisReport.riskAssessment.level === "low"
                    ? "bg-green-100 text-green-700"
                    : analysisReport.riskAssessment.level === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {analysisReport.riskAssessment.level.toUpperCase()} RISK
              </span>

              <p className="text-xs sm:text-sm text-gray-600">
                {analysisReport.riskAssessment.factors.length} factors
                considered
              </p>
            </div>

            <ul className="mt-3 space-y-1">
              {analysisReport.riskAssessment.factors.map((factor, index) => (
                <li
                  key={index}
                  className="flex items-start text-xs sm:text-sm text-gray-700"
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 mt-1 ${
                      analysisReport.riskAssessment.level === "low"
                        ? "bg-green-500"
                        : analysisReport.riskAssessment.level === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  {factor}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* RECOMMENDATIONS */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              AI Recommendations
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysisReport.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 text-sm sm:text-base"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ROI SUMMARY */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Procurement ROI Summary
            </h3>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600">
                  10x
                </div>
                <div className="text-xs sm:text-sm text-blue-700">
                  Faster Process
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-green-600">
                  {formatPercentage(analysisReport.savingsPercentage)}
                </div>
                <div className="text-xs sm:text-sm text-green-700">
                  Cost Savings
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-purple-600">
                  91.7%
                </div>
                <div className="text-xs sm:text-sm text-purple-700">
                  Vendor Response
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full sm:w-auto"
          >
            ← Back
          </Button>

          <Button
            onClick={handleApproveAnalysis}
            size="lg"
            className="w-full sm:w-auto font-semibold"
          >
            ✓ Approve & Complete Procurement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
