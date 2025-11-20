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

    // Initialize outreach status
    const initialStatus: OutreachStatus[] = state.currentProject.vendors.map(
      (vendor) => ({
        vendorId: vendor.id,
        vendorName: vendor.name,
        contact: vendor.contact.primary.phone,
        status: "pending",
      })
    );

    setOutreachStatus(initialStatus);

    // Simulate automated outreach process
    const simulateOutreach = async () => {
      setIsSimulating(true);

      for (let i = 0; i < initialStatus.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setOutreachStatus((prev) => {
          const updated = [...prev];
          updated[i] = {
            ...updated[i],
            status: "contacted",
            timestamp: new Date().toISOString(),
          };
          return updated;
        });

        // Simulate response after delay
        setTimeout(() => {
          setOutreachStatus((prev) => {
            const updated = [...prev];
            const isInterested = Math.random() > 0.3; // 70% interested rate
            updated[i] = {
              ...updated[i],
              status: isInterested ? "interested" : "not-interested",
              notes: isInterested
                ? "Confirmed interest, awaiting RFP"
                : "Not taking new projects currently",
            };
            return updated;
          });
        }, 2000);
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

  const getStatusColor = (status: OutreachStatus["status"]) => {
    switch (status) {
      case "interested":
        return "bg-green-100 text-green-800";
      case "not-interested":
        return "bg-red-100 text-red-800";
      case "contacted":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const interestedVendors = outreachStatus.filter(
    (v) => v.status === "interested"
  ).length;
  const totalVendors = outreachStatus.length;

  const handleProceed = () => {
    onNext();
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">
          Phase 7: Vendor Outreach
        </h2>
        <p className="text-gray-600">
          Automated vendor interest collection via phone calls
        </p>
      </CardHeader>

      <CardContent>
        {isSimulating && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-900">
                  Automated Outreach in Progress
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Making automated calls to vendors to collect interest...
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {outreachStatus.map((vendor) => (
            <div
              key={vendor.vendorId}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(vendor.status)}
                <div>
                  <h4 className="font-medium text-gray-900">
                    {vendor.vendorName}
                  </h4>
                  <p className="text-sm text-gray-600">{vendor.contact}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    vendor.status
                  )}`}
                >
                  {vendor.status.replace("-", " ")}
                </span>
                {vendor.notes && (
                  <span className="text-sm text-gray-600">{vendor.notes}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-900">Outreach Summary</h4>
              <p className="text-sm text-green-700 mt-1">
                {interestedVendors} out of {totalVendors} vendors interested (
                {Math.round((interestedVendors / totalVendors) * 100)}% response
                rate)
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((interestedVendors / totalVendors) * 100)}%
              </div>
              <div className="text-sm text-green-700">Response Rate</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevious}>
            ← Back
          </Button>
          <Button
            onClick={handleProceed}
            disabled={isSimulating || interestedVendors === 0}
          >
            Distribute RFPs ({interestedVendors} vendors) →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
