// src/components/features/procurement/VendorSearch.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useProcurement } from "../../../contexts/ProcurementContext";
import { VENDOR_CERTIFICATIONS } from "../../../utils/constants";
import { Star, MapPin, CheckCircle, Phone, Mail } from "lucide-react";
import type { Vendor } from "../../../types";

interface VendorSearchProps {
  onNext: () => void;
  onPrevious: () => void;
}

const sampleVendors: Vendor[] = [
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
    performance: {
      onTimeDelivery: 95,
      qualityRating: 4.7,
      communication: 4.6,
    },
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
    performance: {
      onTimeDelivery: 98,
      qualityRating: 4.8,
      communication: 4.7,
    },
    source: "tradeindia",
    createdAt: "2018-05-20",
    updatedAt: "2024-01-15",
  },
];

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
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-900">
          Phase 5: Vendor Search
        </h2>
        <p className="text-gray-600">
          AI-matched vendors from 6 integrated directories (2000+ vendors)
        </p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>4.0+</option>
                      <option>4.5+</option>
                      <option>4.8+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>5+ years</option>
                      <option>10+ years</option>
                      <option>15+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certifications
                    </label>
                    <div className="space-y-2">
                      {VENDOR_CERTIFICATIONS.slice(0, 3).map((cert) => (
                        <label key={cert} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {cert}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vendor List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4">
              {vendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className={`p-4 transition-all ${
                    selectedVendors.includes(vendor.id)
                      ? "ring-2 ring-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleVendorSelection(vendor.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {vendor.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">
                            {vendor.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({vendor.totalProjects} projects)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {vendor.location.city}, {vendor.location.state}
                        <span className="mx-2">•</span>
                        {vendor.experience} years experience
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {vendor.certifications.slice(0, 3).map((cert) => (
                          <span
                            key={cert}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {cert}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <div className="text-gray-600">On-time Delivery</div>
                          <div className="font-semibold text-green-600">
                            {vendor.performance.onTimeDelivery}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Quality Rating</div>
                          <div className="font-semibold text-blue-600">
                            {vendor.performance.qualityRating}/5
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Min Order</div>
                          <div className="font-semibold text-gray-900">
                            ₹{vendor.minOrderValue.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center mt-3 space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {vendor.contact.primary.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {vendor.contact.primary.email}
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={selectedVendors.includes(vendor.id)}
                        onChange={() => toggleVendorSelection(vendor.id)}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>AI Match Score:</strong> 95% - Top 6 vendors
                    selected from 2000+ database across IndiaMART, TradeIndia,
                    Udaan, JustDial, Google Business, and ConstructConnect.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={onPrevious}>
                ← Back
              </Button>
              <Button
                onClick={handleProceed}
                disabled={selectedVendors.length === 0}
              >
                Generate RFPs ({selectedVendors.length} selected) →
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
