/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchProjectQuantification } from "../../../store/slices/procuremnetSlice";

interface QuantificationViewProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface CalculatedData {
  buildableArea: {
    total: number;
    carpet: number;
    common: number;
    construction: number;
    fsi: number;
  };
  unitConfig: {
    floors: number;
    unitsPerFloor: number;
    total: number;
    distribution: Array<{ type: string; count: number }>;
  };
  infrastructure: {
    coveredParking: number;
    openParking: number;
    visitorParking: number;
    totalParking: number;
    amenities: string[];
  };
  projectDetails: {
    architecturalStyle: string;
    targetBuyer: string;
    projectTimeline: string;
    budgetRange: number;
    location: string;
    projectType: string;
  };
}

// Mapper function to convert API response to UI state
const mapQuantificationToCalculatedData = (
  quantData: any,
  projectSummary: any[]
): CalculatedData => {
  const buildable = quantData.schema_sections?.find(
    (s: any) => s.section_key === "buildable_area"
  );

  const unitConfig = quantData.schema_sections?.find(
    (s: any) => s.section_key === "unit_configuration"
  );

  const parking = quantData.amenity_sections?.find(
    (a: any) => a.name === "Parking"
  );

  // Extract project details from project_summary
  const basicInfo = projectSummary?.find(
    (s: any) => s.message_master__title === "Basic Information"
  );
  const detailedSpecs = projectSummary?.find(
    (s: any) => s.message_master__title === "Detailed Specifications"
  );

  // Parse unit mix distribution
  const unitMixStr = unitConfig?.fields["Unit Mix Distribution"]?.value || "";
  const unitMixArray = unitMixStr
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);

  // Get actual counts from detailed specs
  const unitMixCounts = detailedSpecs?.user_responses?.unit_mix || {};
  const distribution = unitMixArray.map((type: string) => {
    const key = type.toLowerCase().replace(/\s+/g, "");
    return {
      type: type.toUpperCase(),
      count: unitMixCounts[key] || 0,
    };
  });

  return {
    buildableArea: {
      total: buildable?.fields["Total Buildable Area"]?.value || 0,
      carpet: buildable?.fields["Carpet Area"]?.value || 0,
      common: buildable?.fields["Common Area"]?.value || 0,
      construction: buildable?.fields["Construction Area"]?.value || 0,
      fsi: buildable?.fields["FSI Utilization"]?.value || 0,
    },
    unitConfig: {
      floors: unitConfig?.fields["Number of Floors"]?.value || 0,
      unitsPerFloor: unitConfig?.fields["Units per Floor"]?.value || 0,
      total: unitConfig?.fields["Total Units"]?.value || 0,
      distribution: distribution.length > 0 ? distribution : [],
    },
    infrastructure: {
      totalParking: parking?.fields["Total Parking Spaces"]?.value || 0,
      coveredParking: parking?.fields["Covered Parking Spaces"]?.value || 0,
      visitorParking: parking?.fields["Visitor Parking Spaces"]?.value || 0,
      openParking:
        (parking?.fields["Total Parking Spaces"]?.value || 0) -
        (parking?.fields["Covered Parking Spaces"]?.value || 0),
      amenities: quantData.amenity_sections?.map((a: any) => a.name) || [],
    },
    projectDetails: {
      location: basicInfo?.user_responses?.project_location || "",
      projectType: basicInfo?.user_responses?.construction_type || "",
      architecturalStyle:
        detailedSpecs?.user_responses?.architectural_style ||
        "Modern Contemporary",
      targetBuyer:
        detailedSpecs?.user_responses?.target_buyer_segment || "Families",
      projectTimeline:
        detailedSpecs?.user_responses?.expected_completion_timeline ||
        "18 months",
      budgetRange: basicInfo?.user_responses?.estimated_budget || 0,
    },
  };
};

