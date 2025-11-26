// src/components/VendorSearch.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { VENDOR_CERTIFICATIONS } from "../../../utils/constants";
import {
  Star,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  Building,
  Package,
} from "lucide-react";
import type { Vendor } from "../../../types";

/* --- ENHANCED SAMPLE VENDORS WITH SPECIALIZATIONS --- */
const sampleVendors: Vendor[] = [
  {
    id: "1",
    name: "Shree Cement Ltd.",
    type: "manufacturer",
    categories: ["Cement & Concrete"],
    specializations: [
      { item: "OPC 53 Grade Cement", category: "Cement" },
      { item: "PPC Cement", category: "Cement" },
      { item: "Ready Mix Concrete", category: "Concrete" },
    ],
    location: {
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      pincode: "411001",
    },
    certifications: ["ISO 9001", "BIS Certified", "Green Pro Certified"],
    rating: 4.8,
    totalProjects: 245,
    experience: 15,
    paymentTerms: ["30 Days Credit", "45 Days Credit"],
    minOrderValue: 500000,
    contact: {
      primary: {
        name: "Rajesh Sharma",
        email: "rajesh@shreecement.com",
        phone: "+91-9876543210",
        designation: "Sales Manager",
      },
    },
    performance: { onTimeDelivery: 95, qualityRating: 4.7, communication: 4.6 },
    source: "indiamart",
    createdAt: "2020-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "TATA Steel",
    type: "manufacturer",
    categories: ["Steel & Reinforcement"],
    specializations: [
      { item: "TOR Steel TMT Bars", category: "Steel" },
      { item: "Structural Steel", category: "Steel" },
      { item: "Rebar", category: "Steel" },
    ],
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      pincode: "400001",
    },
    certifications: ["ISO 9001", "ISO 14001", "BIS Certified"],
    rating: 4.9,
    totalProjects: 512,
    experience: 25,
    paymentTerms: ["45 Days Credit", "LC at Sight"],
    minOrderValue: 1000000,
    contact: {
      primary: {
        name: "Priya Singh",
        email: "priya.singh@tatasteel.com",
        phone: "+91-9876543211",
        designation: "Regional Manager",
      },
    },
    performance: { onTimeDelivery: 98, qualityRating: 4.8, communication: 4.7 },
    source: "tradeindia",
    createdAt: "2018-05-20",
    updatedAt: "2024-01-15",
  },
  {
    id: "3",
    name: "UltraTech Cement",
    type: "manufacturer",
    categories: ["Cement & Concrete"],
    specializations: [
      { item: "White Cement", category: "Cement" },
      { item: "Waterproof Cement", category: "Cement" },
      { item: "RMC Plants", category: "Concrete" },
    ],
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      pincode: "380001",
    },
    certifications: ["ISO 9001", "BIS Certified", "Green Pro Certified"],
    rating: 4.7,
    totalProjects: 389,
    experience: 20,
    paymentTerms: ["30 Days Credit", "Advance + Balance"],
    minOrderValue: 750000,
    contact: {
      primary: {
        name: "Amit Patel",
        email: "amit.patel@ultratech.com",
        phone: "+91-9876543212",
        designation: "Regional Head",
      },
    },
    performance: { onTimeDelivery: 96, qualityRating: 4.6, communication: 4.5 },
    source: "indiamart",
    createdAt: "2019-03-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Jindal Steel & Power",
    type: "manufacturer",
    categories: ["Steel & Reinforcement"],
    specializations: [
      { item: "TMT Bars", category: "Steel" },
      { item: "Structural Steel", category: "Steel" },
      { item: "Wire Rods", category: "Steel" },
    ],
    location: {
      city: "Raigarh",
      state: "Chhattisgarh",
      country: "India",
      pincode: "496001",
    },
    certifications: ["ISO 9001", "ISO 14001", "BIS Certified"],
    rating: 4.8,
    totalProjects: 421,
    experience: 22,
    paymentTerms: ["45 Days Credit", "LC at Sight"],
    minOrderValue: 1200000,
    contact: {
      primary: {
        name: "Vikram Singh",
        email: "vikram.singh@jindal.com",
        phone: "+91-9876543213",
        designation: "Sales Director",
      },
    },
    performance: { onTimeDelivery: 97, qualityRating: 4.7, communication: 4.6 },
    source: "tradeindia",
    createdAt: "2017-08-15",
    updatedAt: "2024-01-15",
  },
];

interface SelectedVendor {
  vendorId: string;
  items: string[];
  quantities: { [item: string]: number };
  specifications: { [item: string]: string };
}

