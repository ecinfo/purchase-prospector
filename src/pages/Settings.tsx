// src/pages/Settings.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Bell, User, Shield, Database } from "lucide-react";

export const Settings: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 w-full space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage your account & application preferences
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="sticky top-14 bg-white z-10 p-1 rounded-lg shadow-sm flex flex-wrap">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" /> Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center">
            <Database className="h-4 w-4 mr-2" /> Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Information
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="Rajesh" />
                <Input label="Last Name" defaultValue="Kumar" />
              </div>
              <Input
                label="Email"
                type="email"
                defaultValue="rajesh.kumar@construction.com"
              />
              <Input label="Phone" type="tel" defaultValue="+91 98765 43210" />
              <Input label="Company" defaultValue="ABC Construction Ltd." />
              <Input label="Designation" defaultValue="Purchase Manager" />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Email Notifications",
                  text: "Receive updates via email",
                },
                {
                  title: "Bid Alerts",
                  text: "Get notified when vendors submit bids",
                },
                {
                  title: "Project Updates",
                  text: "Updates on procurement progress",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 accent-blue-600"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <Card className="w-full">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Security Settings
              </h3>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Change Password */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Change Password
                </h4>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <div className="flex justify-start sm:justify-end">
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>

              {/* 2FA */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Vendor Directory Integrations
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "IndiaMART", status: "Connected", vendors: "450+" },
                  { name: "TradeIndia", status: "Connected", vendors: "320+" },
                  { name: "Udaan", status: "Connected", vendors: "180+" },
                  { name: "JustDial", status: "Connected", vendors: "280+" },
                  {
                    name: "Google Business",
                    status: "Connected",
                    vendors: "600+",
                  },
                  {
                    name: "ConstructConnect",
                    status: "Connected",
                    vendors: "150+",
                  },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {integration.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {integration.vendors} vendors
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {integration.status}
                      </span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
