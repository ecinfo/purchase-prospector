// src/components/features/vendors/VendorCard.tsx
import React from "react";
import { Card, CardContent } from "../../ui/Card";
import type { Vendor } from "../../../types";
import { Star, MapPin, CheckCircle, Phone, Mail, Calendar } from "lucide-react";

interface VendorCardProps {
  vendor: Vendor;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vendor.name}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1 shrink-0" />
              {vendor.location.city}, {vendor.location.state}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {vendor.rating}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {vendor.categories.map((category) => (
              <span
                key={category}
                className="inline-block px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 shrink-0" />
            {vendor.experience} years experience
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
            {vendor.totalProjects} projects completed
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {vendor.certifications.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full"
            >
              <CheckCircle className="w-3 h-3 mr-1 shrink-0" />
              {cert}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 rounded bg-gray-50">
            <div className="text-sm font-semibold text-green-600">
              {vendor.performance.onTimeDelivery}%
            </div>
            <div className="text-xs text-gray-600">On Time</div>
          </div>
          <div className="p-2 rounded bg-gray-50">
            <div className="text-sm font-semibold text-blue-600">
              {vendor.performance.qualityRating}
            </div>
            <div className="text-xs text-gray-600">Quality</div>
          </div>
          <div className="p-2 rounded bg-gray-50">
            <div className="text-sm font-semibold text-purple-600">
              ₹{(vendor.minOrderValue / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-gray-600">Min Order</div>
          </div>
        </div>

        {/* Fixed: Phone & Email section */}
        <div className="pt-4 border-t">
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`tel:${vendor.contact.primary.phone}`}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{vendor.contact.primary.phone}</span>
            </a>
            <a
              href={`mailto:${vendor.contact.primary.email}`}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-600"
            >
              <Mail className="w-4 h-4 shrink-0" />
              <span className="truncate">{vendor.contact.primary.email}</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
