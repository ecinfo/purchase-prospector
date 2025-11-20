/* eslint-disable react-hooks/exhaustive-deps */
// src/components/features/procurement/BidCollection.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { formatCurrency } from "../../../utils/formatters";
import { Mail, Clock, CheckCircle } from "lucide-react";
import type { Bid } from "../../../types";

interface BidCollectionProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const BidCollection: React.FC<BidCollectionProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state, dispatch } = useProcurement();
  const [bids, setBids] = useState<Bid[]>([]);
  const [daysRemaining, setDaysRemaining] = useState(5);

  useEffect(() => {
    const simulate = async () => {
      if (!state.currentProject?.rfps.length) return;

      setBids([]);
      const vendors = state.currentProject.vendors;
      const rfps = state.currentProject.rfps;

      for (let day = 1; day <= 5; day++) {
        await new Promise((r) => setTimeout(r, 2000));
        setDaysRemaining(5 - day);

        const newBids: Bid[] = [];
        vendors.slice(0, Math.ceil(vendors.length * 0.3)).forEach((vendor) => {
          rfps.forEach((rfp) => {
            if (Math.random() > 0.5) {
              const totalAmount = rfp.bomItems.reduce((sum, item) => {
                const discount = 0.85 + Math.random() * 0.15;
                return sum + item.totalPrice * discount;
              }, 0);

              newBids.push({
                id: `bid-${vendor.id}-${rfp.id}-${day}`,
                vendorId: vendor.id,
                rfpId: rfp.id,
                totalAmount,
                breakdown: rfp.bomItems.map((item) => ({
                  itemId: item.id,
                  unitPrice: item.unitPrice * (0.85 + Math.random() * 0.15),
                  totalPrice: item.totalPrice * (0.85 + Math.random() * 0.15),
                })),
                deliveryTime: 20 + Math.floor(Math.random() * 20),
                qualityScore: 4 + Math.random() * 1,
                paymentTerms: "30% Advance, 70% on Delivery",
                status: "submitted",
              });
            }
          });
        });

        setBids((prev) => [...prev, ...newBids]);
      }
    };

    simulate();
  }, [state.currentProject?.rfps, state.currentProject?.vendors]);

  const handleProceed = () => {
    dispatch({ type: "SET_BIDS", payload: bids });
    onNext();
  };

  const getVendorName = (id: string) =>
    state.currentProject?.vendors.find((v) => v.id === id)?.name || "Unknown";

  const getCategory = (rfpId: string) =>
    state.currentProject?.rfps.find((r) => r.id === rfpId)?.bomItems[0]
      ?.category || "Unknown";

  const totalExpected =
    (state.currentProject?.vendors.length || 0) *
    (state.currentProject?.rfps.length || 0);

  const received = bids.length;
  const rate = totalExpected > 0 ? (received / totalExpected) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Phase 8: Bid Collection
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Tracking RFP responses from vendors
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="flex items-center justify-start sm:justify-end text-sm sm:text-lg font-semibold text-blue-600">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {daysRemaining} days remaining
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              RFP closing period
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        {/* STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {received}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Bids Received</p>
          </Card>

          <Card className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {Math.round(rate)}%
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Response Rate</p>
          </Card>

          <Card className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-purple-600">
              {state.currentProject?.vendors.length || 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Vendors Contacted
            </p>
          </Card>

          <Card className="p-3 sm:p-4 text-center">
            <div className="text-lg sm:text-2xl font-bold text-orange-600">
              {state.currentProject?.rfps.length || 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">RFP Packages</p>
          </Card>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-[900px] w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {[
                  "Vendor",
                  "RFP Category",
                  "Bid Amount",
                  "Delivery",
                  "Quality",
                  "Status",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids.map((bid) => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {getVendorName(bid.vendorId)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {getCategory(bid.rfpId)}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatCurrency(bid.totalAmount)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {bid.deliveryTime} days
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    <span className="font-semibold">
                      {bid.qualityScore.toFixed(1)}
                    </span>
                    <span className="text-yellow-500 ml-1 text-xs">/5</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" /> Submitted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {bids.length === 0 && (
          <div className="text-center py-10">
            <Mail className="h-14 w-14 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
              Awaiting Bids
            </h3>
            <p className="text-sm text-gray-600">
              Vendor responses will appear here once submitted.
            </p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="w-full sm:w-auto"
          >
            ← Back
          </Button>

          <Button
            onClick={handleProceed}
            disabled={daysRemaining > 0 || bids.length === 0}
            className={`w-full sm:w-auto ${
              daysRemaining > 0 || bids.length === 0
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            Analyze Bids & Optimize →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
