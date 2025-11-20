// src/components/features/procurement/BOMGenerator.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { calculateBOMTotal } from "../../../utils/calculators";
import { formatCurrency } from "../../../utils/formatters";
import type { BOMItem } from "../../../types";

interface BOMGeneratorProps {
  onNext: () => void;
  onPrevious: () => void;
}

const sampleBOM: BOMItem[] = [
  // same sample items...
  {
    id: "1",
    category: "Cement & Concrete",
    material: "OPC 53 Grade Cement",
    specification: "IS 12269, 50kg bags",
    quantity: 1500,
    unit: "bags",
    unitPrice: 380,
    totalPrice: 570000,
    priority: "high",
  },
  {
    id: "2",
    category: "Steel & Reinforcement",
    material: "TOR Steel TMT Bars",
    specification: "Fe 500, 12mm, IS 1786",
    quantity: 85,
    unit: "tons",
    unitPrice: 58000,
    totalPrice: 4930000,
    priority: "high",
  },
  {
    id: "3",
    category: "Bricks & Blocks",
    material: "Fly Ash Bricks",
    specification: "Size: 230x110x75 mm",
    quantity: 125000,
    unit: "pieces",
    unitPrice: 8,
    totalPrice: 1000000,
    priority: "medium",
  },
  {
    id: "4",
    category: "Sand & Aggregate",
    material: "River Sand",
    specification: "Coarse, Zone II",
    quantity: 450,
    unit: "tons",
    unitPrice: 1200,
    totalPrice: 540000,
    priority: "medium",
  },
  {
    id: "5",
    category: "Tiles & Sanitaryware",
    material: "Ceramic Floor Tiles",
    specification: "600x600 mm, Premium",
    quantity: 8500,
    unit: "sqft",
    unitPrice: 45,
    totalPrice: 382500,
    priority: "medium",
  },
];

export const BOMGenerator: React.FC<BOMGeneratorProps> = ({
  onNext,
  onPrevious,
}) => {
  const { dispatch } = useProcurement();
  const [bom] = useState<BOMItem[]>(sampleBOM);

  const handleApproveBOM = () => {
    dispatch({ type: "SET_BOM", payload: bom });
    onNext();
  };

  const totalCost = calculateBOMTotal(bom);

  return (
    <Card className="w-full">
      {/* Header */}
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Phase 4: Bill of Materials (BoM)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              AI-generated procurement list with specifications
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {formatCurrency(totalCost)}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Total Estimated Cost
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Table */}
      <CardContent className="p-2 sm:p-4">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-[900px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {[
                  "Category",
                  "Material",
                  "Specification",
                  "Quantity",
                  "Unit Price",
                  "Total Price",
                  "Priority",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-left text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {bom.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{item.material}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {item.specification}
                  </td>
                  <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                    {item.quantity.toLocaleString()} {item.unit}
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {formatCurrency(item.totalPrice)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full ${
                        item.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : item.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendation */}
        <div className="mt-6 p-4 sm:p-5 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
            <strong>AI Recommendation:</strong> This BoM is optimized for cost
            and quality. 24 line items generated across 8 categories.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full sm:w-auto"
          >
            ← Back
          </Button>
          <Button onClick={handleApproveBOM} className="w-full sm:w-auto">
            Search Vendors →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
