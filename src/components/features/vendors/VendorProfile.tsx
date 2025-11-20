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
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {vendor.name}
              </h1>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {vendor.location.city}, {vendor.location.state},{" "}
                {vendor.location.country}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-lg font-semibold text-yellow-600">
                <Star className="h-5 w-5 mr-1 fill-current" />
                {vendor.rating}
              </div>
              <div className="text-sm text-gray-500">
                {vendor.totalProjects} projects
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Company Information
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Business Type
                  </label>
                  <p className="text-gray-900 capitalize">{vendor.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Experience
                  </label>
                  <p className="text-gray-900">{vendor.experience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Minimum Order
                  </label>
                  <p className="text-gray-900">
                    ₹{vendor.minOrderValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Member Since
                  </label>
                  <p className="text-gray-900">
                    {new Date(vendor.createdAt).getFullYear()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Categories & Specializations
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vendor.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Certifications & Quality Standards
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendor.certifications.map((certification) => (
                  <div key={certification} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{certification}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact & Performance */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Phone className="h-4 w-4 mr-2" />
                  {vendor.contact.primary.phone}
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="h-4 w-4 mr-2" />
                  {vendor.contact.primary.email}
                </div>
                <div className="text-sm text-gray-600">
                  Contact: {vendor.contact.primary.name}
                  <br />
                  {vendor.contact.primary.designation}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Performance Metrics
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">On-time Delivery</span>
                    <span className="font-semibold">
                      {vendor.performance.onTimeDelivery}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${vendor.performance.onTimeDelivery}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Quality Rating</span>
                    <span className="font-semibold">
                      {vendor.performance.qualityRating}/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (vendor.performance.qualityRating / 5) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Communication</span>
                    <span className="font-semibold">
                      {vendor.performance.communication}/5
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (vendor.performance.communication / 5) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Terms
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendor.paymentTerms.map((term) => (
                  <div
                    key={term}
                    className="flex items-center text-sm text-gray-700"
                  >
                    <Award className="h-4 w-4 mr-2 text-green-500" />
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
