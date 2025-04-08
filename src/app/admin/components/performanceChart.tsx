"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Mock Data: Performance based on total income over months
const data = [
  { month: "Jan", income: 8000 },
  { month: "Feb", income: 9000 },
  { month: "Mar", income: 7500 },
  { month: "Apr", income: 8800 },
  { month: "May", income: 9400 },
  { month: "Jun", income: 10200 },
  { month: "Jul", income: 9800 },
  { month: "Aug", income: 11000 },
  { month: "Sep", income: 9700 },
  { month: "Oct", income: 10500 },
  { month: "Nov", income: 11200 },
  { month: "Dec", income: 12000 },
];

const PerformanceChart = () => {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Vendor Performance (Total Income)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-gray-500" />
          <YAxis className="text-gray-500" />
          <Tooltip cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="income" fill="#4caf50" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
