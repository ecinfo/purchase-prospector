// src/components/features/vendors/VendorFilters.tsx
import React, { useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { ChevronDown, RotateCcw } from "lucide-react";
import {
  CONSTRUCTION_CATEGORIES,
  VENDOR_CERTIFICATIONS,
  PAYMENT_TERMS,
} from "../../../utils/constants";

// Reusable Select Component
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 pr-10 text-sm text-gray-900 transition-colors bg-white border border-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2" />
    </div>
  </div>
);

export const VendorFilters: React.FC = () => {
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    rating: "",
    experience: "",
    certification: "",
    paymentTerms: "",
    minOrder: "",
  });

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      location: "",
      rating: "",
      experience: "",
      certification: "",
      paymentTerms: "",
      minOrder: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="space-y-4">
      {/* Filters Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Categories"
          value={filters.category}
          onChange={(v) => updateFilter("category", v)}
          placeholder="All Categories"
          options={CONSTRUCTION_CATEGORIES.map((c) => ({ value: c, label: c }))}
        />

        <Select
          label="Location"
          value={filters.location}
          onChange={(v) => updateFilter("location", v)}
          placeholder="All Locations"
          options={[
            { value: "pune", label: "Pune" },
            { value: "mumbai", label: "Mumbai" },
            { value: "hyderabad", label: "Hyderabad" },
            { value: "bangalore", label: "Bangalore" },
            { value: "chennai", label: "Chennai" },
            { value: "delhi", label: "Delhi" },
          ]}
        />

        <Select
          label="Min Rating"
          value={filters.rating}
          onChange={(v) => updateFilter("rating", v)}
          placeholder="Any Rating"
          options={[
            { value: "4", label: "4.0+ ⭐" },
            { value: "4.5", label: "4.5+ ⭐" },
            { value: "4.8", label: "4.8+ ⭐" },
          ]}
        />

        <Select
          label="Experience"
          value={filters.experience}
          onChange={(v) => updateFilter("experience", v)}
          placeholder="Any Experience"
          options={[
            { value: "5", label: "5+ years" },
            { value: "10", label: "10+ years" },
            { value: "15", label: "15+ years" },
            { value: "20", label: "20+ years" },
          ]}
        />

        <Select
          label="Certifications"
          value={filters.certification}
          onChange={(v) => updateFilter("certification", v)}
          placeholder="Any Certification"
          options={VENDOR_CERTIFICATIONS.map((c) => ({ value: c, label: c }))}
        />

        <Select
          label="Payment Terms"
          value={filters.paymentTerms}
          onChange={(v) => updateFilter("paymentTerms", v)}
          placeholder="Any Terms"
          options={PAYMENT_TERMS.map((t) => ({ value: t, label: t }))}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Min Order Value
          </label>
          <div className="relative">
            <span className="absolute text-sm text-gray-500 -translate-y-1/2 left-3 top-1/2">
              ₹
            </span>
            <Input
              type="number"
              placeholder="e.g., 1,00,000"
              value={filters.minOrder}
              onChange={(e) => updateFilter("minOrder", e.target.value)}
              className="text-sm pl-7"
            />
          </div>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex flex-col items-start justify-between gap-3 pt-4 border-t sm:flex-row sm:items-center">
        {/* Active Filters Count */}
        {hasActiveFilters ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {Object.values(filters).filter((v) => v !== "").length}
            </span>
            <span>filters applied</span>
          </div>
        ) : (
          <div className="text-sm text-gray-400">No filters applied</div>
        )}

        {/* Reset Button */}
        <Button
          variant="outline"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className="flex items-center gap-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
