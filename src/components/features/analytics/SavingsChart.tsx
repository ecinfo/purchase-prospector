// src/components/features/analytics/SavingsChart.tsx
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
} from "recharts";

const data = [
  { month: "Jan", estimated: 4500000, actual: 5200000, savings: 700000 },
  { month: "Feb", estimated: 5200000, actual: 4800000, savings: 400000 },
  { month: "Mar", estimated: 4800000, actual: 4200000, savings: 600000 },
  { month: "Apr", estimated: 5500000, actual: 4900000, savings: 600000 },
  { month: "May", estimated: 5100000, actual: 4500000, savings: 600000 },
  { month: "Jun", estimated: 4900000, actual: 4300000, savings: 600000 },
];

export const SavingsChart: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          Cost Savings Analysis
        </h3>
        <p className="text-xs text-gray-500 sm:text-sm">
          Monthly estimated vs actual procurement costs
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tickFormatter={(value) => `₹${value / 100000}L`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                width={50}
              />
              <Tooltip
                formatter={(value: number) => [
                  `₹${(value / 100000).toFixed(1)}L`,
                  "",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar
                dataKey="estimated"
                name="Estimated Cost"
                fill="#a78bfa"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="actual"
                name="Actual Cost"
                fill="#34d399"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t sm:gap-4">
          <div className="p-2 text-center rounded-lg sm:p-3 bg-green-50">
            <div className="text-lg font-bold text-green-600 sm:text-2xl">
              ₹23.5L
            </div>
            <div className="text-xs text-green-700 sm:text-sm">
              Total Savings
            </div>
          </div>
          <div className="p-2 text-center rounded-lg sm:p-3 bg-blue-50">
            <div className="text-lg font-bold text-blue-600 sm:text-2xl">
              18.2%
            </div>
            <div className="text-xs text-blue-700 sm:text-sm">Avg. Savings</div>
          </div>
          <div className="p-2 text-center rounded-lg sm:p-3 bg-purple-50">
            <div className="text-lg font-bold text-purple-600 sm:text-2xl">
              42
            </div>
            <div className="text-xs text-purple-700 sm:text-sm">Optimized</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
