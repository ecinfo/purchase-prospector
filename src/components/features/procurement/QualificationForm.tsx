/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/features/procurement/QualificationForm.tsx
import React, { useState } from "react";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useProcurement } from "../../../contexts/ProcurementContext";
import type { ProjectRequirement } from "../../../types";

interface QualificationFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface UnitMix {
  "2BHK": number;
  "3BHK": number;
  "4BHK": number;
}

interface ExtendedFormData extends ProjectRequirement {
  unitMix: UnitMix;
  architecturalStyle: string;
  amenities: string[];
  targetBuyer: string;
  projectTimeline: string;
  budgetRange: number;
}

// Original basic questions
const basicQuestions = [
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

// New detailed questions
const detailedQuestions = [
  {
    id: "unitMix",
    question: "What is your preferred unit mix?",
    type: "unit-counter",
    units: ["2 BHK Units", "3 BHK Units", "4 BHK Units"],
  },
  {
    id: "architecturalStyle",
    question: "What architectural style are you targeting?",
    type: "radio",
    options: [
      "Modern Contemporary",
      "Traditional Indian",
      "Minimalist",
      "Luxury Premium",
      "Budget-Friendly",
    ],
  },
  {
    id: "amenities",
    question: "Which amenities do you want to include?",
    type: "checkbox",
    options: [
      "Swimming Pool",
      "Gym/Fitness Center",
      "Clubhouse",
      "Children's Play Area",
      "Landscaped Garden",
      "Security Systems",
      "Parking (Covered)",
      "Parking (Open)",
    ],
  },
  {
    id: "targetBuyer",
    question: "Who is your target buyer segment?",
    type: "radio",
    options: [
      "First-time Homebuyers",
      "Young Professionals",
      "Families",
      "Investors",
      "Premium/Luxury Buyers",
    ],
  },
  {
    id: "projectTimeline",
    question: "What is your expected project completion timeline?",
    type: "radio",
    options: ["12 months", "18 months", "24 months", "30+ months"],
  },
  {
    id: "budgetRange",
    question: "What is your approximate budget range (in Crores)?",
    type: "number",
    placeholder: "Enter amount",
  },
];

// Combine all questions
const allQuestions = [...basicQuestions, ...detailedQuestions];

export const QualificationForm: React.FC<QualificationFormProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state, dispatch } = useProcurement();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<ExtendedFormData>>({
    ...state.currentProject?.requirement,
    unitMix: { "2BHK": 0, "3BHK": 0, "4BHK": 0 },
    amenities: [],
    architecturalStyle: "",
    targetBuyer: "",
    projectTimeline: "",
    budgetRange: 0,
  });

  const currentQuestion = allQuestions[currentStep];
  const progress = ((currentStep + 1) / allQuestions.length) * 100;
  const isLastQuestion = currentStep === allQuestions.length - 1;

  const handleBasicInput = (id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUnitChange = (unit: string, value: number) => {
    setFormData({
      ...formData,
      unitMix: {
        ...formData.unitMix,
        [unit]: value,
      } as UnitMix,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      [currentQuestion.id]: value,
    });
  };

  const handleCheckboxChange = (value: string) => {
    const current = formData.amenities || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData({
      ...formData,
      amenities: updated,
    });
  };

  const handleNumberChange = (value: number) => {
    setFormData({
      ...formData,
      [currentQuestion.id]: value,
    });
  };

  const isStepValid = () => {
    const question = currentQuestion;
    const value = formData[question.id as keyof ExtendedFormData];

    switch (question.type) {
      case "text":
        return !!value && String(value).trim().length > 0;
      case "number":
        return !!value && Number(value) > 0;
      case "select":
        return !!value;
      case "unit-counter":
        return Object.values(formData.unitMix || {}).some((v) => v > 0);
      case "radio":
        return !!value;
      case "checkbox":
        return (formData.amenities || []).length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      onPrevious();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const completeAnswers: ProjectRequirement = {
      description: state.currentProject?.requirement.description || "",
      location: formData.location || "",
      area: Number(formData.area) || 0,
      areaUnit: (formData.areaUnit as "sqft" | "sqm") || "sqft",
      type: (formData.type as any) || "residential",
      budget: Number(formData.budget) || 0,
      currency: "INR",
      timeline: Number(formData.timeline) || 6,
      complexity: (formData.complexity as any) || "medium",
    };

    dispatch({ type: "UPDATE_REQUIREMENT", payload: completeAnswers });

    // Simulate AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen pt-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            AI Qualification Phase
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            {state.currentProject?.requirement.description ||
              "Analyzing your construction project requirements"}
          </p>
          <div className="flex items-center justify-end mt-4 text-sm text-gray-600">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Question {currentStep + 1} of {allQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
            <div
              className="h-full transition-all duration-300 ease-out bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardContent className="p-6 sm:p-8">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 sm:text-2xl">
              {currentQuestion.question}
            </h2>

            {/* Basic Text Input */}
            {currentQuestion.type === "text" && (
              <Input
                type="text"
                value={
                  (formData[
                    currentQuestion.id as keyof ExtendedFormData
                  ] as string) || ""
                }
                onChange={(e) =>
                  handleBasicInput(currentQuestion.id, e.target.value)
                }
                placeholder={currentQuestion.placeholder}
                className="w-full text-base sm:text-lg"
              />
            )}

            {/* Basic Number Input */}
            {currentQuestion.type === "number" &&
              currentStep < basicQuestions.length && (
                <Input
                  type="number"
                  value={
                    (formData[
                      currentQuestion.id as keyof ExtendedFormData
                    ] as number) || ""
                  }
                  onChange={(e) =>
                    handleBasicInput(currentQuestion.id, Number(e.target.value))
                  }
                  placeholder={currentQuestion.placeholder}
                  className="w-full text-base sm:text-lg"
                />
              )}

            {/* Basic Select */}
            {currentQuestion.type === "select" && (
              <select
                value={
                  (formData[
                    currentQuestion.id as keyof ExtendedFormData
                  ] as string) || ""
                }
                onChange={(e) =>
                  handleBasicInput(currentQuestion.id, e.target.value)
                }
                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                {currentQuestion.options?.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            )}

            {/* Unit Counter */}
            {currentQuestion.type === "unit-counter" &&
              "units" in currentQuestion && (
                <div className="space-y-4">
                  {currentQuestion.units?.map((unit) => (
                    <div
                      key={unit}
                      className="flex items-center justify-between p-4 transition-colors border border-gray-200 rounded-lg hover:border-blue-300"
                    >
                      <span className="font-medium text-gray-900">{unit}</span>
                      <input
                        type="number"
                        min="0"
                        value={
                          formData.unitMix?.[
                            unit.split(" ")[0] as keyof UnitMix
                          ] || 0
                        }
                        onChange={(e) =>
                          handleUnitChange(
                            unit.split(" ")[0],
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 px-3 py-2 text-center border border-gray-300 rounded-lg sm:w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              )}

            {/* Radio Options */}
            {currentQuestion.type === "radio" && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 transition-all border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50"
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={
                        formData[
                          currentQuestion.id as keyof ExtendedFormData
                        ] === option
                      }
                      onChange={() => handleRadioChange(option)}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Checkbox Options */}
            {currentQuestion.type === "checkbox" && (
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 transition-all border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50"
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={(formData.amenities || []).includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Detailed Number Input (for budget range) */}
            {currentQuestion.type === "number" &&
              currentStep >= basicQuestions.length && (
                <input
                  type="number"
                  placeholder={currentQuestion.placeholder}
                  value={
                    (formData[
                      currentQuestion.id as keyof ExtendedFormData
                    ] as number) || ""
                  }
                  onChange={(e) =>
                    handleNumberChange(parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            className="order-2 w-full sm:w-auto sm:order-1"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepValid() || isSubmitting}
            className="order-1 w-full bg-gray-600 sm:w-auto sm:order-2 hover:bg-gray-700 disabled:bg-gray-300"
          >
            {isSubmitting ? (
              "Processing…"
            ) : isLastQuestion ? (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Complete Qualification
              </>
            ) : (
              <>
                Next Question
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
