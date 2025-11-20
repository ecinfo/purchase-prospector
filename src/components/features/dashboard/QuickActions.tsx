// src/components/features/dashboard/QuickActions.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Plus, FileText, Users, BarChart3 } from "lucide-react";

export const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: Plus,
      label: "New Procurement",
      description: "Start AI-powered procurement",
      action: "/procurement",
      color: "bg-blue-500",
    },
    {
      icon: FileText,
      label: "Create RFP",
      description: "Generate request for proposal",
      action: "/procurement",
      color: "bg-green-500",
    },
    {
      icon: Users,
      label: "Vendor Search",
      description: "Find qualified suppliers",
      action: "/vendors",
      color: "bg-purple-500",
    },
    {
      icon: BarChart3,
      label: "View Reports",
      description: "Analytics & insights",
      action: "/analytics",
      color: "bg-orange-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                onClick={() => (window.location.href = action.action)}
              >
                <div
                  className={`p-3 rounded-lg ${action.color} text-white mr-4`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {action.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {action.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">
            Contact our support team for assistance with procurement processes.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Get Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
