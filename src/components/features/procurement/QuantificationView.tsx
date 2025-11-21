/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/features/procurement/QuantificationView.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";

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
    amenities: string[];
  };
  projectDetails: {
    architecturalStyle: string;
    targetBuyer: string;
    projectTimeline: string;
    budgetRange: number;
  };
}

export const QuantificationView: React.FC<QuantificationViewProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state, dispatch } = useProcurement();
  const requirement = state.currentProject?.requirement;

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(
    null
  );
  const [editValues, setEditValues] = useState<any>({});

  useEffect(() => {
    if (requirement) {
      // Calculate specifications based on qualification form data
      const area = Number(requirement.area);
      const unitMix = (requirement as any).unitMix || {
        "2BHK": 0,
        "3BHK": 0,
        "4BHK": 0,
      };
      const amenities = (requirement as any).amenities || [];

      // Calculate total units
      const totalUnits = Object.values(unitMix).reduce(
        (sum: number, count) => sum + Number(count),
        0
      );

      // Calculate areas
      const carpetArea = Math.round(area * 0.8);
      const commonArea = Math.round(area * 0.15);
      const constructionArea = Math.round(area * 1.05);
      const fsiRatio = 2.5;

      // Calculate unit configuration
      const unitsPerFloor = Math.min(4, totalUnits);
      const floors =
        totalUnits > 0 ? Math.ceil(totalUnits / unitsPerFloor) : 10;

      // Build unit distribution
      const distribution = [];
      if (unitMix["2BHK"] > 0)
        distribution.push({ type: "2 BHK", count: unitMix["2BHK"] });
      if (unitMix["3BHK"] > 0)
        distribution.push({ type: "3 BHK", count: unitMix["3BHK"] });
      if (unitMix["4BHK"] > 0)
        distribution.push({ type: "4 BHK", count: unitMix["4BHK"] });

      // Calculate parking based on units
      const coveredParking = totalUnits > 0 ? totalUnits : 40;
      const openParking = totalUnits > 0 ? Math.round(totalUnits * 0.5) : 20;

      setCalculatedData({
        buildableArea: {
          total: area,
          carpet: carpetArea,
          common: commonArea,
          construction: constructionArea,
          fsi: fsiRatio,
        },
        unitConfig: {
          floors,
          unitsPerFloor,
          total: totalUnits || 40,
          distribution:
            distribution.length > 0
              ? distribution
              : [{ type: "2 BHK", count: 40 }],
        },
        infrastructure: {
          coveredParking,
          openParking,
          amenities,
        },
        projectDetails: {
          architecturalStyle:
            (requirement as any).architecturalStyle || "Modern Contemporary",
          targetBuyer: (requirement as any).targetBuyer || "Families",
          projectTimeline: (requirement as any).projectTimeline || "24 months",
          budgetRange: (requirement as any).budgetRange || 0,
        },
      });
    }
  }, [requirement]);

  if (!requirement || !calculatedData) return null;

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

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleApprove = () => {
    // Save the calculated data to context
    dispatch({
      type: "UPDATE_REQUIREMENT",
      payload: {
        ...requirement,
        calculatedSpecs: calculatedData,
      } as any,
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
    const isCurrentlyEditing = isEditing === `${section}-${field}`;

    return (
      <div className="flex items-center justify-between py-2 border-b border-gray-100 group">
        <span className="text-sm text-gray-700">{label}</span>
        <div className="flex items-center gap-2">
          {isCurrentlyEditing ? (
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
                className="w-32 px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={() => handleSave(section, field)}
                className="p-1 text-green-600 rounded hover:bg-green-50"
              >
                <svg
                  className="w-4 h-4"
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
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 rounded hover:bg-red-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold text-gray-900">
                {typeof value === "number" ? value.toLocaleString() : value}{" "}
                {suffix}
              </span>
              <button
                onClick={() => handleEdit(section, field)}
                className="p-1 text-blue-600 transition-opacity rounded opacity-0 group-hover:opacity-100 hover:bg-blue-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center w-full min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <div className="w-full max-w-4xl">
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Phase 3: AI Quantification Results
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            AI has analyzed your requirements and calculated project
            specifications
          </p>
          <div className="inline-flex items-center px-3 py-1 mt-2 text-xs font-medium text-blue-700 rounded-full bg-blue-50">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Human-In-the-Loop: Review & Approve
          </div>
        </div> */}

        {/* Project Summary */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <h3 className="flex items-center font-semibold text-gray-900">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Project Summary
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="mb-1 text-xs text-gray-600">Location</div>
                <div className="text-sm font-semibold text-gray-900">
                  {requirement.location}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="mb-1 text-xs text-gray-600">Project Type</div>
                <div className="text-sm font-semibold text-gray-900 capitalize">
                  {requirement.type}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="mb-1 text-xs text-gray-600">
                  Architectural Style
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {calculatedData.projectDetails.architecturalStyle}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="mb-1 text-xs text-gray-600">Target Buyer</div>
                <div className="text-sm font-semibold text-gray-900">
                  {calculatedData.projectDetails.targetBuyer}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buildable Area Breakdown */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <h3 className="flex items-center font-semibold text-gray-900">
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
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Buildable Area Breakdown
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
              label="Total Carpet Area"
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
              label="Total Construction Area"
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

        {/* Unit Configuration */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <h3 className="flex items-center font-semibold text-gray-900">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Unit Configuration
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
            <div className="p-4 mt-2 border border-blue-100 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="mb-3 text-xs font-semibold tracking-wide text-blue-900 uppercase">
                Unit Mix Distribution
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {calculatedData.unitConfig.distribution.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm"
                  >
                    <div className="mr-3">
                      <div className="mb-1 text-xs text-gray-600">
                        {item.type}
                      </div>
                      <div className="text-lg font-bold text-blue-900">
                        {item.count}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">units</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure & Amenities */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <h3 className="flex items-center font-semibold text-gray-900">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Infrastructure & Amenities
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <EditableField
              section="infrastructure"
              field="coveredParking"
              label="Covered Parking"
              value={calculatedData.infrastructure.coveredParking}
              suffix="spaces"
            />
            <EditableField
              section="infrastructure"
              field="openParking"
              label="Open Parking"
              value={calculatedData.infrastructure.openParking}
              suffix="spaces"
            />
            {calculatedData.infrastructure.amenities.length > 0 && (
              <div className="pt-2 border-t border-gray-100">
                <div className="mb-2 text-xs font-medium text-gray-600">
                  Included Amenities
                </div>
                <div className="flex flex-wrap gap-2">
                  {calculatedData.infrastructure.amenities.map(
                    (amenity, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 rounded-full bg-green-50"
                      >
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {amenity}
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
            className="w-full sm:w-auto"
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
            Back to Qualification
          </Button>
          <Button
            onClick={handleApprove}
            className="w-full bg-gray-900 sm:w-auto hover:bg-gray-800"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Approve & Generate BoM
          </Button>
        </div>
      </div>
    </div>
  );
};
