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
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Phase 4: Bill of Materials
            </h2>
            <p className="text-gray-600">
              AI-generated procurement list with specifications
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalCost)}
            </div>
            <div className="text-sm text-gray-500">Total Estimated Cost</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bom.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.material}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.specification}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.quantity.toLocaleString()} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(item.totalPrice)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>AI Recommendation:</strong> This BoM is optimized for
                cost and quality. 24 line items generated across 8 categories.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={onPrevious}>
            ← Back
          </Button>
          <Button onClick={handleApproveBOM}>Search Vendors →</Button>
        </div>
      </CardContent>
    </Card>
  );
};
