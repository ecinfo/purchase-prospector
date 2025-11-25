import React, { useState } from "react";
import {
  BarChart3,
  Download,
  ArrowLeft,
  AlertTriangle,
  Lightbulb,
  Lock,
} from "lucide-react";

interface AnalysisReportProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({
  onNext,
  onPrevious,
}) => {
  const [activeTab, setActiveTab] = useState<
    "recommendations" | "comparison" | "roi"
  >("recommendations");

  const recommendations = [
    {
      id: 1,
      category: "Civil Materials",
      vendor: "Mumbai Cement Suppliers",
      amount: 23000000,
      originalAmount: 23500000,
      qualityScore: 92,
      deliveryScore: 88,
      description: "Best price with excellent quality track record",
      badge: "Award to L1",
    },
    {
      id: 2,
      category: "MEP Systems",
      vendor: "Royal Electricals",
      amount: 17000000,
      originalAmount: 17500000,
      qualityScore: 95,
      deliveryScore: 90,
      description: "Strong technical capability, certified installations",
      badge: "Award to L1",
    },
    {
      id: 3,
      category: "Interior Finishing",
      vendor: "Premium Tiles World",
      amount: 30000000,
      originalAmount: 31000000,
      qualityScore: 88,
      deliveryScore: 85,
      description: "Competitive pricing, premium brand portfolio",
      badge: "Award to L1",
    },
    {
      id: 4,
      category: "Amenities",
      vendor: "Modern Interiors Hub",
      amount: 14000000,
      originalAmount: 14500000,
      qualityScore: 90,
      deliveryScore: 92,
      description: "Complete turnkey solution with warranty",
      badge: "Award to L1",
    },
  ];

  const formatCurrency = (amount: number) =>
    `₹${(amount / 10000000).toFixed(1)} Cr`;

  const totalOptimized = recommendations.reduce((s, r) => s + r.amount, 0);
  const totalOriginal = recommendations.reduce(
    (s, r) => s + r.originalAmount,
    0
  );
  const totalSavings = totalOriginal - totalOptimized;
  const savingsRate = ((totalSavings / totalOriginal) * 100).toFixed(0);

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Bid Analysis & Recommendations
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Multi-dimensional optimization across cost, quality, and
                  delivery parameters
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium dark:text-gray-200">
                Export Report
              </span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalOriginal)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Original Budget
            </div>
          </div>

          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(totalOptimized)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Optimized Cost
            </div>
          </div>

          <div className="p-6 text-center border border-green-200 rounded-lg shadow-sm dark:border-green-800 bg-green-50 dark:bg-green-900">
            <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-300">
              {formatCurrency(totalSavings)}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Total Savings
            </div>
          </div>

          <div className="p-6 text-center border border-green-200 rounded-lg shadow-sm dark:border-green-800 bg-green-50 dark:bg-green-900">
            <div className="mb-2 text-3xl font-bold text-green-600 dark:text-green-300">
              {savingsRate}%
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Savings Rate
            </div>
          </div>
        </div>

        {/* Strategy Banner */}
        <div className="p-5 mb-6 border border-blue-200 rounded-lg dark:border-blue-800 bg-blue-50 dark:bg-blue-900">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-300 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-1 font-semibold text-blue-900 dark:text-blue-200">
                Optimal Procurement Strategy
              </h3>
              <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-300">
                AI recommends awarding to L1 (lowest bidder) across all
                categories. All recommended vendors meet quality standards and
                have proven delivery capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              {(["recommendations", "comparison", "roi"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                        : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                  >
                    {tab === "recommendations" && "Recommendations"}
                    {tab === "comparison" && "Bid Comparison"}
                    {tab === "roi" && "ROI Metrics"}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Recommendations */}
          {activeTab === "recommendations" && (
            <div className="p-6 space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-5 bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {rec.category}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Recommended: {rec.vendor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-300">
                        {formatCurrency(rec.amount)}
                      </div>
                      <div className="text-xs text-gray-500 line-through dark:text-gray-400">
                        L2: {formatCurrency(rec.originalAmount)}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded dark:text-green-200 dark:bg-green-900">
                      {rec.badge}
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                    {rec.description}
                  </p>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Quality Score",
                        val: rec.qualityScore,
                        color: "bg-blue-600 dark:bg-blue-400",
                      },
                      {
                        label: "Delivery Score",
                        val: rec.deliveryScore,
                        color: "bg-green-600 dark:bg-green-400",
                      },
                    ].map((p, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {p.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {p.val}/100
                          </span>
                        </div>
                        <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className={`h-full ${p.color} rounded-full`}
                            style={{ width: `${p.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p>Bid comparison details coming soon...</p>
            </div>
          )}

          {activeTab === "roi" && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p>ROI metrics coming soon...</p>
            </div>
          )}
        </div>

        {/* Warning */}
        <div className="p-5 mb-6 border border-orange-200 rounded-lg dark:border-orange-800 bg-orange-50 dark:bg-orange-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-300 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-1 font-semibold text-orange-900 dark:text-orange-200">
                Human Approval Required:
              </h3>
              <p className="text-sm text-orange-800 dark:text-orange-300">
                This analysis is for decision support. Final vendor selection
                and contract terms must be reviewed by authorized personnel.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium dark:text-gray-200">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="text-sm font-medium dark:text-gray-200">
                Request Modifications
              </span>
            </button>

            <button
              onClick={onNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Approve Purchase Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
