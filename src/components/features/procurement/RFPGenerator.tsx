import React from "react";
import { Package, FileText, ArrowLeft, ArrowRight } from "lucide-react";

interface RFPGeneratorProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const RFPGenerator: React.FC<RFPGeneratorProps> = ({ onNext, onPrevious }) => {
  const rfpPackages = [
    {
      id: "RFP-001",
      title: "Civil Materials Package",
      description: "Cement, Steel, RMC, Aggregates, Sand, Bricks",
      items: 6,
      vendors: 3,
      value: 25000000,
      category: "Civil & Structural",
    },
    {
      id: "RFP-002",
      title: "MEP Systems Package",
      description:
        "Electrical wiring, MCBs, Plumbing, Sanitary, AC units, Pumps",
      items: 6,
      vendors: 2,
      value: 18000000,
      category: "MEP",
    },
    {
      id: "RFP-003",
      title: "Interior Finishing Package",
      description: "Tiles, Paint, Doors, Windows, Kitchen, False ceiling",
      items: 6,
      vendors: 2,
      value: 32000000,
      category: "Finishing & Interiors",
    },
    {
      id: "RFP-004",
      title: "Amenities & Infrastructure",
      description:
        "Elevators, Security systems, Gym, Pool, Landscaping, Generator",
      items: 6,
      vendors: 2,
      value: 15000000,
      category: "Common Area & Amenities",
    },
  ];

  const formatCurrency = (amount: number) => {
    const crores = amount / 10000000;
    return `₹${crores.toFixed(1)} Cr`;
  };

  const totalItems = rfpPackages.reduce((sum, pkg) => sum + pkg.items, 0);
  const totalVendors = rfpPackages.reduce((sum, pkg) => sum + pkg.vendors, 0);
  const totalValue = rfpPackages.reduce((sum, pkg) => sum + pkg.value, 0);

  return (
    <div className="min-h-screen p-4 bg-gray-50 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                RFP Package Generation
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                AI has grouped BoM items into {rfpPackages.length} optimized
                procurement packages
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              {rfpPackages.length}
            </div>
            <div className="text-sm text-gray-600">RFP Packages</div>
          </div>
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              {totalItems}
            </div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              {totalVendors}
            </div>
            <div className="text-sm text-gray-600">Target Vendors</div>
          </div>
          <div className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="mb-2 text-4xl font-bold text-blue-600">
              {formatCurrency(totalValue)}
            </div>
            <div className="text-sm text-gray-600">Est. Value</div>
          </div>
        </div>

        {/* RFP Package Cards */}
        <div className="mb-6 space-y-4">
          {rfpPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {pkg.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {pkg.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded">
                      {pkg.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{pkg.items} items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        {pkg.vendors} vendors
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(pkg.value)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {pkg.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RFP Features */}
        <div className="p-6 mb-6 border border-blue-200 rounded-lg bg-blue-50">
          <h3 className="mb-3 text-sm font-semibold text-blue-900">
            RFP Features:
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              • Standardized technical specifications with quality parameters
            </li>
            <li>• Commercial terms template (payment, delivery, warranties)</li>
            <li>
              • Clear evaluation criteria (40% cost, 30% quality, 30% delivery)
            </li>
            <li>• Digital submission via web form</li>
            <li>• 5-day submission deadline with automated reminders</li>
          </ul>
        </div>

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
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span className="text-sm font-medium">
              Approve & Start Vendor Outreach
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RFPGenerator;
