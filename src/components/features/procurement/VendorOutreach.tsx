import React, { useState, useEffect } from "react";
import {
  Phone,
  CheckCircle,
  X,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface VendorOutreachProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

interface Vendor {
  id: string;
  name: string;
  email: string;
  status: "pending" | "calling" | "interested" | "declined";
  note: string;
}

const VendorOutreach: React.FC<VendorOutreachProps> = ({
  onNext,
  onPrevious,
}) => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Mumbai Cement Suppliers Pvt Ltd",
      email: "contact@mumbaicement.com",
      status: "pending",
      note: "Interested, requested RFP details",
    },
    {
      id: "2",
      name: "Pune Steel Trading Co.",
      email: "sales@punesteel.com",
      status: "pending",
      note: "Confirmed interest, will review RFP",
    },
    {
      id: "3",
      name: "Royal Electricals & MEP Solutions",
      email: "info@royalelectricals.com",
      status: "pending",
      note: "Interested, asked for site visit",
    },
    {
      id: "4",
      name: "Elite Plumbing Systems",
      email: "",
      status: "pending",
      note: "Currently at capacity, declined",
    },
    {
      id: "5",
      name: "Premium Tiles & Sanitary World",
      email: "sales@premiumtiles.com",
      status: "pending",
      note: "Very interested, ready to quote",
    },
    {
      id: "6",
      name: "Modern Interiors Hub",
      email: "contact@moderninteriors.com",
      status: "pending",
      note: "Interested, requested timeline details",
    },
  ]);

  const [isSimulating, setIsSimulating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentCall, setCurrentCall] = useState(0);

  useEffect(() => {
    const simulateCalls = async () => {
      setIsSimulating(true);

      for (let i = 0; i < vendors.length; i++) {
        setCurrentCall(i);
        setProgress((i / vendors.length) * 100);

        // Mark as calling
        setVendors((prev) =>
          prev.map((v, idx) =>
            idx === i ? { ...v, status: "calling" as const } : v
          )
        );

        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Update to final status
        setVendors((prev) =>
          prev.map((v, idx) => {
            if (idx === i) {
              return {
                ...v,
                status:
                  v.id === "4"
                    ? ("declined" as const)
                    : ("interested" as const),
              };
            }
            return v;
          })
        );

        setProgress(((i + 1) / vendors.length) * 100);
      }

      setIsSimulating(false);
    };

    simulateCalls();
  }, []);

  const interestedCount = vendors.filter(
    (v) => v.status === "interested"
  ).length;
  const totalCount = vendors.length;

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        {/* AI Call Script */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                AI Call Script
              </h3>
            </div>
          </div>

          <div className="p-4 text-sm leading-relaxed text-gray-700 border-l-4 border-blue-500 rounded-md bg-gray-50">
            <p className="mb-2">
              <strong>
                Hello, this is an automated call from Purchase Prospector
              </strong>{" "}
              on behalf of <strong>[Your Company]</strong>.
            </p>
            <p className="mb-2">
              We have a residential construction project in{" "}
              <strong>Pune/Mumbai</strong> and would like to invite you to
              submit a proposal.
            </p>
            <p className="mb-2">
              <strong>
                Are you interested in receiving our RFP documentation?
              </strong>{" "}
              If yes, please provide your email address.
            </p>
            <p>
              The <strong>RFP submission deadline is 5 days from today.</strong>{" "}
              Thank you for your time.
            </p>
          </div>
        </div>

        {/* Progress or Success Message */}
        {isSimulating ? (
          <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 border-2 border-blue-600 rounded-full border-t-transparent animate-spin" />
              <span className="font-medium text-gray-900">
                Calling Vendors...
              </span>
            </div>
            <div className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500 bg-gray-900"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-center text-gray-600">
              {currentCall + 1} of {totalCount} calls completed
            </p>
          </div>
        ) : (
          <div className="p-6 mb-6 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center gap-3">
              <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">
                  Outreach Complete: {interestedCount} vendors interested
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Email addresses collected and ready for RFP distribution
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Call Results */}
        {!isSimulating && (
          <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Call Results</h3>
            <div className="space-y-3">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="p-4 transition-colors border border-gray-200 rounded-lg hover:border-gray-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {vendor.status === "interested" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-medium text-gray-900">
                          {vendor.name}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                            vendor.status === "interested"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {vendor.status === "interested"
                            ? "Interested"
                            : "Declined"}
                        </span>
                      </div>
                      {vendor.email && (
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{vendor.email}</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-600">{vendor.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <button
            onClick={onNext}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${
              isSimulating
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            <span className="text-sm font-medium">
              Proceed to RFP Distribution
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorOutreach;
