// src/components/features/vendors/VendorDirectory.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { VendorCard } from "./VendorCard";
import { VendorFilters } from "./VendorFilters";
import { type Vendor } from "../../../types";
import { Search, Filter, Download } from "lucide-react";

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
  // Add more sample vendors as needed
];

export const VendorDirectory: React.FC = () => {
  const [vendors] = useState<Vendor[]>(sampleVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.categories.some((cat) =>
        cat.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      vendor.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Directory</h1>
          <p className="text-gray-600">
            2,148 certified construction suppliers
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export List
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search vendors by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <VendorFilters />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-2">No vendors found</div>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Directory Sources */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            Integrated Vendor Directories
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              "IndiaMART",
              "TradeIndia",
              "Udaan",
              "JustDial",
              "Google Business",
              "ConstructConnect",
            ].map((source) => (
              <div key={source} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{source}</div>
                <div className="text-sm text-gray-600">
                  {source === "IndiaMART" && "450+ vendors"}
                  {source === "TradeIndia" && "320+ vendors"}
                  {source === "Udaan" && "180+ vendors"}
                  {source === "JustDial" && "280+ vendors"}
                  {source === "Google Business" && "600+ vendors"}
                  {source === "ConstructConnect" && "150+ vendors"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
