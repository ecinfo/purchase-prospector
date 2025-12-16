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
import { ChangePassword } from "../components/auth/ChangePassword";
import { useSelector } from "react-redux";

// Toggle Switch Component (Dark Mode Supported)
const Toggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 
      focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2
      ${
        checked
          ? "bg-blue-600 dark:bg-blue-500"
          : "bg-gray-200 dark:bg-gray-700"
      }
    `}
  >
    <span
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 
        ${checked ? "translate-x-5" : "translate-x-0"}
      `}
    />
  </button>
);

export const Settings: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { profile } = useSelector((state: any) => state.profile);
  const [notifications, setNotifications] = useState({
    email: profile?.email_notification ?? true,
    bids: profile?.bid_alerts ?? true,
    projects: profile?.project_updates ?? true,
  });

  return (
    <div className="w-full p-4 mx-auto space-y-6 sm:p-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 sm:text-2xl">
          Settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          Manage your account & application preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="sticky z-10 grid grid-cols-2 gap-1 p-1 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700 top-14 sm:grid-cols-4">
          {[
            { key: "profile", icon: User, label: "Profile" },
            { key: "notifications", icon: Bell, label: "Notifications" },
            { key: "security", icon: Shield, label: "Security" },
            { key: "integrations", icon: Database, label: "Integrations" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-md 
                hover:bg-gray-100 dark:hover:bg-gray-800
                data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600
                dark:data-[state=active]:bg-blue-900/40 dark:data-[state=active]:text-blue-300"
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Profile Information
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your personal details
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "First Name", value: profile?.first_name || "" },
                  { label: "Last Name", value: profile?.last_name || "" },
                ].map((field) => (
                  <div key={field.label} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    <Input
                      defaultValue={field.value}
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    />
                  </div>
                ))}
              </div>

              {[
                {
                  label: "Email",
                  value: profile?.email || "",
                  type: "email",
                },
                { label: "Phone", value: profile?.phone || "", type: "tel" },
              ].map((field) => (
                <div key={field.label} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    defaultValue={field.value}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  />
                </div>
              ))}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { label: "Company", value: profile?.company_name || "" },
                  { label: "Designation", value: profile?.designation || "" },
                ].map((field) => (
                  <div key={field.label} className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {field.label}
                    </label>
                    <Input
                      defaultValue={field.value}
                      className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t dark:border-gray-700">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Tab */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Notification Preferences
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
                  className="flex items-center justify-between p-4 transition-colors rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.text}
                    </p>
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
              <div className="flex justify-end pt-4 border-t dark:border-gray-700">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          {/* CHANGE PASSWORD CARD */}
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Change Password
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your password regularly for security
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ChangePassword />
            </CardContent>
          </Card>

          {/* 2FA CARD */}
          {/* <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="shrink-0 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Enable 2FA
                </Button>
              </div>
            </CardHeader>
          </Card> */}
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6">
          <Card className="dark:bg-gray-900 dark:border-gray-700">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Vendor Directory Integrations
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
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
                    className="flex flex-col justify-between gap-3 p-4 transition-colors rounded-lg sm:flex-row sm:items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:border-gray-700">
                        <Database className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {integration.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {integration.vendors} vendors synced
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto sm:ml-0">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full" />
                        {integration.status}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="dark:border-gray-700 dark:text-black-300 dark:hover:bg-gray-200"
                      >
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
