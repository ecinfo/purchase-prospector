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

  // Simulate AI analysis
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

    // Find optimal bid (balancing cost, quality, and delivery)
    const optimalBid = bids.reduce((best, current) => {
      const bestScore =
        best.qualityScore * 0.4 +
        ((totalValue - best.totalAmount) / totalValue) * 0.4 +
        ((60 - best.deliveryTime) / 60) * 0.2;
      const currentScore =
        current.qualityScore * 0.4 +
        ((totalValue - current.totalAmount) / totalValue) * 0.4 +
        ((60 - current.deliveryTime) / 60) * 0.2;
      return currentScore > bestScore ? current : best;
    }, bids[0]);

    const costSavings = totalValue - optimalBid.totalAmount;
    const savingsPercentage = (costSavings / totalValue) * 100;

    return {
      optimalBid,
      costSavings,
      savingsPercentage,
      qualityScore: optimalBid.qualityScore,
      deliveryScore: ((60 - optimalBid.deliveryTime) / 60) * 100,
      riskAssessment: {
        level:
          savingsPercentage > 20
            ? "low"
            : savingsPercentage > 10
            ? "medium"
            : "high",
        factors:
          savingsPercentage > 20
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
    // Use the new completeProject method from context
    completeProject(analysisReport);
    setIsCompleted(true);
  };

  const handleNewProject = () => {
    // Use the new resetCurrentProject method from context
    resetCurrentProject();
    setIsCompleted(false);
  };

  const handleViewDashboard = () => {
    // Navigate to dashboard
    window.location.href = "/";
  };

  const getVendorName = (vendorId: string) => {
    return (
      state.currentProject?.vendors.find((v) => v.id === vendorId)?.name ||
      "Unknown Vendor"
    );
  };

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
      <Card className="max-w-2xl mx-auto">
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
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">
          Phase 10: AI Analysis & Optimization
        </h2>
        <p className="text-gray-600">
          L1 vendor selection with cost-quality optimization
        </p>
      </CardHeader>

      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-green-50 border-green-200">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(analysisReport.costSavings)}
            </div>
            <div className="text-sm text-green-700">Cost Savings</div>
          </Card>
          <Card className="p-4 text-center bg-blue-50 border-blue-200">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {formatPercentage(analysisReport.savingsPercentage)}
            </div>
            <div className="text-sm text-blue-700">Savings %</div>
          </Card>
          <Card className="p-4 text-center bg-purple-50 border-purple-200">
            <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {analysisReport.qualityScore.toFixed(1)}
            </div>
            <div className="text-sm text-purple-700">Quality Score</div>
          </Card>
          <Card className="p-4 text-center bg-orange-50 border-orange-200">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {analysisReport.optimalBid.deliveryTime} days
            </div>
            <div className="text-sm text-orange-700">Delivery Time</div>
          </Card>
        </div>

        {/* Optimal Bid Details */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Recommended Award (L1 Vendor)
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Vendor Details
                </h4>
                <div className="space-y-2">
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
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Quality Metrics
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
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
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Delivery Score</span>
                      <span className="font-semibold">
                        {analysisReport.deliveryScore.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${analysisReport.deliveryScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Risk Assessment
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    analysisReport.riskAssessment.level === "low"
                      ? "bg-green-100 text-green-800"
                      : analysisReport.riskAssessment.level === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {analysisReport.riskAssessment.level.toUpperCase()} RISK
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {analysisReport.riskAssessment.factors.length} factors
                considered
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {analysisReport.riskAssessment.factors.map((factor, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
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

        {/* Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              AI Recommendations
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysisReport.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* ROI Summary */}
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Procurement ROI Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">10x</div>
                <div className="text-sm text-blue-700">Faster Process</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {formatPercentage(analysisReport.savingsPercentage)}
                </div>
                <div className="text-sm text-green-700">Cost Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">91.7%</div>
                <div className="text-sm text-purple-700">Vendor Response</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onPrevious}>
            ← Back
          </Button>
          <Button onClick={handleApproveAnalysis} size="lg">
            ✓ Approve & Complete Procurement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
