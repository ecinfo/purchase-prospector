import React, { useState, useEffect } from "react";
import { Inbox, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

interface BidCollectionProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

interface Bid {
  id: string;
  vendor: string;
  amount: number;
  timestamp: string;
  qualityScore: number;
  deliveryTime: number;
}

interface PackageBids {
  name: string;
  bids: Bid[];
  totalExpected: number;
}

const BidCollection: React.FC<BidCollectionProps> = ({
  onNext,
  onPrevious,
}) => {
  const TOTAL_DAYS = 5;
  const [currentDay, setCurrentDay] = useState(1);
  const [daysLeft, setDaysLeft] = useState(TOTAL_DAYS);
  const [isSimulating, setIsSimulating] = useState(true);

  const [packages, setPackages] = useState<PackageBids[]>([
    { name: "Civil Materials Package", totalExpected: 3, bids: [] },
    { name: "MEP Systems Package", totalExpected: 3, bids: [] },
    { name: "Interior Finishing Package", totalExpected: 3, bids: [] },
    { name: "Amenities & Infrastructure", totalExpected: 3, bids: [] },
  ]);

  const allBids = [
    {
      packageIndex: 0,
      vendor: "Mumbai Cement Suppliers",
      amount: 23000000,
      delay: 2000,
      qualityScore: 92,
      deliveryTime: 25,
    },
    {
      packageIndex: 1,
      vendor: "Royal Electricals",
      amount: 17000000,
      delay: 3000,
      qualityScore: 95,
      deliveryTime: 22,
    },
    {
      packageIndex: 0,
      vendor: "Pune Steel Trading",
      amount: 24000000,
      delay: 4000,
      qualityScore: 88,
      deliveryTime: 30,
    },
    {
      packageIndex: 2,
      vendor: "Premium Tiles World",
      amount: 30000000,
      delay: 5000,
      qualityScore: 88,
      deliveryTime: 28,
    },
    {
      packageIndex: 3,
      vendor: "Modern Interiors Hub",
      amount: 14000000,
      delay: 6000,
      qualityScore: 90,
      deliveryTime: 24,
    },
    {
      packageIndex: 0,
      vendor: "BuildMart Supplies",
      amount: 23500000,
      delay: 7000,
      qualityScore: 85,
      deliveryTime: 27,
    },
    {
      packageIndex: 1,
      vendor: "Elite Plumbing Systems",
      amount: 17500000,
      delay: 8000,
      qualityScore: 87,
      deliveryTime: 26,
    },
    {
      packageIndex: 2,
      vendor: "Premium Tiles World",
      amount: 31000000,
      delay: 9000,
      qualityScore: 90,
      deliveryTime: 29,
    },
    {
      packageIndex: 3,
      vendor: "TechLift Elevators",
      amount: 14500000,
      delay: 10000,
      qualityScore: 88,
      deliveryTime: 26,
    },
  ];

  useEffect(() => {
    let isCancelled = false;
    const sortedBids = [...allBids].sort((a, b) => a.delay - b.delay);

    const simulate = async () => {
      for (let i = 0; i < sortedBids.length; i++) {
        const bid = sortedBids[i];
        await new Promise((r) => setTimeout(r, bid.delay));
        if (isCancelled) return;

        setPackages((prev) =>
          prev.map((pkg, idx) =>
            idx === bid.packageIndex
              ? {
                  ...pkg,
                  bids: [
                    ...pkg.bids,
                    {
                      id: `bid-${Date.now()}-${Math.random()}`,
                      vendor: bid.vendor,
                      amount: bid.amount,
                      timestamp: "Just now",
                      qualityScore: bid.qualityScore,
                      deliveryTime: bid.deliveryTime,
                    },
                  ],
                }
              : pkg
          )
        );

        if ((i + 1) % 2 === 0 && currentDay < TOTAL_DAYS) {
          setCurrentDay((p) => p + 1);
          setDaysLeft((p) => Math.max(p - 1, 0));
        }
      }
      setIsSimulating(false);
    };

    simulate();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (amount: number) =>
    `₹${(amount / 10000000).toFixed(1)} Cr`;

  const totalReceived = packages.reduce((s, p) => s + p.bids.length, 0);
  const totalExpected = packages.reduce((s, p) => s + p.totalExpected, 0);
  const responseRate = Math.round((totalReceived / totalExpected) * 100);

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Inbox className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Bid Collection Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Tracking submissions for 4 RFP packages • Day {currentDay} of{" "}
                {TOTAL_DAYS}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          {[
            {
              label: "Bids Received",
              value: totalReceived,
              color: "text-blue-600",
            },
            {
              label: "Pending",
              value: Math.max(totalExpected - totalReceived, 0),
              color: "text-gray-400",
            },
            {
              label: "Response Rate",
              value: `${responseRate}%`,
              color: "text-green-600",
            },
            { label: "Days Left", value: daysLeft, color: "text-orange-600" },
          ].map((c, i) => (
            <div
              key={i}
              className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className={`mb-2 text-4xl font-bold ${c.color}`}>
                {c.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-200">
            Collection Progress
          </h3>
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Overall Progress
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-200">
              {totalReceived} / {totalExpected} bids
            </span>
          </div>
          <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-full transition-all duration-500 bg-gray-900 dark:bg-blue-500"
              style={{ width: `${(totalReceived / totalExpected) * 100}%` }}
            />
          </div>
        </div>

        {/* Packages */}
        <div className="space-y-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-200">
                  {pkg.name}
                </h3>
                <span className="px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded dark:bg-blue-600">
                  {pkg.bids.length} / {pkg.totalExpected} bids
                </span>
              </div>

              <div className="space-y-2">
                {pkg.bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex items-center justify-between p-4 border border-green-200 rounded-lg dark:border-green-800 bg-green-50 dark:bg-green-900"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {bid.vendor}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {bid.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-300">
                      {formatCurrency(bid.amount)}
                    </div>
                  </div>
                ))}

                {pkg.bids.length === 0 && (
                  <div className="py-8 text-center text-gray-400 dark:text-gray-500">
                    <p className="text-sm">Awaiting bids...</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 mt-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Back
            </span>
          </button>

          <button
            onClick={onNext}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${
              isSimulating
                ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gray-900 dark:bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700"
            }`}
          >
            <span className="text-sm font-medium">Proceed to Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidCollection;
