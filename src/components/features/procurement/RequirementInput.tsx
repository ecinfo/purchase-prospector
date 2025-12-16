import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Sparkles,
  TrendingDown,
  Shield,
  Zap,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";
import type { AppDispatch, RootState } from "../../../store";
import { createProject } from "../../../store/slices/procuremnetSlice";

interface RequirementInputProps {
  onNext: () => void;
}

const RequirementInput: React.FC<RequirementInputProps> = ({ onNext }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.procurement
  );

  const token =
    useSelector((state: RootState) => state.auth?.token) ||
    localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [requirement, setRequirement] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a project title");
      return;
    }

    if (!requirement.trim()) {
      alert("Please enter project requirements");
      return;
    }

    if (!token) {
      alert("Authentication required");
      return;
    }

    const result = await dispatch(
      createProject({
        name: title.trim(),
        description: requirement.trim(),
        token,
      })
    );

    if (createProject.fulfilled.match(result)) {
      onNext();
    }
  };

  const examples = [
    "Residential Apartment – Pune",
    "Luxury Housing Project – Mumbai",
    "Commercial IT Park – Bangalore",
  ];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="flex flex-col items-center px-4 py-16">
        {/* Header */}
        <div className="max-w-4xl mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-blue-900/40 rounded-full border border-blue-800">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">
              AI Procurement Studio
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-gray-100">
            Create New Project
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Give your project a clear title and detailed requirement. Our AI
            handles the rest.
          </p>
        </div>

        {/* Form Card */}
        <Card className="w-full max-w-3xl border border-gray-800 shadow-xl bg-gray-900/70 rounded-3xl">
          <CardContent className="p-10 space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-200">
                <FileText className="w-5 h-5 text-blue-400" />
                Project Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Residential Tower – Phase 1"
                className="w-full p-4 text-gray-100 border-2 border-gray-800 bg-gray-950 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
              />
            </div>

            {/* Requirement */}
            <div>
              <label className="block mb-2 text-lg font-semibold text-gray-200">
                Project Requirement
              </label>

              <textarea
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Describe scope, size, location, and expectations..."
                className="w-full p-4 text-gray-100 border-2 border-gray-800 resize-none bg-gray-950 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
              />

              <div className="mt-1 text-xs text-right text-gray-500">
                {requirement.length}/500
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm font-medium text-red-400">{error}</p>
            )}

            {/* Examples */}
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Zap className="w-4 h-4 text-yellow-400" />
                Try an example title
              </p>

              <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTitle(ex)}
                    className="px-4 py-2 text-sm text-gray-300 transition bg-gray-900 border border-gray-800 rounded-lg hover:border-blue-600 hover:bg-gray-800"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full text-base font-semibold shadow-lg h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? "Creating Project..." : "Start AI Analysis"}
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 mt-14 sm:grid-cols-3">
          <Stat
            icon={<Zap className="w-6 h-6 text-blue-400" />}
            value="10x"
            label="Faster Procurement"
          />
          <Stat
            icon={<TrendingDown className="w-6 h-6 text-green-400" />}
            value="15–25%"
            label="Cost Optimization"
          />
          <Stat
            icon={<Shield className="w-6 h-6 text-purple-400" />}
            value="100%"
            label="Audit Compliance"
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="p-6 text-center border border-gray-800 bg-gray-900/60 rounded-2xl">
    <div className="flex justify-center mb-3">{icon}</div>
    <p className="text-3xl font-extrabold text-gray-100">{value}</p>
    <p className="text-sm font-semibold text-gray-400">{label}</p>
  </div>
);

export default RequirementInput;
