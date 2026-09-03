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

interface GenreChartProps {
  data: { genre: string; count: number; avgRating: number }[];
}

const COLORS = [
  "#F59E0B",
  "#38BDF8",
  "#A855F7",
  "#10B981",
  "#EC4899",
  "#6366F1",
  "#14B8A6",
];

export default function GenreChart({ data }: GenreChartProps) {
  const topGenres = data.slice(0, 6);

  if (topGenres.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-cine-500">
        No hay datos de géneros aún
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={topGenres}
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <XAxis
            type="number"
            stroke="#5D678C"
            fontSize={11}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="genre"
            stroke="#8B95BD"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: "#272C3E" }}
            width={85}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-cine-900 border border-cine-700 px-3 py-2 rounded-xl shadow-xl text-xs space-y-1">
                    <div className="font-bold text-white">{item.genre}</div>
                    <div className="text-cine-300">
                      Vistas:{" "}
                      <span className="text-amber-400 font-bold">
                        {item.count}
                      </span>
                    </div>
                    <div className="text-cine-300">
                      Nota media:{" "}
                      <span className="text-emerald-400 font-bold">
                        {item.avgRating}★
                      </span>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {topGenres.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
