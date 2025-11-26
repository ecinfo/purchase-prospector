// src/components/RFPGenerator.tsx
import React from "react";
import {
  Package,
  FileText,
  ArrowLeft,
  ArrowRight,
  Building,
  MapPin,
  Star,
} from "lucide-react";
import { useProcurement } from "../../../contexts/ProcurementContext";

interface RFPGeneratorProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const RFPGenerator: React.FC<RFPGeneratorProps> = ({ onNext, onPrevious }) => {
  const { state } = useProcurement();

  // Get selected vendors from context
  const selectedVendors = state.currentProject?.vendors || [];

  // Generate RFP packages based on selected vendors and their items
  const generateRFPPackages = () => {
    if (!selectedVendors || selectedVendors.length === 0) {
      return [];
    }

    // Group items by category from selected vendors
    const categoryMap = new Map();

    selectedVendors.forEach((vendor) => {
      vendor.selectedItems?.forEach((itemName) => {
        const itemSpec = vendor.specializations?.find(
          (spec) => spec.item === itemName
        );
        const category = itemSpec?.category || "Other";

        if (!categoryMap.has(category)) {
          categoryMap.set(category, {
            id: `RFP-${category.replace(/\s+/g, "-").toUpperCase()}`,
            title: `${category} Package`,
            description: "",
            items: new Set(),
            vendors: new Set(),
            value: 0,
            category: category,
            itemDetails: [],
          });
        }

        const packageData = categoryMap.get(category);
        const quantity = vendor.quantities?.[itemName] || 1;
        const specifications = vendor.specifications?.[itemName] || "";

        packageData.items.add(itemName);
        packageData.vendors.add(vendor.id);
        packageData.itemDetails.push({
          item: itemName,
          vendor: vendor.name,
          quantity: quantity,
          specifications: specifications,
          vendorRating: vendor.rating,
          vendorId: vendor.id,
        });
      });
    });

    // Convert to array and calculate values
    return Array.from(categoryMap.values()).map((pkg) => {
      const estimatedValue = pkg.itemDetails.reduce((sum, item) => {
        // Simple estimation based on vendor rating and quantity
        const baseValue = item.quantity * 10000;
        return sum + baseValue * (item.vendorRating / 5);
      }, 0);

      return {
        ...pkg,
        items: pkg.items.size,
        vendors: pkg.vendors.size,
        value: estimatedValue,
        description: Array.from(pkg.items).join(", "),
        itemDetails: pkg.itemDetails,
      };
    });
  };

  const rfpPackages = generateRFPPackages();

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      const crores = amount / 10000000;
      return `₹${crores.toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      const lakhs = amount / 100000;
      return `₹${lakhs.toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const totalItems = rfpPackages.reduce((sum, pkg) => sum + pkg.items, 0);
  const totalVendors = rfpPackages.reduce((sum, pkg) => sum + pkg.vendors, 0);
  const totalValue = rfpPackages.reduce((sum, pkg) => sum + pkg.value, 0);

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                RFP Package Generation
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {selectedVendors.length > 0
                  ? `AI has grouped ${totalItems} items from ${selectedVendors.length} vendors into ${rfpPackages.length} optimized procurement packages`
                  : "No vendors selected. Please go back and select vendors."}
              </p>
            </div>
          </div>
        </div>

        {selectedVendors.length === 0 ? (
          <div className="p-8 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              No Vendors Selected
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Please go back to the vendor search phase to select vendors and
              items.
            </p>
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-6 py-2.5 mx-auto border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Back to Vendor Search
              </span>
            </button>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
              {[
                { label: "RFP Packages", value: rfpPackages.length },
                { label: "Total Items", value: totalItems },
                { label: "Selected Vendors", value: selectedVendors.length },
                { label: "Est. Value", value: formatCurrency(totalValue) },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-6 text-center bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="mb-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {c.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Vendors Summary */}
            <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Selected Vendors ({selectedVendors.length})
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {selectedVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg dark:border-gray-600"
                  >
                    <Building className="w-8 h-8 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {vendor.name}
                        </h4>
                        <div className="flex items-center text-sm text-yellow-600">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{vendor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {vendor.location.city}, {vendor.location.state}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {vendor.selectedItems?.length || 0} items selected •
                        Min. order: ₹{vendor.minOrderValue?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RFP Package Cards */}
            <div className="mb-6 space-y-4">
              {rfpPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900">
                      <Package className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {pkg.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {pkg.description}
                          </p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded dark:bg-gray-700">
                          {pkg.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-6 mt-3 text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          {pkg.items} items
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {pkg.vendors} vendors
                        </span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                          {formatCurrency(pkg.value)}
                        </span>
                      </div>

                      {/* Item Details */}
                      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Items in this package:
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            {pkg.category}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {pkg.itemDetails.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 text-sm rounded bg-gray-50 dark:bg-gray-700"
                            >
                              <div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {item.item}
                                </span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-gray-600 dark:text-gray-300">
                                  {item.vendor}
                                </span>
                                {item.specifications && (
                                  <>
                                    <span className="mx-2 text-gray-400">
                                      •
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      Spec: {item.specifications}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-gray-600 dark:text-gray-300">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RFP Features */}
            <div className="p-6 mb-6 border border-blue-200 rounded-lg dark:border-blue-800 bg-blue-50 dark:bg-blue-900">
              <h3 className="mb-3 text-sm font-semibold text-blue-900 dark:text-blue-200">
                RFP Features:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>
                  • Standardized technical specifications with quality
                  parameters
                </li>
                <li>
                  • Commercial terms template (payment, delivery, warranties)
                </li>
                <li>
                  • Clear evaluation criteria (40% cost, 30% quality, 30%
                  delivery)
                </li>
                <li>• Digital submission via web form</li>
                <li>• 5-day submission deadline with automated reminders</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
              <button
                onClick={onPrevious}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Back to Vendor Search
                </span>
              </button>

              <button
                onClick={onNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 dark:bg-blue-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors"
              >
                <span className="text-sm font-medium">
                  Approve & Start Vendor Outreach
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RFPGenerator;
