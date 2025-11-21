// src/components/features/vendors/VendorDirectory.tsx

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { VendorCard } from "./VendorCard";
import { VendorFilters } from "./VendorFilters";
import { type Vendor } from "../../../types";
import { Search, Filter, Download } from "lucide-react";
import { sampleVendors } from "../../../data/sampleVendors";

export const VendorDirectory: React.FC = () => {
  const [vendors] = useState<Vendor[]>(sampleVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredVendors = vendors.filter((vendor) => {
    const query = searchTerm.trim().toLowerCase();
    return (
      vendor.name.toLowerCase().includes(query) ||
      vendor.categories.some((cat) => cat.toLowerCase().includes(query)) ||
      vendor.location.city.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full p-4 space-y-6 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Directory</h1>
          <p className="text-gray-600">
            2,148 certified construction suppliers
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export List
        </Button>
      </div>

      {/* Search + Filters */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Fixed: Search input with proper icon positioning */}
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/3" />
              <Input
                type="text"
                placeholder="Search vendors by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Filters Panel */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showFilters ? "max-h-[500px] mt-4" : "max-h-0"
            }`}
          >
            {showFilters && (
              <div className="pt-4 border-t border-gray-200">
                <VendorFilters />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(350px, 100%), 1fr))",
        }}
      >
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {/* Empty State */}
      {filteredVendors.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="mb-2 text-gray-400">No vendors found</div>
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
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: "IndiaMART", count: "450+" },
              { name: "TradeIndia", count: "320+" },
              { name: "Udaan", count: "180+" },
              { name: "JustDial", count: "280+" },
              { name: "Google Business", count: "600+" },
              { name: "ConstructConnect", count: "150+" },
            ].map((source) => (
              <div key={source.name} className="p-4 rounded-lg bg-gray-50">
                <div className="font-medium text-gray-900">{source.name}</div>
                <div className="text-sm text-gray-600">
                  {source.count} vendors
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
