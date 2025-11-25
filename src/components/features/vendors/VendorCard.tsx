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
    <Card className="transition-shadow hover:shadow-lg dark:bg-gray-900 dark:border-gray-700">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {vendor.name}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1 shrink-0" />
              {vendor.location.city}, {vendor.location.state}
            </div>
          </div>

          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {vendor.rating}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {vendor.categories.map((category) => (
              <span
                key={category}
                className="inline-block px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Experience + Projects */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2 shrink-0" />
            {vendor.experience} years experience
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
            {vendor.totalProjects} projects completed
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1 mb-4">
          {vendor.certifications.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full dark:text-green-300 dark:bg-green-900/30"
            >
              <CheckCircle className="w-3 h-3 mr-1 text-green-700 shrink-0 dark:text-green-300" />
              {cert}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="p-2 rounded bg-gray-50 dark:bg-gray-800/70">
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
              {vendor.performance.onTimeDelivery}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              On Time
            </div>
          </div>
          <div className="p-2 rounded bg-gray-50 dark:bg-gray-800/70">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {vendor.performance.qualityRating}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Quality
            </div>
          </div>
          <div className="p-2 rounded bg-gray-50 dark:bg-gray-800/70">
            <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              ₹{(vendor.minOrderValue / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Min Order
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`tel:${vendor.contact.primary.phone}`}
              className="flex items-center gap-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span>{vendor.contact.primary.phone}</span>
            </a>
            <a
              href={`mailto:${vendor.contact.primary.email}`}
              className="flex items-center gap-2 text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
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
