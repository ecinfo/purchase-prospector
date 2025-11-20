// src/components/features/procurement/QuantificationView.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { estimateProjectCost } from "../../../utils/calculators";
import { formatCurrency, formatArea } from "../../../utils/formatters";

interface QuantificationViewProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const QuantificationView: React.FC<QuantificationViewProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state } = useProcurement();
  const requirement = state.currentProject?.requirement;

  if (!requirement) return null;

  const estimatedCost = estimateProjectCost(
    requirement.area,
    requirement.type,
    requirement.complexity
  );

  const specifications = [
    {
      label: "Project Type",
      value:
        requirement.type.charAt(0).toUpperCase() + requirement.type.slice(1),
    },
    { label: "Location", value: requirement.location },
    {
      label: "Built-up Area",
      value: formatArea(requirement.area, requirement.areaUnit),
    },
    {
      label: "Complexity",
      value:
        requirement.complexity.charAt(0).toUpperCase() +
        requirement.complexity.slice(1),
    },
    { label: "Timeline", value: `${requirement.timeline} months` },
    { label: "Estimated Cost", value: formatCurrency(estimatedCost) },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Phase 3: Project Quantification
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          AI-generated specifications based on your requirements
        </p>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {/* SPECS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {specifications.map((spec, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <dt className="text-xs sm:text-sm font-medium text-gray-600">
                {spec.label}
              </dt>
              <dd className="mt-1 text-base sm:text-lg font-semibold text-gray-900">
                {spec.value}
              </dd>
            </div>
          ))}
        </div>

        {/* AI ANALYSIS */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2 sm:mb-3">
            AI Analysis
          </h3>
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-800">
            <p>
              ✅ Based on {formatArea(requirement.area, requirement.areaUnit)}{" "}
              {requirement.type} project in {requirement.location}
            </p>
            <p>
              ✅ {requirement.complexity} complexity with a{" "}
              {requirement.timeline}-month timeline
            </p>
            <p>
              ✅ Estimated project cost:{" "}
              <strong>{formatCurrency(estimatedCost)}</strong>
            </p>
            <p>
              ✅ Potential savings: 15–25% (
              {formatCurrency(estimatedCost * 0.15)} –{" "}
              {formatCurrency(estimatedCost * 0.25)})
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full sm:w-auto"
          >
            ← Back
          </Button>
          <Button onClick={onNext} className="w-full sm:w-auto">
            Generate Bill of Materials →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
