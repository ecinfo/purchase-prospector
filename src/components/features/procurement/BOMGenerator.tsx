import React, { useState } from "react";
import { Download, ChevronDown, ChevronRight, Package } from "lucide-react";

interface BOMGeneratorProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const BOMGenerator: React.FC<BOMGeneratorProps> = ({ onNext, onPrevious }) => {
  const [expandedSections, setExpandedSections] = useState({
    civil: true,
    mep: true,
    finishing: true,
    common: true,
  });

  const bomData = {
    civil: [
      {
        name: "Cement (OPC 53 Grade)",
        quantity: "12000",
        unit: "bags",
        spec: "ACC/UltraTech/Ambuja",
        phase: "Phase 1-3",
        unitPrice: 380,
        totalPrice: 4560000,
      },
      {
        name: "Steel TMT Bars (Fe 500D)",
        quantity: "450",
        unit: "MT",
        spec: "TATA/JSW, 8mm-25mm",
        phase: "Phase 1-3",
        unitPrice: 58000,
        totalPrice: 26100000,
      },
      {
        name: "Ready Mix Concrete (M25)",
        quantity: "2500",
        unit: "cu.m",
        spec: "Grade M25, slump 100-150mm",
        phase: "Phase 1-2",
        unitPrice: 4500,
        totalPrice: 11250000,
      },
      {
        name: "Aggregates (20mm)",
        quantity: "800",
        unit: "cu.m",
        spec: "Crushed stone",
        phase: "Phase 1-2",
        unitPrice: 1800,
        totalPrice: 1440000,
      },
      {
        name: "Sand (River/M-Sand)",
        quantity: "1200",
        unit: "cu.m",
        spec: "Grade II/III",
        phase: "Phase 1-3",
        unitPrice: 1200,
        totalPrice: 1440000,
      },
      {
        name: "Bricks (Fly Ash)",
        quantity: "250000",
        unit: "nos",
        spec: "230x110x75mm",
        phase: "Phase 2",
        unitPrice: 8,
        totalPrice: 2000000,
      },
    ],
    mep: [
      {
        name: "Copper Wire (2.5 sq.mm)",
        quantity: "15000",
        unit: "meters",
        spec: "Finolex/Polycab",
        phase: "Phase 2-3",
        unitPrice: 85,
        totalPrice: 1275000,
      },
      {
        name: "MCB Distribution Boards",
        quantity: "40",
        unit: "nos",
        spec: "Havells/Siemens, 12-way",
        phase: "Phase 3",
        unitPrice: 4500,
        totalPrice: 180000,
      },
      {
        name: 'CPVC Pipes (1/2" to 2")',
        quantity: "5000",
        unit: "meters",
        spec: "Astral/Ashirvad",
        phase: "Phase 2-3",
        unitPrice: 120,
        totalPrice: 600000,
      },
      {
        name: "Sanitary Fixtures Set",
        quantity: "40",
        unit: "sets",
        spec: "Hindware/Jaquar",
        phase: "Phase 3",
        unitPrice: 25000,
        totalPrice: 1000000,
      },
      {
        name: "AC Units (1.5 Ton Split)",
        quantity: "80",
        unit: "nos",
        spec: "Daikin/Voltas",
        phase: "Phase 3",
        unitPrice: 35000,
        totalPrice: 2800000,
      },
      {
        name: "Water Pumps (1 HP)",
        quantity: "4",
        unit: "nos",
        spec: "Crompton/Kirloskar",
        phase: "Phase 2",
        unitPrice: 8500,
        totalPrice: 34000,
      },
    ],
    finishing: [
      {
        name: "Vitrified Tiles (600x600mm)",
        quantity: "24000",
        unit: "sq.ft",
        spec: "Kajaria/Somany, 8-10mm",
        phase: "Phase 3",
        unitPrice: 65,
        totalPrice: 1560000,
      },
      {
        name: "Paint (Premium Emulsion)",
        quantity: "800",
        unit: "liters",
        spec: "Asian Paints/Berger",
        phase: "Phase 3",
        unitPrice: 450,
        totalPrice: 360000,
      },
      {
        name: "Wooden Doors (Main)",
        quantity: "40",
        unit: "nos",
        spec: "Teak/Engineered wood, 32mm",
        phase: "Phase 3",
        unitPrice: 15000,
        totalPrice: 600000,
      },
      {
        name: "UPVC Windows",
        quantity: "160",
        unit: "nos",
        spec: "Fenesta/Weatherseal, double glazed",
        phase: "Phase 2",
        unitPrice: 8500,
        totalPrice: 1360000,
      },
      {
        name: "Modular Kitchen (8x10 ft)",
        quantity: "40",
        unit: "sets",
        spec: "Godrej/Sleek, HDHMR",
        phase: "Phase 3",
        unitPrice: 85000,
        totalPrice: 3400000,
      },
      {
        name: "False Ceiling (Gypsum)",
        quantity: "8000",
        unit: "sq.ft",
        spec: "Saint-Gobain/Gyproc, 12mm",
        phase: "Phase 3",
        unitPrice: 95,
        totalPrice: 760000,
      },
    ],
    common: [
      {
        name: "Elevator (10-person capacity)",
        quantity: "2",
        unit: "nos",
        spec: "KONE/Otis",
        phase: "Phase 2",
        unitPrice: 1200000,
        totalPrice: 2400000,
      },
      {
        name: "Security Systems (CCTV)",
        quantity: "20",
        unit: "cameras",
        spec: "Hikvision/CP Plus",
        phase: "Phase 3",
        unitPrice: 8500,
        totalPrice: 170000,
      },
      {
        name: "Gym Equipment Set",
        quantity: "1",
        unit: "set",
        spec: "Complete commercial set",
        phase: "Phase 3",
        unitPrice: 500000,
        totalPrice: 500000,
      },
      {
        name: "Swimming Pool Filtration",
        quantity: "1",
        unit: "system",
        spec: "Pentair/Hayward",
        phase: "Phase 3",
        unitPrice: 350000,
        totalPrice: 350000,
      },
      {
        name: "Landscaping (Lawn)",
        quantity: "3000",
        unit: "sq.ft",
        spec: "Korean grass with drip irrigation",
        phase: "Phase 3",
        unitPrice: 120,
        totalPrice: 360000,
      },
      {
        name: "Generator (125 KVA)",
        quantity: "1",
        unit: "unit",
        spec: "Cummins/Kirloskar",
        phase: "Phase 2",
        unitPrice: 850000,
        totalPrice: 850000,
      },
    ],
  };

