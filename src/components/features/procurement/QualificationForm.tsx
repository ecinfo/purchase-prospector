/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/features/procurement/QualificationForm.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useProcurement } from "../../../contexts/ProcurementContext";
import type { ProjectRequirement } from "../../../types";

interface QualificationFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

const questions = [
  {
    id: "location",
    question: "Where is the project located?",
    type: "text",
    placeholder: "e.g., Pune, Mumbai, Hyderabad",
  },
  {
    id: "area",
    question: "What is the total built-up area?",
    type: "number",
    placeholder: "e.g., 30000",
  },
  {
    id: "areaUnit",
    question: "Area unit?",
    type: "select",
    options: ["sqft", "sqm"],
  },
  {
    id: "type",
    question: "What type of construction?",
    type: "select",
    options: ["residential", "commercial", "industrial", "mixed-use"],
  },
  {
    id: "budget",
    question: "What is your estimated budget?",
    type: "number",
    placeholder: "e.g., 90000000",
  },
  {
    id: "timeline",
    question: "What is your project timeline (months)?",
    type: "number",
    placeholder: "e.g., 12",
  },
  {
    id: "complexity",
    question: "Project complexity level?",
    type: "select",
    options: ["standard", "medium", "high", "luxury"],
  },
];

export const QualificationForm: React.FC<QualificationFormProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state, dispatch } = useProcurement();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [answers, setAnswers] = useState<Partial<ProjectRequirement>>(
    state.currentProject?.requirement || {}
  );

  const handleAnswer = (id: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const completeAnswers: ProjectRequirement = {
      description: state.currentProject?.requirement.description || "",
      location: answers.location || "",
      area: Number(answers.area) || 0,
      areaUnit: (answers.areaUnit as "sqft" | "sqm") || "sqft",
      type: (answers.type as any) || "residential",
      budget: Number(answers.budget) || 0,
      currency: "INR",
      timeline: Number(answers.timeline) || 6,
      complexity: (answers.complexity as any) || "medium",
    };

    dispatch({ type: "UPDATE_REQUIREMENT", payload: completeAnswers });

    // Simulate AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 1200);
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Phase 2: AI Qualification
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Answer these questions to help AI understand your project requirements
        </p>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="flex flex-col gap-2">
              <label className="block text-sm sm:text-base font-medium text-gray-800">
                {index + 1}. {q.question}
              </label>

              {q.type === "select" ? (
                <select
                  value={
                    (answers[q.id as keyof ProjectRequirement] as string) || ""
                  }
                  onChange={(e) => handleAnswer(q.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select an option</option>
                  {q.options?.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  type={q.type}
                  value={
                    (answers[q.id as keyof ProjectRequirement] as string) || ""
                  }
                  onChange={(e) =>
                    handleAnswer(
                      q.id,
                      q.type === "number"
                        ? Number(e.target.value)
                        : e.target.value
                    )
                  }
                  placeholder={q.placeholder}
                  required
                  className="text-sm sm:text-base"
                />
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              className="w-full sm:w-auto"
            >
              ← Back
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Processing…" : "Generate Specifications →"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
