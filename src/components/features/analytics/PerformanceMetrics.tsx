// src/components/features/analytics/PerformanceMetrics.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const performanceData = [
  { month: "Jan", procurementTime: 22, vendorResponse: 85, costSavings: 18.5 },
  { month: "Feb", procurementTime: 19, vendorResponse: 88, costSavings: 20.2 },
  { month: "Mar", procurementTime: 17, vendorResponse: 91, costSavings: 22.1 },
  { month: "Apr", procurementTime: 15, vendorResponse: 89, costSavings: 19.8 },
  { month: "May", procurementTime: 14, vendorResponse: 92, costSavings: 23.5 },
  { month: "Jun", procurementTime: 12, vendorResponse: 94, costSavings: 25.2 },
];

const efficiencyData = [
  { category: "Vendor Discovery", manual: 5, automated: 0.5, saved: 4.5 },
  { category: "RFP Creation", manual: 3, automated: 0.2, saved: 2.8 },
  { category: "Bid Analysis", manual: 4, automated: 0.3, saved: 3.7 },
  { category: "Documentation", manual: 2, automated: 0.1, saved: 1.9 },
];

export const PerformanceMetrics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">
          Performance Trends
        </h3>
        <p className="text-sm text-gray-600">
          Monthly procurement performance metrics
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === "procurementTime")
                    return [`${value} days`, "Procurement Time"];
                  if (name === "vendorResponse")
                    return [`${value}%`, "Vendor Response"];
                  if (name === "costSavings")
                    return [`${value}%`, "Cost Savings"];
                  return [value, name];
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="procurementTime"
                name="Procurement Time"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="vendorResponse"
                name="Vendor Response"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="costSavings"
                name="Cost Savings"
                stroke="#ffc658"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={efficiencyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="manual" name="Manual (Days)" fill="#8884d8" />
              <Bar dataKey="automated" name="Automated (Days)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
