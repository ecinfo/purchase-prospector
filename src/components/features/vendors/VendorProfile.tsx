// src/components/features/vendors/VendorProfile.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { type Vendor } from "../../../types";
import { Star, MapPin, Phone, Mail, CheckCircle, Award } from "lucide-react";

interface VendorProfileProps {
  vendor: Vendor;
}

export const VendorProfile: React.FC<VendorProfileProps> = ({ vendor }) => {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="dark:bg-gray-900 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {vendor.name}
              </h1>
              <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                {vendor.location.city}, {vendor.location.state},{" "}
                {vendor.location.country}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                <Star className="w-5 h-5 mr-1 fill-current" />
                {vendor.rating}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {vendor.totalProjects} projects
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Company Info + Certifications */}
        <div className="space-y-6 lg:col-span-2">
          {/* Company Info */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Company Information
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Business Type", value: vendor.type },
                  { label: "Experience", value: `${vendor.experience} years` },
                  {
                    label: "Minimum Order",
                    value: `₹${vendor.minOrderValue.toLocaleString()}`,
                  },
                  {
                    label: "Member Since",
                    value: new Date(vendor.createdAt).getFullYear(),
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {item.label}
                    </label>
                    <p className="text-gray-900 capitalize dark:text-gray-100">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Categories & Specializations
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Certifications & Quality Standards
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendor.certifications.map((certification) => (
                  <div
                    key={certification}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" />
                    {certification}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact + Metrics + Payments */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Contact Information
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {vendor.contact.primary.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {vendor.contact.primary.email}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Contact: {vendor.contact.primary.name}
                  <br />
                  {vendor.contact.primary.designation}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Performance Metrics
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    label: "On-time Delivery",
                    value: `${vendor.performance.onTimeDelivery}%`,
                    percent: vendor.performance.onTimeDelivery,
                    color: "bg-green-600",
                  },
                  {
                    label: "Quality Rating",
                    value: `${vendor.performance.qualityRating}/5`,
                    percent: (vendor.performance.qualityRating / 5) * 100,
                    color: "bg-blue-600",
                  },
                  {
                    label: "Communication",
                    value: `${vendor.performance.communication}/5`,
                    percent: (vendor.performance.communication / 5) * 100,
                    color: "bg-purple-600",
                  },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between mb-1 text-sm text-gray-600 dark:text-gray-300">
                      <span>{metric.label}</span>
                      <span className="font-semibold dark:text-gray-100">
                        {metric.value}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700/70">
                      <div
                        className={`${metric.color} h-2 rounded-full`}
                        style={{ width: `${metric.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Payment Terms
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendor.paymentTerms.map((term) => (
                  <div
                    key={term}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                  >
                    <Award className="w-4 h-4 mr-2 text-green-500 dark:text-green-400" />
                    {term}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
