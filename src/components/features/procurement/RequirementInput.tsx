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

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex flex-col items-center px-4 py-16 lg:px-0">
        {/* Hero */}
        <div className="max-w-4xl text-center mb-7 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-100 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              AI Procurement Studio
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Describe Your Project,
            <span className="block mt-1 text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              Get Instant Insights
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-4 text-lg leading-relaxed text-gray-600 sm:text-xl">
            Our AI breaks down your requirements into budget, vendors,
            timelines, and risk insights. Just type your need—everything else is
            automated.
          </p>
        </div>

        {/* Main Input Card */}
        <Card className="relative w-full max-w-3xl overflow-hidden transition-all border-0 shadow-xl rounded-3xl animate-slide-up hover:shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

          <CardContent className="p-10 space-y-5">
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-900">
                What are you planning to build?
              </label>

              <textarea
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder="E.g., Build a 30,000 sq.ft residential project in Pune with clubhouse, parking, and luxury amenities..."
                rows={4}
                className="w-full p-4 text-base text-gray-800 transition-all border-2 border-gray-200 resize-none rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20"
              />

              <div className="text-xs text-right text-gray-400">
                {requirement.length} characters
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Zap className="w-4 h-4 text-yellow-500" /> Try an example:
              </p>

              <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRequirement(ex)}
                    className="px-4 py-2 text-sm text-gray-700 transition-all bg-white border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleSubmit}
              className="w-full text-base font-semibold transition-all shadow-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700"
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
              className={`p-6 bg-white border-2 border-${b.color}-100 rounded-2xl shadow-sm hover:shadow-md hover:border-${b.color}-300 transition-all group`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-${b.color}-500 to-${b.color}-600 text-white group-hover:scale-110 transition-transform`}
              >
                {b.icon}
              </div>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900">
                {b.val}
              </p>
              <p className="text-sm font-semibold text-gray-700">{b.text}</p>
              <p className="mt-1 text-xs text-gray-500">{b.sub}</p>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>AI-Powered Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>ISO 27001 Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Trusted by 500+ Enterprises</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementInput;