interface VendorSearchProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const VendorSearch: React.FC<VendorSearchProps> = ({
  onNext,
  onPrevious,
}) => {
  const { dispatch, state } = useProcurement();
  const [vendors] = useState<Vendor[]>(sampleVendors);
  const [selectedVendors, setSelectedVendors] = useState<SelectedVendor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Get categories from current BOM
  const bomCategories =
    state.currentProject?.bom.map((item) => item.category) || [];
  const uniqueCategories = [...new Set(bomCategories)];

  // Filter vendors based on search and category
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specializations?.some((spec) =>
        String(spec.item).toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      !selectedCategory ||
      vendor.categories.some((cat) => cat.includes(selectedCategory));

    return matchesSearch && matchesCategory;
  });

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors((prev) => {
      const existing = prev.find((v) => v.vendorId === vendorId);
      if (existing) {
        return prev.filter((v) => v.vendorId !== vendorId);
      } else {
        const vendor = vendors.find((v) => v.id === vendorId);
        const defaultItems =
          vendor?.specializations?.map((spec) => String(spec.item)) || [];
        return [
          ...prev,
          {
            vendorId,
            items: defaultItems,
            quantities: {},
            specifications: {},
          },
        ];
      }
    });
  };

  const updateVendorItems = (vendorId: string, items: string[]) => {
    setSelectedVendors((prev) =>
      prev.map((vendor) =>
        vendor.vendorId === vendorId ? { ...vendor, items } : vendor
      )
    );
  };

  const updateItemQuantity = (
    vendorId: string,
    item: string,
    quantity: number
  ) => {
    setSelectedVendors((prev) =>
      prev.map((vendor) =>
        vendor.vendorId === vendorId
          ? {
              ...vendor,
              quantities: { ...vendor.quantities, [item]: quantity },
            }
          : vendor
      )
    );
  };

  const updateItemSpecification = (
    vendorId: string,
    item: string,
    spec: string
  ) => {
    setSelectedVendors((prev) =>
      prev.map((vendor) =>
        vendor.vendorId === vendorId
          ? {
              ...vendor,
              specifications: { ...vendor.specifications, [item]: spec },
            }
          : vendor
      )
    );
  };

  const isVendorSelected = (vendorId: string) => {
    return selectedVendors.some((v) => v.vendorId === vendorId);
  };

  const getSelectedVendor = (vendorId: string) => {
    return selectedVendors.find((v) => v.vendorId === vendorId);
  };

  const handleProceed = () => {
    const selectedVendorData = vendors
      .filter((v) => selectedVendors.some((sv) => sv.vendorId === v.id))
      .map((vendor) => {
        const selectedData = getSelectedVendor(vendor.id);
        return {
          ...vendor,
          selectedItems: selectedData?.items || [],
          quantities: selectedData?.quantities || {},
          specifications: selectedData?.specifications || {},
        };
      });

    dispatch({ type: "SET_VENDORS", payload: selectedVendorData });
    onNext();
  };

  const getVendorSpecializations = (vendor: Vendor) => {
    return vendor.specializations || [];
  };

  return (
    <Card className="w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
          Phase 5: Vendor Search & Item Selection
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
          Select vendors and specify items/quantities for procurement
        </p>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* ----- FILTER PANEL ----- */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <Card className="border border-gray-200 shadow-none dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-3 sm:p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100 sm:mb-4 sm:text-base">
                  Filters & Search
                </h3>

                <div className="space-y-4">
                  {/* Search */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Search Vendors/Items
                    </label>
                    <Input
                      type="text"
                      placeholder="Search by company or item..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full text-sm"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Material Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    >
                      <option value="">All Categories</option>
                      {uniqueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Minimum Rating
                    </label>
                    <select className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                      <option>4.0+</option>
                      <option>4.5+</option>
                      <option>4.8+</option>
                    </select>
                  </div>

                  {/* Experience Filter */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Experience
                    </label>
                    <select className="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100">
                      <option>5+ years</option>
                      <option>10+ years</option>
                      <option>15+ years</option>
                    </select>
                  </div>

                  {/* Certifications */}
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Certifications
                    </label>
                    <div className="space-y-1 overflow-y-auto max-h-32">
                      {VENDOR_CERTIFICATIONS.map((cert) => (
                        <label
                          key={cert}
                          className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                        >
                          <input
                            type="checkbox"
                            className="border-gray-300 rounded dark:border-gray-600"
                          />
                          <span className="ml-2">{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ----- VENDORS LIST ----- */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            {/* Selection Summary */}
            {selectedVendors.length > 0 && (
              <div className="p-4 mb-4 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-300">
                      Selected Vendors: {selectedVendors.length}
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {selectedVendors
                        .map((sv) => {
                          const vendor = vendors.find(
                            (v) => v.id === sv.vendorId
                          );
                          return vendor?.name;
                        })
                        .join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-800 dark:text-green-300">
                      {selectedVendors.reduce(
                        (total, sv) => total + sv.items.length,
                        0
                      )}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-400">
                      Items Selected
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {filteredVendors.map((vendor) => {
                const isSelected = isVendorSelected(vendor.id);
                const selectedData = getSelectedVendor(vendor.id);
                const specializations = getVendorSpecializations(vendor);

                return (
                  <Card
                    key={vendor.id}
                    className={`p-4 transition-all border ${
                      isSelected
                        ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:shadow-sm dark:hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        {/* Vendor Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-gray-400" />
                              <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-gray-100">
                                {vendor.name}
                              </h3>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                              <MapPin className="w-4 h-4 mr-1" />
                              {vendor.location.city}, {vendor.location.state}
                              <span className="mx-2 text-gray-500 dark:text-gray-400">
                                •
                              </span>
                              {vendor.experience} years experience
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {vendor.rating}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              ({vendor.totalProjects})
                            </span>
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {vendor.certifications.slice(0, 3).map((cert) => (
                            <span
                              key={cert}
                              className="inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>

                        {/* Item Selection - Only show if vendor is selected */}
                        {isSelected && (
                          <div className="p-3 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            <h4 className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                              <Package className="w-4 h-4" />
                              Select Items & Specify Quantities
                            </h4>
                            <div className="space-y-2">
                              {specializations.map((spec) => {
                                const isItemSelected =
                                  selectedData?.items.includes(
                                    String(spec.item)
                                  );
                                return (
                                  <div
                                    key={spec.item}
                                    className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg dark:border-gray-600"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isItemSelected}
                                      onChange={(e) => {
                                        const newItems = e.target.checked
                                          ? [
                                              ...(selectedData?.items || []),
                                              String(spec.item),
                                            ]
                                          : (selectedData?.items || []).filter(
                                              (item) =>
                                                item !== String(spec.item)
                                            );
                                        updateVendorItems(vendor.id, newItems);
                                      }}
                                      className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <div className="flex-1">
                                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {spec.item}
                                      </div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        Category: {spec.category}
                                      </div>
                                    </div>
                                    {isItemSelected && (
                                      <div className="flex gap-2">
                                        <Input
                                          type="number"
                                          placeholder="Qty"
                                          className="w-20 text-sm"
                                          value={
                                            selectedData?.quantities[
                                              spec.item
                                            ] || ""
                                          }
                                          onChange={(e) =>
                                            updateItemQuantity(
                                              vendor.id,
                                              String(spec.item),
                                              parseInt(e.target.value) || 0
                                            )
                                          }
                                        />
                                        <Input
                                          type="text"
                                          placeholder="Specifications"
                                          className="w-32 text-sm"
                                          value={
                                            selectedData?.specifications[
                                              spec.item
                                            ] || ""
                                          }
                                          onChange={(e) =>
                                            updateItemSpecification(
                                              vendor.id,
                                              String(spec.item),
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Performance Stats */}
                        <div className="grid grid-cols-3 gap-3 mt-3 text-xs sm:text-sm">
                          <div>
                            <div className="text-gray-600 dark:text-gray-300">
                              Delivery
                            </div>
                            <div className="font-semibold text-green-600 dark:text-green-400">
                              {vendor.performance.onTimeDelivery}%
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 dark:text-gray-300">
                              Quality
                            </div>
                            <div className="font-semibold text-blue-600 dark:text-blue-400">
                              {vendor.performance.qualityRating}/5
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 dark:text-gray-300">
                              Min Order
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                              ₹{vendor.minOrderValue.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex items-center mt-3 space-x-3 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {vendor.contact.primary.phone}
                          </div>
                          <div className="items-center hidden sm:flex">
                            <Mail className="w-4 h-4 mr-1" />
                            {vendor.contact.primary.email}
                          </div>
                        </div>
                      </div>

                      {/* Selection Checkbox */}
                      <div className="flex items-start ml-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleVendorSelection(vendor.id)}
                          className="w-5 h-5 text-blue-600 rounded sm:h-6 sm:w-6"
                        />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* AI Note */}
            <div className="p-4 mt-6 text-xs text-blue-700 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900 dark:border-blue-700 sm:text-sm dark:text-blue-200">
              <strong>AI Match Score:</strong> Vendors matched based on your
              project requirements. Select vendors and specify exact items with
              quantities for accurate RFP generation.
            </div>

            {/* Navigation */}
            <div className="flex flex-col justify-between gap-3 mt-6 sm:flex-row">
              <Button
                variant="outline"
                onClick={onPrevious}
                className="w-full sm:w-auto dark:border-gray-600 dark:hover:bg-gray-800"
              >
                ← Back
              </Button>
              <Button
                onClick={handleProceed}
                disabled={selectedVendors.length === 0}
                className={`w-full sm:w-auto ${
                  selectedVendors.length === 0
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                } dark:bg-blue-600 dark:hover:bg-blue-700`}
              >
                Generate RFPs{" "}
                {selectedVendors.length > 0
                  ? `(${
                      selectedVendors.length
                    } vendors, ${selectedVendors.reduce(
                      (total, sv) => total + sv.items.length,
                      0
                    )} items)`
                  : ""}{" "}
                →
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