export const QuantificationView: React.FC<QuantificationViewProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state } = useProcurement();
  const requirement = state.currentProject?.requirement;

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(
    null
  );
  const [editValues, setEditValues] = useState<any>({});
  const dispatch = useAppDispatch();

  const token =
    useAppSelector((state) => state.auth.token) ||
    localStorage.getItem("token");

  const projectId = useAppSelector((state) => state.procurement.project?.id);
  const { quantification, quantificationLoading, quantificationError } =
    useAppSelector((state) => state.procurement);

  // Fetch quantification data on mount
  useEffect(() => {
    if (projectId && token) {
      dispatch(fetchProjectQuantification({ projectId, token }));
    }
  }, [projectId, token]);

  // Map API data to UI state when quantification loads
  useEffect(() => {
    const quantOutput = (quantification as any)?.quant_output;
    const projectSummary = (quantification as any)?.project_summary;

    if (quantOutput && projectSummary) {
      const mapped = mapQuantificationToCalculatedData(
        quantOutput,
        projectSummary
      );
      setCalculatedData(mapped);
    }
  }, [quantification]);

  // Loading state
  if (quantificationLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Loading quantification data...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (quantificationError) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="p-6 text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold text-red-600 dark:text-red-400">
            Failed to Load Quantification
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {quantificationError}
          </p>
          <Button onClick={onPrevious} variant="outline">
            ← Go Back
          </Button>
        </div>
      </div>
    );
  }

  // No data state
  if (!calculatedData) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No quantification data available
          </p>
          <Button onClick={onPrevious} variant="outline" className="mt-4">
            ← Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = (section: string, field: string) => {
    setIsEditing(`${section}-${field}`);
    setEditValues({
      ...editValues,
      [`${section}-${field}`]: (calculatedData as any)[section][field],
    });
  };

  const handleSave = (section: string, field: string) => {
    setCalculatedData({
      ...calculatedData,
      [section]: {
        ...(calculatedData as any)[section],
        [field]: editValues[`${section}-${field}`],
      },
    });
    setIsEditing(null);
  };

  const handleCancel = () => setIsEditing(null);

  const handleApprove = () => {
    dispatch({
      type: "UPDATE_REQUIREMENT",
      payload: { ...requirement, calculatedSpecs: calculatedData } as any,
    });
    onNext();
  };

  const EditableField = ({
    section,
    field,
    label,
    value,
    suffix = "",
    type = "number",
  }: {
    section: string;
    field: string;
    label: string;
    value: any;
    suffix?: string;
    type?: string;
  }) => {
    const editing = isEditing === `${section}-${field}`;

    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 group">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <input
                type={type}
                value={editValues[`${section}-${field}`]}
                onChange={(e) =>
                  setEditValues({
                    ...editValues,
                    [`${section}-${field}`]:
                      type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
                className="w-32 px-2 py-1 text-sm bg-white border border-blue-500 rounded dark:bg-gray-800 dark:border-blue-400 dark:text-gray-100"
                autoFocus
              />
              <button
                onClick={() => handleSave(section, field)}
                className="p-1 text-green-600 rounded dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900"
              >
                ✔
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 rounded dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900"
              >
                ✖
              </button>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {typeof value === "number" ? value.toLocaleString() : value}{" "}
                {suffix}
              </span>
              <button
                onClick={() => handleEdit(section, field)}
                className="p-1 text-blue-600 transition-opacity rounded opacity-0 dark:text-blue-400 group-hover:opacity-100 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                ✎
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center w-full min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-4xl">
        {/* Project Summary */}
        <Card className="mb-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="flex items-center font-semibold text-gray-900 dark:text-gray-100">
              🏗️ Project Summary
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  label: "Location",
                  val: calculatedData.projectDetails.location,
                },
                {
                  label: "Project Type",
                  val: calculatedData.projectDetails.projectType,
                },
                {
                  label: "Architectural Style",
                  val: calculatedData.projectDetails.architecturalStyle,
                },
                {
                  label: "Target Buyer",
                  val: calculatedData.projectDetails.targetBuyer,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="mb-1 text-xs text-gray-600 dark:text-gray-300">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 capitalize dark:text-gray-100">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Buildable Area */}
        <Card className="mb-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              📐 Buildable Area
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <EditableField
              section="buildableArea"
              field="total"
              label="Total Buildable Area"
              value={calculatedData.buildableArea.total}
              suffix="sq.ft"
            />
            <EditableField
              section="buildableArea"
              field="carpet"
              label="Carpet Area"
              value={calculatedData.buildableArea.carpet}
              suffix="sq.ft"
            />
            <EditableField
              section="buildableArea"
              field="common"
              label="Common Area"
              value={calculatedData.buildableArea.common}
              suffix="sq.ft"
            />
            <EditableField
              section="buildableArea"
              field="construction"
              label="Construction Area"
              value={calculatedData.buildableArea.construction}
              suffix="sq.ft"
            />
            <EditableField
              section="buildableArea"
              field="fsi"
              label="FSI Utilization"
              value={calculatedData.buildableArea.fsi}
              suffix="ratio"
            />
          </CardContent>
        </Card>

        {/* Unit Config */}
        <Card className="mb-4 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              🏢 Unit Configuration
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <EditableField
              section="unitConfig"
              field="floors"
              label="Number of Floors"
              value={calculatedData.unitConfig.floors}
              suffix="floors"
            />
            <EditableField
              section="unitConfig"
              field="unitsPerFloor"
              label="Units per Floor"
              value={calculatedData.unitConfig.unitsPerFloor}
              suffix="units"
            />
            <EditableField
              section="unitConfig"
              field="total"
              label="Total Units"
              value={calculatedData.unitConfig.total}
              suffix="units"
            />

            {/* Distribution */}
            {calculatedData.unitConfig.distribution.length > 0 && (
              <div className="p-4 mt-2 border border-blue-200 rounded-lg dark:border-blue-700 bg-blue-50 dark:bg-gray-700/50">
                <div className="mb-3 text-xs font-semibold tracking-wide text-blue-900 uppercase dark:text-blue-300">
                  Unit Mix Distribution
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {calculatedData.unitConfig.distribution.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="mr-3">
                        <div className="mb-1 text-xs text-gray-600 dark:text-gray-300">
                          {item.type}
                        </div>
                        <div className="text-lg font-bold text-blue-900 dark:text-blue-300">
                          {item.count}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        units
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card className="mb-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              🚗 Infrastructure & Amenities
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <EditableField
              section="infrastructure"
              field="totalParking"
              label="Total Parking Spaces"
              value={calculatedData.infrastructure.totalParking}
              suffix="spaces"
            />
            <EditableField
              section="infrastructure"
              field="coveredParking"
              label="Covered Parking"
              value={calculatedData.infrastructure.coveredParking}
              suffix="spaces"
            />
            <EditableField
              section="infrastructure"
              field="visitorParking"
              label="Visitor Parking"
              value={calculatedData.infrastructure.visitorParking}
              suffix="spaces"
            />
            {calculatedData.infrastructure.amenities.length > 0 && (
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                  Included Amenities
                </div>
                <div className="flex flex-wrap gap-2">
                  {calculatedData.infrastructure.amenities.map(
                    (amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 rounded-full bg-green-50 dark:bg-green-900 dark:text-green-300"
                      >
                        ✔ {amenity}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full text-gray-900 border-gray-300 sm:w-auto dark:border-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ← Back to Qualification
          </Button>
          <Button
            onClick={handleApprove}
            className="w-full text-white bg-gray-900 sm:w-auto dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700"
          >
            Approve & Generate BoM →
          </Button>
        </div>
      </div>
    </div>
  );
};
