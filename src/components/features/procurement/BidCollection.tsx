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

  // Make sure not to mutate state
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
    // Sort incoming bids by delay
    const sortedBids = [...allBids].sort((a, b) => a.delay - b.delay);

    const simulateBids = async () => {
      for (let i = 0; i < sortedBids.length; i++) {
        const bid = sortedBids[i];
        await new Promise((res) => setTimeout(res, bid.delay));
        if (isCancelled) return;

        setPackages((prev) => {
          return prev.map((pkg, idx) =>
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
          );
        });

        // Simulate passage of one project day after every few bids
        if ((i + 1) % 2 === 0 && currentDay < TOTAL_DAYS) {
          setCurrentDay((prev) => prev + 1);
          setDaysLeft((prev) => Math.max(prev - 1, 0));
        }
      }
      setIsSimulating(false);
      setDaysLeft(0);
      setCurrentDay(TOTAL_DAYS);
    };

    simulateBids();
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (amount: number) => {
    const crores = amount / 10000000;
    return `₹${crores.toFixed(1)} Cr`;
  };

  const totalReceived = packages.reduce((sum, pkg) => sum + pkg.bids.length, 0);
  const totalExpected = packages.reduce(
    (sum, pkg) => sum + pkg.totalExpected,
    0
  );
  const responseRate =
    totalExpected > 0 ? Math.round((totalReceived / totalExpected) * 100) : 0;

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Inbox className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bid Collection Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Tracking submissions for 4 RFP packages • Day {currentDay} of{" "}
                {TOTAL_DAYS}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              {totalReceived}
            </div>
            <div className="text-sm text-gray-600">Bids Received</div>
          </div>
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-gray-400">
              {Math.max(totalExpected - totalReceived, 0)}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-green-600">
              {responseRate}%
            </div>
            <div className="text-sm text-gray-600">Response Rate</div>
          </div>
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-orange-600">
              {daysLeft}
            </div>
            <div className="text-sm text-gray-600">Days Left</div>
          </div>
        </div>

        {/* Collection Progress */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900">
            Collection Progress
          </h3>
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-medium text-gray-900">
                {totalReceived} / {totalExpected} bids
              </span>
            </div>
            <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
              <div
                className="h-full transition-all duration-500 bg-gray-900"
                style={{ width: `${(totalReceived / totalExpected) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Package Sections */}
        <div className="space-y-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded">
                  {pkg.bids.length} / {pkg.totalExpected} bids
                </span>
              </div>

              <div className="space-y-2">
                {pkg.bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="flex items-center justify-between p-4 border border-green-200 rounded-lg bg-green-50"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {bid.vendor}
                        </div>
                        <div className="text-sm text-gray-600">
                          {bid.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(bid.amount)}
                    </div>
                  </div>
                ))}
                {pkg.bids.length === 0 && (
                  <div className="py-8 text-center text-gray-400">
                    <p className="text-sm">Awaiting bids...</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-6 mt-6 bg-white rounded-lg shadow-sm">
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
            <span className="text-sm font-medium">Proceed to Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidCollection;
