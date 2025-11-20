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
  { name: "Shree Cement", rating: 4.8, projects: 24, onTime: 95 },
  { name: "TATA Steel", rating: 4.9, projects: 18, onTime: 98 },
  { name: "JK Cement", rating: 4.6, projects: 15, onTime: 92 },
  { name: "UltraTech", rating: 4.7, projects: 22, onTime: 94 },
  { name: "ACC Ltd", rating: 4.5, projects: 12, onTime: 89 },
];

const categoryDistribution = [
  { name: "Cement & Concrete", value: 35 },
  { name: "Steel & Reinforcement", value: 25 },
  { name: "Bricks & Blocks", value: 15 },
  { name: "Tiles & Sanitary", value: 12 },
  { name: "Electrical", value: 8 },
  { name: "Others", value: 5 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export const VendorAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">
          Vendor Analytics
        </h3>
        <p className="text-sm text-gray-600">
          Vendor performance and category distribution
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendor Performance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Top Vendor Performance
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vendorPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" name="Rating (/5)" fill="#8884d8" />
                  <Bar dataKey="onTime" name="On Time %" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">
              Procurement by Category
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
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
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2,148</div>
            <div className="text-sm text-blue-700">Total Vendors</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-sm text-green-700">Active Vendors</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">4.7</div>
            <div className="text-sm text-purple-700">Avg Rating</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">93%</div>
            <div className="text-sm text-orange-700">On-time Delivery</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
