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
    // Simulate bid collection over 5 days
    const simulateBidCollection = async () => {
      if (!state.currentProject?.rfps.length) return;

      // Initial empty state
      setBids([]);

      // Simulate bids coming in over time
      const vendors = state.currentProject.vendors;
      const rfps = state.currentProject.rfps;

      for (let day = 1; day <= 5; day++) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setDaysRemaining(5 - day);

        // Add some bids for this day
        const newBids: Bid[] = [];
        vendors.slice(0, Math.ceil(vendors.length * 0.3)).forEach((vendor) => {
          rfps.forEach((rfp) => {
            if (Math.random() > 0.5) {
              // 50% chance per vendor per RFP
              const totalAmount = rfp.bomItems.reduce((sum, item) => {
                const discount = 0.85 + Math.random() * 0.15; // 0-15% discount
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

    simulateBidCollection();
  }, [state.currentProject?.rfps, state.currentProject?.vendors]);

  const handleProceed = () => {
    dispatch({ type: "SET_BIDS", payload: bids });
    onNext();
  };

  const getVendorName = (vendorId: string) => {
    return (
      state.currentProject?.vendors.find((v) => v.id === vendorId)?.name ||
      "Unknown Vendor"
    );
  };

  const getRFPCategory = (rfpId: string) => {
    return (
      state.currentProject?.rfps.find((r) => r.id === rfpId)?.bomItems[0]
        ?.category || "Unknown Category"
    );
  };

  const totalExpectedBids =
    (state.currentProject?.vendors.length || 0) *
    (state.currentProject?.rfps.length || 0);
  const receivedBids = bids.length;
  const bidRate =
    totalExpectedBids > 0 ? (receivedBids / totalExpectedBids) * 100 : 0;

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Phase 8: Bid Collection
            </h2>
            <p className="text-gray-600">Tracking RFP responses from vendors</p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-lg font-semibold text-blue-600">
              <Clock className="h-5 w-5 mr-2" />
              {daysRemaining} days remaining
            </div>
            <div className="text-sm text-gray-500">RFP closing period</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Bid Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {receivedBids}
            </div>
            <div className="text-sm text-gray-600">Bids Received</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(bidRate)}%
            </div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {state.currentProject?.vendors.length || 0}
            </div>
            <div className="text-sm text-gray-600">Vendors Contacted</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {state.currentProject?.rfps.length || 0}
            </div>
            <div className="text-sm text-gray-600">RFP Packages</div>
          </Card>
        </div>

        {/* Bids Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  RFP Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bid Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quality Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bids.map((bid) => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getVendorName(bid.vendorId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getRFPCategory(bid.rfpId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(bid.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {bid.deliveryTime} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {bid.qualityScore.toFixed(1)}
                      </span>
                      <span className="text-yellow-500 ml-1">/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Submitted
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bids.length === 0 && (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Awaiting Bids
            </h3>
            <p className="text-gray-600">
              Vendor responses will appear here as they submit their bids.
            </p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onPrevious}>
            ← Back
          </Button>
          <Button
            onClick={handleProceed}
            disabled={daysRemaining > 0 || bids.length === 0}
          >
            Analyze Bids & Optimize →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
