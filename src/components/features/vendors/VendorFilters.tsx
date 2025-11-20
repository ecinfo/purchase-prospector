// src/components/features/vendors/VendorFilters.tsx
import React from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import {
  CONSTRUCTION_CATEGORIES,
  VENDOR_CERTIFICATIONS,
  PAYMENT_TERMS,
} from "../../../utils/constants";

export const VendorFilters: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
          <option value="">All Categories</option>
          {CONSTRUCTION_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
          <option value="">All Locations</option>
          <option value="pune">Pune</option>
          <option value="mumbai">Mumbai</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="bangalore">Bangalore</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Rating
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
          <option value="0">Any Rating</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
          <option value="4.8">4.8+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experience
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
          <option value="0">Any Experience</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
          <option value="15">15+ years</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
          <option value="">Any Certification</option>
          {VENDOR_CERTIFICATIONS.map((cert) => (
            <option key={cert} value={cert}>
              {cert}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Terms
        </label>
        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
          <option value="">Any Terms</option>
          {PAYMENT_TERMS.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Order Value
        </label>
        <Input type="number" placeholder="e.g., 100000" />
      </div>

      <div className="flex items-end">
        <Button variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
