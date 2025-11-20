/* eslint-disable react-hooks/exhaustive-deps */
// src/components/features/procurement/RFPGenerator.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { formatCurrency } from "../../../utils/formatters";
import { Package, FileText } from "lucide-react";
import type { BOMItem, RFP } from "../../../types";

interface RFPGeneratorProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const RFPGenerator: React.FC<RFPGeneratorProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state, dispatch } = useProcurement();
  const [rfps, setRfps] = useState<RFP[]>([]);

  const generateRFPs = () => {
    if (!state.currentProject) return;

    const bomGroups: { [key: string]: BOMItem[] } = {};
    state.currentProject.bom.forEach((item) => {
      if (!bomGroups[item.category]) bomGroups[item.category] = [];
      bomGroups[item.category].push(item);
    });

    const generatedRFPs: RFP[] = Object.entries(bomGroups).map(
      ([category, items], index) => ({
        id: `rfp-${index + 1}`,
        bomItems: items,
        vendors: state.currentProject!.vendors.filter((v) =>
          v.categories.some((cat) => cat.includes(category.split(" ")[0]))
        ),
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        terms:
          "Standard payment terms: 30% advance, 70% on delivery. Delivery within 30 days from PO. Quality standards as per IS specifications.",
        status: "draft",
      })
    );

    setRfps(generatedRFPs);
  };

  const handleApproveRFPs = () => {
    dispatch({ type: "SET_RFPS", payload: rfps });
    onNext();
  };

  React.useEffect(() => {
    if (
      state.currentProject?.bom.length &&
      state.currentProject?.vendors.length
    ) {
      generateRFPs();
    }
  }, [state.currentProject?.bom, state.currentProject?.vendors]);

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Phase 6: RFP Generation
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          AI-grouped BoM items into optimized RFP packages
        </p>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        {/* RFP Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {rfps.map((rfp) => (
            <Card
              key={rfp.id}
              className="p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                    {rfp.bomItems[0]?.category}
                  </h3>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {rfp.bomItems.length} items
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Value:</span>
                  <span className="font-semibold">
                    {formatCurrency(
                      rfp.bomItems.reduce(
                        (sum, item) => sum + item.totalPrice,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vendors:</span>
                  <span className="font-semibold">
                    {rfp.vendors.length} qualified
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-semibold">
                    {new Date(rfp.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-1">
                  Items Included:
                </h4>
                <div className="space-y-1 text-xs">
                  {rfp.bomItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-600 truncate">
                        {item.material}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </div>
                  ))}
                  {rfp.bomItems.length > 3 && (
                    <div className="text-gray-500">
                      +{rfp.bomItems.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Summary */}
        {rfps.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <h4 className="font-semibold text-green-900 text-sm sm:text-base">
                  RFP Generation Complete
                </h4>
                <p className="text-xs sm:text-sm text-green-700 mt-1 leading-relaxed">
                  {rfps.length} RFP packages created, optimized for vendor
                  specialization and competitive bidding. Total value:{" "}
                  {formatCurrency(
                    rfps.reduce(
                      (sum, rfp) =>
                        sum +
                        rfp.bomItems.reduce(
                          (itemSum, item) => itemSum + item.totalPrice,
                          0
                        ),
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full sm:w-auto"
          >
            ← Back
          </Button>

          <Button
            onClick={handleApproveRFPs}
            disabled={rfps.length === 0}
            className={`w-full sm:w-auto ${
              rfps.length === 0 ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            Start Vendor Outreach →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
