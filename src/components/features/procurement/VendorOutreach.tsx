/* eslint-disable react-hooks/exhaustive-deps */
// src/components/features/procurement/VendorOutreach.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { Phone, CheckCircle, Clock, XCircle } from "lucide-react";

interface VendorOutreachProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface OutreachStatus {
  vendorId: string;
  vendorName: string;
  contact: string;
  status: "pending" | "contacted" | "interested" | "not-interested";
  timestamp?: string;
  notes?: string;
}

export const VendorOutreach: React.FC<VendorOutreachProps> = ({
  onNext,
  onPrevious,
}) => {
  const { state } = useProcurement();
  const [outreachStatus, setOutreachStatus] = useState<OutreachStatus[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);

  useEffect(() => {
    if (!state.currentProject?.vendors.length) return;

    const initialStatus: OutreachStatus[] = state.currentProject.vendors.map(
      (vendor) => ({
        vendorId: vendor.id,
        vendorName: vendor.name,
        contact: vendor.contact.primary.phone,
        status: "pending",
      })
    );

    setOutreachStatus(initialStatus);

    const simulateOutreach = async () => {
      setIsSimulating(true);

      for (let i = 0; i < initialStatus.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 900));

        setOutreachStatus((prev) => {
          const updated = [...prev];
          updated[i] = {
            ...updated[i],
            status: "contacted",
            timestamp: new Date().toISOString(),
          };
          return updated;
        });

        setTimeout(() => {
          setOutreachStatus((prev) => {
            const updated = [...prev];
            const isInterested = Math.random() > 0.3;
            updated[i] = {
              ...updated[i],
              status: isInterested ? "interested" : "not-interested",
              notes: isInterested
                ? "Confirmed interest, awaiting RFP"
                : "Not taking new projects currently",
            };
            return updated;
          });
        }, 1300);
      }

      setIsSimulating(false);
    };

    simulateOutreach();
  }, [state.currentProject?.vendors]);

  const getStatusIcon = (status: OutreachStatus["status"]) => {
    switch (status) {
      case "interested":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "not-interested":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "contacted":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const statusBadge = (status: OutreachStatus["status"]) => {
    const colors: Record<string, string> = {
      interested: "bg-green-100 text-green-800",
      "not-interested": "bg-red-100 text-red-800",
      contacted: "bg-yellow-100 text-yellow-800",
      pending: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  const interestedCount = outreachStatus.filter(
    (v) => v.status === "interested"
  ).length;
  const total = outreachStatus.length;

  return (
    <Card className="w-full">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Phase 7: Vendor Outreach
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Automated vendor interest collection via phone calls
        </p>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        {isSimulating && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-900 text-sm sm:text-base">
                  Outreach in Progress
                </h4>
                <p className="text-xs sm:text-sm text-blue-700 mt-1">
                  AI calling vendors and collecting interest…
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VENDOR ROWS */}
        <div className="space-y-3 sm:space-y-4 mb-6">
          {outreachStatus.map((vendor) => (
            <div
              key={vendor.vendorId}
              className="p-3 sm:p-4 border border-gray-200 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(vendor.status)}
                <div>
                  <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                    {vendor.vendorName}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {vendor.contact}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <span
                  className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusBadge(
                    vendor.status
                  )}`}
                >
                  {vendor.status.replace("-", " ")}
                </span>

                {vendor.notes && (
                  <span className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-0">
                    {vendor.notes}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY BOX */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-green-900">
                Outreach Summary
              </h4>
              <p className="text-xs sm:text-sm text-green-700 mt-1">
                {interestedCount} of {total} vendors interested (
                {Math.round((interestedCount / total) * 100)}% response rate)
              </p>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {Math.round((interestedCount / total) * 100)}%
              </div>
              <p className="text-xs sm:text-sm text-green-700">Response Rate</p>
            </div>
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

          <Button
            onClick={onNext}
            disabled={isSimulating || interestedCount === 0}
            className={`w-full sm:w-auto ${
              isSimulating || interestedCount === 0
                ? "opacity-60 cursor-not-allowed"
                : ""
            }`}
          >
            Distribute RFPs ({interestedCount}) →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
