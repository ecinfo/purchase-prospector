/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
  plotArea: number | string;
  plotAreaUnit: string;
  area: number | string;
  areaUnit: string;
  type: string;
  budget: number | string;
  timeline: number | string;
  complexity: string;
  unitMix: UnitMix;
  architecturalStyle: string;
  amenities: {
    name: string;
    details: string;
  }[];
  numberOfFloors: number | string;
  targetBuyer: string;
  projectTimeline: string;
}

interface FormErrors {
  location?: string;
  plotArea?: string;
  area?: string;
  type?: string;
  budget?: string;
  timeline?: string;
  complexity?: string;
  numberOfFloors?: string;
  architecturalStyle?: string;
  targetBuyer?: string;
  projectTimeline?: string;
  unitMix?: string;
}

export default function QualificationForm({
  onNext,
  onPrevious,
}: QualificationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    plotArea: "",
    plotAreaUnit: "sqft",
    area: "",
    areaUnit: "sqft",
    type: "",
    budget: "",
    timeline: "",
    complexity: "",
    numberOfFloors: "",
    unitMix: { "2bhk": 0, "3bhk": 0, "4bhk": 0 },
    architecturalStyle: "",
    amenities: [],
    targetBuyer: "",
    projectTimeline: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const dispatch = useAppDispatch();
  const token =
    useAppSelector((state) => state.auth.token) ||
    localStorage.getItem("token");
  const projectId = useAppSelector((state) => state.procurement?.project?.id);
  const { qualificationSubmitting } = useAppSelector(
    (state) => state.procurement
  );

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "location":
        return !value ? "Project location is required" : "";
      case "plotArea":
        return !value || Number(value) <= 0
          ? "Plot area must be greater than 0"
          : "";
      case "area":
        return !value || Number(value) <= 0
          ? "Built-up area must be greater than 0"
          : "";
      case "type":
        return !value ? "Construction type is required" : "";
      case "budget":
        return !value || Number(value) <= 0
          ? "Budget must be greater than 0"
          : "";
      case "timeline":
        return !value || Number(value) <= 0
          ? "Timeline must be greater than 0 months"
          : "";
      case "complexity":
        return !value ? "Project complexity is required" : "";
      case "numberOfFloors":
        return !value || Number(value) <= 0
          ? "Number of floors must be greater than 0"
          : "";
      case "architecturalStyle":
        return !value ? "Architectural style is required" : "";
      case "targetBuyer":
        return !value ? "Target buyer segment is required" : "";
      case "projectTimeline":
        return !value ? "Expected completion timeline is required" : "";
      case "unitMix":
        const unitMix = value as UnitMix;
        const totalUnits = unitMix["2bhk"] + unitMix["3bhk"] + unitMix["4bhk"];
        return totalUnits <= 0
          ? "At least one unit type must have a count greater than 0"
          : "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Basic information fields
    newErrors.location = validateField("location", formData.location);
    newErrors.plotArea = validateField("plotArea", formData.plotArea);
    newErrors.area = validateField("area", formData.area);
    newErrors.type = validateField("type", formData.type);
    newErrors.budget = validateField("budget", formData.budget);
    newErrors.timeline = validateField("timeline", formData.timeline);
    newErrors.complexity = validateField("complexity", formData.complexity);
    newErrors.numberOfFloors = validateField(
      "numberOfFloors",
      formData.numberOfFloors
    );

    // Detailed specifications fields
    newErrors.architecturalStyle = validateField(
      "architecturalStyle",
      formData.architecturalStyle
    );
    newErrors.targetBuyer = validateField("targetBuyer", formData.targetBuyer);
    newErrors.projectTimeline = validateField(
      "projectTimeline",
      formData.projectTimeline
    );
    newErrors.unitMix = validateField("unitMix", formData.unitMix);

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [formData, touched]);

  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const error = validateField(
      fieldName,
      formData[fieldName as keyof FormData]
    );
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleBasicInput = (id: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (touched[id]) {
      const error = validateField(id, value);
      setErrors((prev) => ({ ...prev, [id]: error }));
    }
  };

  const handleUnitChange = (unit: string, value: number) => {
    const newUnitMix = { ...formData.unitMix, [unit]: value } as UnitMix;
    setFormData({
      ...formData,
      unitMix: newUnitMix,
    });
    if (touched.unitMix) {
      const error = validateField("unitMix", newUnitMix);
      setErrors((prev) => ({ ...prev, unitMix: error }));
    }
  };

  const buildAnswersPayload = (data: FormData) => ({
    basic_information: {
      project_location: data.location,
      plot_area: {
        value: Number(data.plotArea),
        unit: data.plotAreaUnit,
      },
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
      amenities: data.amenities,
      target_buyer_segment: data.targetBuyer,
      number_of_floors: Number(data.numberOfFloors),

      expected_completion_timeline: data.projectTimeline,
    },
  });

  const handleSubmit = async () => {
    // Mark all fields as touched
    const allFields = [
      "location",
      "plotArea",
      "area",
      "type",
      "budget",
      "timeline",
      "complexity",
      "numberOfFloors",
      "architecturalStyle",
      "targetBuyer",
      "projectTimeline",
    ];
    const touchedFields: Record<string, boolean> = {};
    allFields.forEach((field) => (touchedFields[field] = true));
    touchedFields.unitMix = true;
    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    if (!token || !projectId) return;
    const answers = buildAnswersPayload(formData);
    console.log("Submitting answers:", answers);
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

  const handleAmenityToggle = (name: string) => {
    const exists = formData.amenities.find((a) => a.name === name);
    if (exists) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a.name !== name),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, { name, details: "" }],
      });
    }
  };

  const handleAmenityDetailsChange = (name: string, details: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.map((a) =>
        a.name === name ? { ...a, details } : a
      ),
    });
  };

  const getInputClassName = (fieldName: string) => {
    const hasError =
      errors[fieldName as keyof FormErrors] && touched[fieldName];
    return `w-full dark:bg-gray-700 dark:text-gray-100 ${
      hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
    }`;
  };

  const getSelectClassName = (fieldName: string) => {
    const hasError =
      errors[fieldName as keyof FormErrors] && touched[fieldName];
    return `w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${
      hasError ? "border-red-500" : ""
    }`;
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
          {Object.keys(errors).some(
            (key) => errors[key as keyof FormErrors]
          ) && (
            <div className="p-3 mt-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Please fill all required fields marked with errors
              </p>
            </div>
          )}
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
                    onBlur={() => handleBlur("location")}
                    placeholder="e.g., Pune, Mumbai, Hyderabad"
                    className={getInputClassName("location")}
                    required
                  />
                  {errors.location && touched.location && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Plot Area */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Plot Area *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={formData.plotArea}
                      onChange={(e) =>
                        handleBasicInput("plotArea", e.target.value)
                      }
                      onBlur={() => handleBlur("plotArea")}
                      placeholder="15000"
                      className={`flex-1 ${getInputClassName("plotArea")}`}
                      required
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
                        <input
                          type="radio"
                          name="plotAreaUnit"
                          value="sqft"
                          checked={formData.plotAreaUnit === "sqft"}
                          onChange={(e) =>
                            handleBasicInput("plotAreaUnit", e.target.value)
                          }
                        />
                        sqft
                      </label>
                      <label className="flex items-center gap-1 text-gray-900 dark:text-gray-100">
                        <input
                          type="radio"
                          name="plotAreaUnit"
                          value="sqm"
                          checked={formData.plotAreaUnit === "sqm"}
                          onChange={(e) =>
                            handleBasicInput("plotAreaUnit", e.target.value)
                          }
                        />
                        sqm
                      </label>
                    </div>
                  </div>
                  {errors.plotArea && touched.plotArea && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.plotArea}
                    </p>
                  )}
                </div>

                {/* Built-up Area */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Total Built-up Area *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleBasicInput("area", e.target.value)}
                      onBlur={() => handleBlur("area")}
                      placeholder="30000"
                      className={`flex-1 ${getInputClassName("area")}`}
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
                  {errors.area && touched.area && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.area}
                    </p>
                  )}
                </div>

                {/* Type - Select Input */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Construction Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleBasicInput("type", e.target.value)}
                    onBlur={() => handleBlur("type")}
                    className={getSelectClassName("type")}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Mixed-use">Mixed-use</option>
                  </select>
                  {errors.type && touched.type && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.type}
                    </p>
                  )}
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
                    onBlur={() => handleBlur("budget")}
                    placeholder="90000000"
                    className={getInputClassName("budget")}
                    required
                  />
                  {errors.budget && touched.budget && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.budget}
                    </p>
                  )}
                </div>

                {/* Number of Floors */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                    Number of Floors *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.numberOfFloors}
                    onChange={(e) =>
                      handleBasicInput("numberOfFloors", e.target.value)
                    }
                    onBlur={() => handleBlur("numberOfFloors")}
                    placeholder="e.g., 12"
                    className={getInputClassName("numberOfFloors")}
                    required
                  />
                  {errors.numberOfFloors && touched.numberOfFloors && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.numberOfFloors}
                    </p>
                  )}
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
                    onBlur={() => handleBlur("timeline")}
                    placeholder="12"
                    className={getInputClassName("timeline")}
                    required
                  />
                  {errors.timeline && touched.timeline && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.timeline}
                    </p>
                  )}
                </div>

                {/* Complexity */}
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
                    onBlur={() => handleBlur("complexity")}
                    placeholder="e.g., Medium, High, Standard"
                    className={getInputClassName("complexity")}
                    required
                  />
                  {errors.complexity && touched.complexity && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.complexity}
                    </p>
                  )}
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
                  Unit Mix *
                </label>
                <div className="grid gap-3 md:grid-cols-3">
                  {["2bhk", "3bhk", "4bhk"].map((unit) => (
                    <div
                      key={unit}
                      className={`flex items-center justify-between p-4 border rounded-lg dark:border-gray-600 ${
                        errors.unitMix && touched.unitMix
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200"
                      }`}
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
                        onBlur={() => handleBlur("unitMix")}
                        className={`w-20 px-3 py-2 text-center text-gray-900 bg-white border rounded-lg dark:bg-gray-700 dark:text-gray-100 ${
                          errors.unitMix && touched.unitMix
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
                {errors.unitMix && touched.unitMix && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.unitMix}
                  </p>
                )}
              </div>

              {/* Architectural Style */}
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
                  onBlur={() => handleBlur("architecturalStyle")}
                  placeholder="e.g., Modern Contemporary"
                  className={getInputClassName("architecturalStyle")}
                  required
                />
                {errors.architecturalStyle && touched.architecturalStyle && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.architecturalStyle}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter the architectural style (e.g., Modern Contemporary,
                  Traditional, etc.)
                </p>
              </div>

              {/* Amenities */}
              <div className="grid gap-4 mb-6 md:grid-cols-2">
                {[
                  "Parking",
                  "Swimming Pool",
                  "Gym/Fitness Center",
                  "Clubhouse",
                  "Children's Play Area",
                  "Landscaped Garden",
                  "Security Systems",
                ].map((amenity) => {
                  const selected = formData.amenities.find(
                    (a) => a.name === amenity
                  );
                  return (
                    <div
                      key={amenity}
                      className="p-4 border border-gray-200 rounded-lg dark:border-gray-600"
                    >
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!selected}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-3 font-medium text-gray-900 dark:text-gray-100">
                          {amenity}
                        </span>
                      </label>
                      {selected && (
                        <Input
                          type="text"
                          placeholder="Add details"
                          value={selected.details}
                          onChange={(e) =>
                            handleAmenityDetailsChange(amenity, e.target.value)
                          }
                          className="mt-3 dark:bg-gray-700 dark:text-gray-100"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Target Buyer */}
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
                  onBlur={() => handleBlur("targetBuyer")}
                  placeholder="e.g., Families"
                  className={getInputClassName("targetBuyer")}
                  required
                />
                {errors.targetBuyer && touched.targetBuyer && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.targetBuyer}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Enter target buyer segment (e.g., Families, Young
                  Professionals, etc.)
                </p>
              </div>

              {/* Project Timeline */}
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
                  onBlur={() => handleBlur("projectTimeline")}
                  placeholder="e.g., 18 months"
                  className={getInputClassName("projectTimeline")}
                  required
                />
                {errors.projectTimeline && touched.projectTimeline && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.projectTimeline}
                  </p>
                )}
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
              disabled={qualificationSubmitting}
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
