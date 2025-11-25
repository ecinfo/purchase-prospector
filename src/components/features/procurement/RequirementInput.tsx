import React, { useState } from "react";
import { ArrowRight, Sparkles, TrendingDown, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";

interface RequirementInputProps {
  onNext: () => void;
  onPrevious?: () => void;
}

const RequirementInput: React.FC<RequirementInputProps> = ({ onNext }) => {
  const [requirement, setRequirement] = useState("");

  const handleSubmit = () => {
    if (!requirement.trim()) {
      alert("Please enter a project requirement");
      return;
    }
    onNext();
  };

  const examples = [
    "30,000 sq.ft residential building in Pune",
    "Luxury apartment complex with 50 units in Mumbai",
    "Mid-range housing project with clubhouse amenities",
  ];

  // 🆕 Tailwind-safe color map
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600 border-blue-100 hover:border-blue-300",
    green:
      "from-green-500 to-green-600 border-green-100 hover:border-green-300",
    purple:
      "from-purple-500 to-purple-600 border-purple-100 hover:border-purple-300",
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center px-4 py-16 lg:px-0">
        {/* Hero */}
        <div className="max-w-4xl text-center mb-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-100 dark:bg-blue-900 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-200">
              AI Procurement Studio
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">
            Describe Your Project,
            <span className="block mt-1 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Get Instant Insights
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl">
            Our AI breaks down your requirements into budget, vendors,
            timelines, and risk insights. Just type your need—everything else is
            automated.
          </p>
        </div>

        {/* Main Input */}
        <Card className="relative w-full max-w-3xl overflow-hidden transition-all bg-white border-0 shadow-xl rounded-3xl hover:shadow-2xl dark:bg-gray-900">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <CardContent className="p-10 space-y-5">
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100">
                What are you planning to build?
              </label>

              <textarea
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="E.g., Build a 30,000 sq.ft residential project in Pune with clubhouse, parking, and luxury amenities..."
                rows={4}
                className="w-full p-4 text-base text-gray-800 transition-all bg-white border-2 border-gray-200 resize-none dark:text-gray-200 dark:border-gray-700 rounded-xl dark:bg-gray-800 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
              />

              <div
                className={`text-xs text-right ${
                  requirement.length > 250
                    ? "text-red-500"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {requirement.length}/250
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Zap className="w-4 h-4 text-yellow-500" /> Try an example:
              </p>

              <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRequirement(ex)}
                    className="px-4 py-2 text-sm text-gray-700 transition-all bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleSubmit}
              className="w-full text-base font-semibold transition-all shadow-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center gap-2">
                Start AI Analysis
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 mt-12 sm:grid-cols-3">
          {[
            {
              icon: <Zap className="w-6 h-6 text-white" />,
              val: "10x",
              text: "Faster Procurement",
              sub: "Automated decisions",
              color: "blue",
            },
            {
              icon: <TrendingDown className="w-6 h-6 text-white" />,
              val: "15–25%",
              text: "Cost Savings",
              sub: "Optimized spend",
              color: "green",
            },
            {
              icon: <Shield className="w-6 h-6 text-white" />,
              val: "100%",
              text: "Audit Compliance",
              sub: "Fully transparent",
              color: "purple",
            },
          ].map((b, i) => (
            <div
              key={i}
              className={`p-6 bg-white dark:bg-gray-800 border-2 rounded-2xl shadow-sm hover:shadow-md transition-all group ${
                colorMap[b.color]
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br text-white group-hover:scale-110 transition-transform ${
                  colorMap[b.color].split(" ")[0] // Extract from-*
                } ${colorMap[b.color].split(" ")[1]}`} // Extract to-*
              >
                {b.icon}
              </div>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-white">
                {b.val}
              </p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {b.text}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {b.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequirementInput;
