import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { VENDOR_CERTIFICATIONS } from "../../../utils/constants";
import { Star, MapPin, CheckCircle, Phone, Mail } from "lucide-react";
import type { Vendor } from "../../../types";

/* --- SAMPLE VENDORS (same as your data) --- */
const sampleVendors: Vendor[] = [
  // ... same vendor sample data
  {
    id: "1",
    name: "Shree Cement Ltd.",
    type: "manufacturer",
    categories: ["Cement & Concrete"],
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
];

interface VendorSearchProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const VendorSearch: React.FC<VendorSearchProps> = ({
  onNext,
  onPrevious,
}) => {
  const { dispatch } = useProcurement();
  const [vendors] = useState<Vendor[]>(sampleVendors);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const toggleVendorSelection = (vendorId: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleProceed = () => {
    const selectedVendorData = vendors.filter((v) =>
      selectedVendors.includes(v.id)
    );
    dispatch({ type: "SET_VENDORS", payload: selectedVendorData });
    onNext();
  };

  return (
    <Card className="w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <CardHeader className="p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
          Phase 5: Vendor Search
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 sm:text-base">
          AI-matched vendors from 6 integrated directories (2000+ vendors)
        </p>
      </CardHeader>

      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* ----- FILTER PANEL ----- */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <Card className="border border-gray-200 shadow-none dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-3 sm:p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100 sm:mb-4 sm:text-base">
                  Filters
                </h3>

                <div className="space-y-4">
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

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Certifications
                    </label>
                    <div className="space-y-1">
                      {VENDOR_CERTIFICATIONS.slice(0, 3).map((cert) => (
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
            <div className="grid grid-cols-1 gap-4">
              {vendors.map((vendor) => {
                const isSelected = selectedVendors.includes(vendor.id);
                return (
                  <Card
                    key={vendor.id}
                    className={`p-4 transition-all cursor-pointer border ${
                      isSelected
                        ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900"
                        : "border-gray-200 dark:border-gray-700 hover:shadow-sm dark:hover:bg-gray-800"
                    }`}
                    onClick={() => toggleVendorSelection(vendor.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        {/* Name + Rating */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-gray-100">
                            {vendor.name}
                          </h3>
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

                        {/* Location + Exp */}
                        <div className="flex items-center mt-1 text-xs text-gray-600 sm:text-sm dark:text-gray-300">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vendor.location.city}, {vendor.location.state}
                          <span className="mx-2 text-gray-500 dark:text-gray-400">
                            •
                          </span>
                          {vendor.experience} yrs
                        </div>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-1 mt-2">
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

                        {/* Stats */}
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

                        {/* Contact */}
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
              <strong>AI Match Score:</strong> Top vendors shortlisted from
              2000+ across IndiaMART, TradeIndia, Udaan, JustDial, and more.
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
                  ? `(${selectedVendors.length} selected)`
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
