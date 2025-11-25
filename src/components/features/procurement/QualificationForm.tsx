/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "../../ui/Input";
import { Card, CardContent } from "../../ui/Card";
import { Button } from "../../ui/Button";

interface UnitMix {
  "2BHK": number;
  "3BHK": number;
  "4BHK": number;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    area: "",
    areaUnit: "sqft",
    type: "",
    budget: "",
    timeline: "",
    complexity: "",
    unitMix: { "2BHK": 0, "3BHK": 0, "4BHK": 0 },
    architecturalStyle: "",
    amenities: [],
    targetBuyer: "",
    projectTimeline: "",
  });

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

  const isFormValid = () => {
    return (
      formData.location.trim() &&
      Number(formData.area) > 0 &&
      formData.areaUnit &&
      formData.type &&
      Number(formData.budget) > 0 &&
      Number(formData.timeline) > 0 &&
      formData.complexity
    );
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      onNext(); // Call the onNext callback
    }, 1200);
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
                {/* Location */}
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

                {/* Area */}
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

                    {/* Radio Buttons for Units */}
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

                {/* Type */}
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
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="mixed-use">Mixed-use</option>
                  </select>
                </div>

                {/* Budget */}
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

                {/* Timeline */}
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

                {/* Complexity */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Project Complexity *
                  </label>
                  <select
                    value={formData.complexity}
                    onChange={(e) =>
                      handleBasicInput("complexity", e.target.value)
                    }
                    className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    required
                  >
                    <option value="">Select complexity</option>
                    <option value="standard">Standard</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="luxury">Luxury</option>
                  </select>
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
                  {["2BHK", "3BHK", "4BHK"].map((unit) => (
                    <div
                      key={unit}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg dark:border-gray-600"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {unit}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={formData.unitMix?.[unit as keyof UnitMix] || 0}
                        onChange={(e) =>
                          handleUnitChange(unit, parseInt(e.target.value) || 0)
                        }
                        className="w-20 px-3 py-2 text-center text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Style */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Architectural Style
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Modern Contemporary",
                    "Traditional Indian",
                    "Minimalist",
                    "Luxury Premium",
                    "Budget-Friendly",
                  ].map((style) => (
                    <label
                      key={style}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400"
                    >
                      <input
                        type="radio"
                        name="architecturalStyle"
                        value={style}
                        checked={formData.architecturalStyle === style}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            architecturalStyle: style,
                          })
                        }
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-100">
                        {style}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Amenities
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "Swimming Pool",
                    "Gym/Fitness Center",
                    "Clubhouse",
                    "Children's Play Area",
                    "Landscaped Garden",
                    "Security Systems",
                    "Parking (Covered)",
                    "Parking (Open)",
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

              {/* Target Buyer */}
              <div className="mb-6">
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Target Buyer Segment
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "First-time Homebuyers",
                    "Young Professionals",
                    "Families",
                    "Investors",
                    "Premium/Luxury Buyers",
                  ].map((buyer) => (
                    <label
                      key={buyer}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400"
                    >
                      <input
                        type="radio"
                        name="targetBuyer"
                        value={buyer}
                        checked={formData.targetBuyer === buyer}
                        onChange={() =>
                          setFormData({ ...formData, targetBuyer: buyer })
                        }
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-100">
                        {buyer}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Timeline */}
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Expected Completion Timeline
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {["12 months", "18 months", "24 months", "30+ months"].map(
                    (timeline) => (
                      <label
                        key={timeline}
                        className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400"
                      >
                        <input
                          type="radio"
                          name="projectTimeline"
                          value={timeline}
                          checked={formData.projectTimeline === timeline}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              projectTimeline: timeline,
                            })
                          }
                          className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        />
                        <span className="ml-3 text-gray-900 dark:text-gray-100">
                          {timeline}
                        </span>
                      </label>
                    )
                  )}
                </div>
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
              disabled={!isFormValid() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
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
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
