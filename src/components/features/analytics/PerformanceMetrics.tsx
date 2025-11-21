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
  {
    category: "Discovery",
    fullName: "Vendor Discovery",
    manual: 5,
    automated: 0.5,
  },
  { category: "RFP", fullName: "RFP Creation", manual: 3, automated: 0.2 },
  { category: "Analysis", fullName: "Bid Analysis", manual: 4, automated: 0.3 },
  { category: "Docs", fullName: "Documentation", manual: 2, automated: 0.1 },
];

export const PerformanceMetrics: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          Performance Trends
        </h3>
        <p className="text-xs text-gray-500 sm:text-sm">
          Monthly procurement performance metrics
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Line Chart Section */}
        <div>
          <h4 className="mb-3 text-sm font-medium text-gray-700">
            Trend Analysis
          </h4>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  width={35}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  width={35}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === "Procurement") return [`${value} days`, name];
                    return [`${value}%`, name];
                  }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="procurementTime"
                  name="Procurement"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#8b5cf6" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="vendorResponse"
                  name="Response %"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#10b981" }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="costSavings"
                  name="Savings %"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#f59e0b" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="pt-4 border-t">
          <h4 className="mb-3 text-sm font-medium text-gray-700">
            Time Efficiency (Days)
          </h4>
          <div className="h-48 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={efficiencyData}
                layout="vertical"
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "#e5e7eb" }}
                  width={65}
                />
                <Tooltip
                  formatter={(value: number, name: string, props: any) => {
                    const fullName = props.payload.fullName;
                    return [`${value} days`, name];
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullName;
                    }
                    return label;
                  }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                />
                <Bar
                  dataKey="manual"
                  name="Manual"
                  fill="#f87171"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="automated"
                  name="Automated"
                  fill="#34d399"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t sm:gap-4">
          <div className="p-2 text-center rounded-lg sm:p-3 bg-purple-50">
            <div className="text-lg font-bold text-purple-600 sm:text-xl">
              45%
            </div>
            <div className="text-xs text-purple-700">Time Reduced</div>
          </div>
          <div className="p-2 text-center rounded-lg sm:p-3 bg-green-50">
            <div className="text-lg font-bold text-green-600 sm:text-xl">
              94%
            </div>
            <div className="text-xs text-green-700">Response Rate</div>
          </div>
          <div className="p-2 text-center rounded-lg sm:p-3 bg-orange-50">
            <div className="text-lg font-bold text-orange-600 sm:text-xl">
              25%
            </div>
            <div className="text-xs text-orange-700">Cost Savings</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
