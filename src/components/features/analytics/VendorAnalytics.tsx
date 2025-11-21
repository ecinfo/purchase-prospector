// src/components/features/analytics/VendorAnalytics.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const vendorPerformance = [
  { name: "Shree Cement", rating: 4.8, onTime: 95 },
  { name: "TATA Steel", rating: 4.9, onTime: 98 },
  { name: "JK Cement", rating: 4.6, onTime: 92 },
  { name: "UltraTech", rating: 4.7, onTime: 94 },
  { name: "ACC Ltd", rating: 4.5, onTime: 89 },
];

const categoryDistribution = [
  { name: "Cement", value: 35 },
  { name: "Steel", value: 25 },
  { name: "Bricks", value: 15 },
  { name: "Tiles", value: 12 },
  { name: "Electrical", value: 8 },
  { name: "Others", value: 5 },
];

const COLORS = [
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#6b7280",
];

export const VendorAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          Vendor Analytics
        </h3>
        <p className="text-xs text-gray-500 sm:text-sm">
          Vendor performance and category distribution
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Vendor Performance Bar Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Top Vendor Performance
            </h4>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vendorPerformance}
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
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    width={80}
                  />
                  <Tooltip
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
                    dataKey="rating"
                    name="Rating (/5)"
                    fill="#8b5cf6"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="onTime"
                    name="On-Time %"
                    fill="#10b981"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Pie Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Procurement by Category
            </h4>
            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
                  >
                    {categoryDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t sm:grid-cols-4 sm:gap-4">
          {[
            { value: "2,148", label: "Total Vendors", color: "blue" },
            { value: "94%", label: "Active Vendors", color: "green" },
            { value: "4.7", label: "Avg Rating", color: "purple" },
            { value: "93%", label: "On-time Delivery", color: "orange" },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-3 sm:p-4 rounded-lg bg-${stat.color}-50 hover:bg-${stat.color}-100 transition-colors`}
              style={{
                backgroundColor:
                  stat.color === "blue"
                    ? "#eff6ff"
                    : stat.color === "green"
                    ? "#f0fdf4"
                    : stat.color === "purple"
                    ? "#faf5ff"
                    : "#fff7ed",
              }}
            >
              <div
                className="text-xl font-bold sm:text-2xl"
                style={{
                  color:
                    stat.color === "blue"
                      ? "#2563eb"
                      : stat.color === "green"
                      ? "#16a34a"
                      : stat.color === "purple"
                      ? "#9333ea"
                      : "#ea580c",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs sm:text-sm"
                style={{
                  color:
                    stat.color === "blue"
                      ? "#1d4ed8"
                      : stat.color === "green"
                      ? "#15803d"
                      : stat.color === "purple"
                      ? "#7e22ce"
                      : "#c2410c",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
