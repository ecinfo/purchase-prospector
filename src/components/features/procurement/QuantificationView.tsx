/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
      // Dummy fallback + real calculation
      const area = Number(requirement.area);
      const unitMix = (requirement as any).unitMix || {
        "2BHK": 0,
        "3BHK": 0,
        "4BHK": 0,
      };
      const amenities = (requirement as any).amenities || [];

      const totalUnits = Object.values(unitMix).reduce(
        (sum: number, count) => sum + Number(count),
        0
      );

      const carpetArea = Math.round(area * 0.8);
      const commonArea = Math.round(area * 0.15);
      const constructionArea = Math.round(area * 1.05);
      const fsiRatio = 2.5;

      const unitsPerFloor = Math.min(4, totalUnits);
      const floors =
        totalUnits > 0 ? Math.ceil(totalUnits / unitsPerFloor) : 10;

      const distribution = [];
      if (unitMix["2BHK"] > 0)
        distribution.push({ type: "2 BHK", count: unitMix["2BHK"] });
      if (unitMix["3BHK"] > 0)
        distribution.push({ type: "3 BHK", count: unitMix["3BHK"] });
      if (unitMix["4BHK"] > 0)
        distribution.push({ type: "4 BHK", count: unitMix["4BHK"] });

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
                { label: "Location", val: requirement.location },
                { label: "Project Type", val: requirement.type },
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
          </CardContent>
        </Card>

        {/* Infra */}
        <Card className="mb-6 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              🚗 Infrastructure & Amenities
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
            className="w-full text-gray-900 border-gray-300 sm:w-auto dark:border-gray-600 dark:text-black-100 hover:bg-gray-100 dark:hover:bg-gray-700"
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
