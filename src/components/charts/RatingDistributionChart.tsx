"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface RatingDistributionProps {
  data: { rating: number; count: number }[];
}

export default function RatingDistributionChart({
  data,
}: RatingDistributionProps) {
  const chartData = data.map((d) => ({
    ...d,
    label: `${d.rating}★`,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="label"
            stroke="#5D678C"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#272C3E" }}
          />
          <YAxis
            stroke="#5D678C"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#272C3E" }}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-cine-900 border border-cine-700 px-3 py-2 rounded-xl shadow-xl text-xs">
                    <span className="font-bold text-amber-400">
                      {item.rating} Estrellas
                    </span>
                    : <span className="text-white">{item.count} películas</span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.count > 0 ? "#F59E0B" : "#1A1E2B"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
