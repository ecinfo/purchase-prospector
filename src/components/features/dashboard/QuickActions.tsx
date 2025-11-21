// src/components/features/dashboard/QuickActions.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import {
  Plus,
  FileText,
  Users,
  BarChart3,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

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

export const QuickActions: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          Quick Actions
        </h3>
        <p className="text-xs text-gray-500 sm:text-sm">Get started quickly</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.action}
              className="flex items-center gap-3 p-3 transition-colors border border-transparent rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 group"
            >
              <div
                className={`p-2.5 rounded-lg ${action.color} text-white shrink-0`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  {action.label}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {action.description}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 transition-colors group-hover:text-blue-500 shrink-0" />
            </Link>
          );
        })}

        {/* Support Section */}
        <div className="p-4 mt-4 border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white border rounded-lg shrink-0">
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">Need Help?</h4>
              <p className="mt-1 mb-3 text-xs text-gray-500">
                Contact support for assistance
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