  const categoryInfo = {
    civil: { title: "Civil & Structural", count: 6 },
    mep: { title: "MEP (Mechanical, Electrical, Plumbing)", count: 6 },
    finishing: { title: "Finishing & Interiors", count: 6 },
    common: { title: "Common Area & Amenities", count: 6 },
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const totalCost = Object.values(bomData)
    .flat()
    .reduce((sum, item) => sum + item.totalPrice, 0);

  const toggleSection = (section: keyof typeof expandedSections) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const exportBOM = () => alert("Exporting BOM as CSV...");

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Bill of Materials (BoM)
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  AI-generated comprehensive procurement list with 24 line items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalCost)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  Total Estimated Cost
                </div>
              </div>
              <button
                onClick={exportBOM}
                className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Download className="w-4 h-4 dark:text-gray-200" />
                <span className="text-sm font-medium dark:text-gray-200">
                  Export BoM
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Summary Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
          {Object.entries(categoryInfo).map(([key, { title, count }]) => (
            <div
              key={key}
              className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-300">
                {count}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {title}
              </div>
            </div>
          ))}
        </div>

        {/* BOM Sections */}
        <div className="space-y-4">
          {Object.entries(bomData).map(([key, items]) => (
            <div
              key={key}
              className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              {/* Section Header */}
              <button
                onClick={() =>
                  toggleSection(key as keyof typeof expandedSections)
                }
                className="flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center gap-3">
                  {expandedSections[key as keyof typeof expandedSections] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-200" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-200" />
                  )}
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {categoryInfo[key as keyof typeof categoryInfo].title}
                  </h2>
                  <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded dark:text-gray-300 dark:bg-gray-700">
                    {categoryInfo[key as keyof typeof categoryInfo].count} items
                  </span>
                </div>
              </button>

              {/* Section Content */}
              {expandedSections[key as keyof typeof expandedSections] && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                        <tr>
                          {[
                            "Item Name",
                            "Quantity",
                            "Specification",
                            "Unit Price",
                            "Total Price",
                            "Delivery Phase",
                          ].map((head) => (
                            <th
                              key={head}
                              className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase dark:text-gray-300"
                            >
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {items.map((item, idx) => (
                          <tr
                            key={idx}
                            className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                              {parseInt(item.quantity).toLocaleString()}{" "}
                              {item.unit}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                              {item.spec}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                              {formatCurrency(item.unitPrice)}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {formatCurrency(item.totalPrice)}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                                {item.phase}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-between p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-200"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-blue-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors"
          >
            Proceed to Vendor Discovery →
          </button>
        </div>
      </div>
    </div>
  );
};

export default BOMGenerator;
