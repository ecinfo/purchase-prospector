// src/pages/Settings.tsx
import React, { useState } from "react";
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

// Toggle Switch Component
const Toggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    bids: true,
    projects: true,
  });

  return (
    <div className="w-full p-4 mx-auto space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Settings
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          Manage your account & application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="sticky z-10 grid grid-cols-2 gap-1 p-1 bg-white border border-gray-200 rounded-lg shadow-sm top-14 sm:grid-cols-4">
          <TabsTrigger
            value="profile"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Bell className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Shield className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-100 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
          >
            <Database className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Information
              </h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Input defaultValue="Rajesh" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Input defaultValue="Kumar" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  defaultValue="rajesh.kumar@construction.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <Input type="tel" defaultValue="+91 98765 43210" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <Input defaultValue="ABC Construction Ltd." />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <Input defaultValue="Purchase Manager" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h3>
              <p className="text-sm text-gray-500">
                Choose how you want to be notified
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "email",
                  title: "Email Notifications",
                  text: "Receive updates via email",
                },
                {
                  key: "bids",
                  title: "Bid Alerts",
                  text: "Get notified when vendors submit bids",
                },
                {
                  key: "projects",
                  title: "Project Updates",
                  text: "Updates on procurement progress",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.text}</p>
                  </div>
                  <Toggle
                    checked={
                      notifications[item.key as keyof typeof notifications]
                    }
                    onChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: checked,
                      }))
                    }
                  />
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          {/* Change Password Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
              <p className="text-sm text-gray-500">
                Update your password regularly for security
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* 2FA Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" className="shrink-0">
                  Enable 2FA
                </Button>
              </div>
            </CardHeader>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Vendor Directory Integrations
              </h3>
              <p className="text-sm text-gray-500">
                Manage your connected vendor platforms
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                    className="flex flex-col justify-between gap-3 p-4 transition-colors rounded-lg sm:flex-row sm:items-center bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-white border rounded-lg">
                        <Database className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {integration.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {integration.vendors} vendors synced
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto sm:ml-0">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
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
