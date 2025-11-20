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
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vendor.name}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {vendor.location.city}, {vendor.location.state}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
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
                className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {vendor.experience} years experience
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            {vendor.totalProjects} projects completed
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {vendor.certifications.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              {cert}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-sm font-semibold text-green-600">
              {vendor.performance.onTimeDelivery}%
            </div>
            <div className="text-xs text-gray-600">On Time</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-sm font-semibold text-blue-600">
              {vendor.performance.qualityRating}
            </div>
            <div className="text-xs text-gray-600">Quality</div>
          </div>
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-sm font-semibold text-purple-600">
              ₹{(vendor.minOrderValue / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-gray-600">Min Order</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              {vendor.contact.primary.phone}
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="h-4 w-4 mr-1" />
              {vendor.contact.primary.email}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
