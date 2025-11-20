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
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">
          Cost Savings Analysis
        </h3>
        <p className="text-sm text-gray-600">
          Monthly estimated vs actual procurement costs
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value / 100000}L`} />
              <Tooltip
                formatter={(value: number) => [
                  `₹${(value / 100000).toFixed(1)}L`,
                  "",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar dataKey="estimated" name="Estimated Cost" fill="#8884d8" />
              <Bar dataKey="actual" name="Actual Cost" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">₹23.5L</div>
            <div className="text-sm text-gray-600">Total Savings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">18.2%</div>
            <div className="text-sm text-gray-600">Avg. Savings Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">42</div>
            <div className="text-sm text-gray-600">Projects Optimized</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
