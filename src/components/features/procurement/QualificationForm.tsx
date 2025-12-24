/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "../../ui/Input";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { submitProjectQualification } from "../../../store/slices/procuremnetSlice";

interface UnitMix {
  "2bhk": number;
  "3bhk": number;
  "4bhk": number;
}

interface QualificationFormProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface FormData {
  location: string;
  area: number | string;
  areaUnit: string;
  type: string;
  budget: number | string;
  timeline: number | string;
  complexity: string;
  unitMix: UnitMix;
  architecturalStyle: string;
  amenities: string[];
  targetBuyer: string;
  projectTimeline: string;
}

export default function QualificationForm({
  onNext,
  onPrevious,
}: QualificationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    area: "",
    areaUnit: "sqft",
    type: "",
    budget: "",
    timeline: "",
    complexity: "",
    unitMix: { "2bhk": 0, "3bhk": 0, "4bhk": 0 },
    architecturalStyle: "",
    amenities: [],
    targetBuyer: "",
    projectTimeline: "",
  });

  const dispatch = useAppDispatch();
  const token =
    useAppSelector((state) => state.auth.token) ||
    localStorage.getItem("token");
  const projectId = useAppSelector((state) => state.procurement?.project?.id);
  const { qualificationSubmitting } = useAppSelector(
    (state) => state.procurement
  );

  const handleBasicInput = (id: string, value: string | number) =>
    setFormData((prev) => ({ ...prev, [id]: value }));

  const handleUnitChange = (unit: string, value: number) =>
    setFormData({
      ...formData,
      unitMix: { ...formData.unitMix, [unit]: value } as UnitMix,
    });

  const handleCheckboxChange = (value: string) => {
    const current = formData.amenities || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData({ ...formData, amenities: updated });
  };

  const buildAnswersPayload = (data: FormData) => ({
    basic_information: {
      project_location: data.location,
      built_up_area: {
        value: Number(data.area),
        unit: data.areaUnit,
      },
      construction_type: data.type,
      estimated_budget: Number(data.budget),
      project_timeline: Number(data.timeline),
      project_complexity: data.complexity,
    },
    detailed_specifications: {
      unit_mix: {
        "2bhk": data.unitMix["2bhk"],
        "3bhk": data.unitMix["3bhk"],
        "4bhk": data.unitMix["4bhk"],
      },
      architectural_style: data.architecturalStyle,
      amenities: data.amenities.map((a) => ({
        name: a,
        details: "",
      })),
      target_buyer_segment: data.targetBuyer,
      expected_completion_timeline: data.projectTimeline,
    },
  });

  const handleSubmit = async () => {
    if (!token || !projectId) return;
    const answers = buildAnswersPayload(formData);
    const result = await dispatch(
      submitProjectQualification({
        projectId,
        token,
        answers,
      })
    );

    if (submitProjectQualification.fulfilled.match(result)) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-5xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Project Qualification Form
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in all the details about your construction project
          </p>
        </div>

        <div>
          {/* Basic Project Information */}
          <Card className="mb-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Basic Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Location - Text Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Project Location *
                  </label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      handleBasicInput("location", e.target.value)
                    }
                    placeholder="e.g., Pune, Mumbai, Hyderabad"
                    className="w-full dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Area - Text Input with Radio Units */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Total Built-up Area *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleBasicInput("area", e.target.value)}
                      placeholder="30000"
                      className="flex-1 dark:bg-gray-700 dark:text-gray-100"
                      required
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
                        <input
                          type="radio"
                          name="areaUnit"
                          value="sqft"
                          checked={formData.areaUnit === "sqft"}
                          onChange={(e) =>
                            handleBasicInput("areaUnit", e.target.value)
                          }
                          className="accent-blue-600"
                        />
                        sqft
                      </label>
                      <label className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
                        <input
                          type="radio"
                          name="areaUnit"
                          value="sqm"
                          checked={formData.areaUnit === "sqm"}
                          onChange={(e) =>
                            handleBasicInput("areaUnit", e.target.value)
                          }
                          className="accent-blue-600"
                        />
                        sqm
                      </label>
                    </div>
                  </div>
                </div>

                {/* Type - Select Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Construction Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleBasicInput("type", e.target.value)}
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Mixed-use">Mixed-use</option>
                  </select>
                </div>

                {/* Budget - Text Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Estimated Budget (INR) *
                  </label>
                  <Input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleBasicInput("budget", e.target.value)}
                    placeholder="90000000"
                    className="w-full dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Timeline - Text Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Project Timeline (months) *
                  </label>
                  <Input
                    type="number"
                    value={formData.timeline}
                    onChange={(e) =>
                      handleBasicInput("timeline", e.target.value)
                    }
                    placeholder="12"
                    className="w-full dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                {/* Complexity - Text Input (based on JSON structure) */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Project Complexity *
                  </label>
                  <Input
                    type="text"
                    value={formData.complexity}
                    onChange={(e) =>
                      handleBasicInput("complexity", e.target.value)
                    }
                    placeholder="e.g., Medium, High, Standard"
                    className="w-full dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Enter complexity level (e.g., Standard, Medium, High)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Project Specifications */}
          <Card className="mb-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Detailed Specifications
              </h2>

              {/* Unit Mix */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Unit Mix
                </label>
                <div className="grid gap-3 md:grid-cols-3">
                  {["2bhk", "3bhk", "4bhk"].map((unit) => (
                    <div
                      key={unit}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-600"
                    >
                      <span className="font-medium text-gray-900 capitalize dark:text-gray-100">
                        {unit.toUpperCase()}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={formData.unitMix[unit as keyof UnitMix] || 0}
                        onChange={(e) =>
                          handleUnitChange(unit, parseInt(e.target.value) || 0)
                        }
                        className="w-20 px-3 py-2 text-center text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Style - Text Input (based on JSON) */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Architectural Style *
                </label>
                <Input
                  type="text"
                  value={formData.architecturalStyle}
                  onChange={(e) =>
                    handleBasicInput("architecturalStyle", e.target.value)
                  }
                  placeholder="e.g., Modern Contemporary"
                  className="w-full dark:bg-gray-700 dark:text-gray-100"
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter the architectural style (e.g., Modern Contemporary,
                  Traditional, etc.)
                </p>
              </div>

              {/* Amenities - Checkboxes (Based on JSON structure) */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Amenities (Select all that apply)
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Parking",
                    "Swimming Pool",
                    "Gym/Fitness Center",
                    "Clubhouse",
                    "Children's Play Area",
                    "Landscaped Garden",
                    "Security Systems",
                  ].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400"
                    >
                      <input
                        type="checkbox"
                        value={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleCheckboxChange(amenity)}
                        className="w-4 h-4 text-blue-600 rounded dark:text-blue-400"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-100">
                        {amenity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Target Buyer - Text Input (based on JSON structure) */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Target Buyer Segment *
                </label>
                <Input
                  type="text"
                  value={formData.targetBuyer}
                  onChange={(e) =>
                    handleBasicInput("targetBuyer", e.target.value)
                  }
                  placeholder="e.g., Families"
                  className="w-full dark:bg-gray-700 dark:text-gray-100"
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter target buyer segment (e.g., Families, Young
                  Professionals, etc.)
                </p>
              </div>

              {/* Project Timeline - Text Input (based on JSON structure) */}
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Expected Completion Timeline *
                </label>
                <Input
                  type="text"
                  value={formData.projectTimeline}
                  onChange={(e) =>
                    handleBasicInput("projectTimeline", e.target.value)
                  }
                  placeholder="e.g., 18 months"
                  className="w-full dark:bg-gray-700 dark:text-gray-100"
                  required
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter expected completion timeline (e.g., 12 months, 18
                  months)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button
              onClick={onPrevious}
              variant="outline"
              className="text-gray-900 border-gray-300 dark:border-black-600 dark:text-black-100"
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
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            >
              {qualificationSubmitting
                ? "Processing..."
                : "Complete Qualification"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
