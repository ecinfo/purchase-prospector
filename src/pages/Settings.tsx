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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account and application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="max-w-4xl">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Information
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Receive updates via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Bid Alerts</h4>
                  <p className="text-sm text-gray-600">
                    Get notified when vendors submit bids
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Project Updates</h4>
                  <p className="text-sm text-gray-600">
                    Updates on procurement progress
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300"
                />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Security Settings
              </h3>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  Change Password
                </h4>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button>Update Password</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between">
                  <div>
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

        <TabsContent value="integrations">
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
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
