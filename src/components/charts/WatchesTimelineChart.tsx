"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WatchesTimelineProps {
  data: { month: string; count: number }[];
}

export default function WatchesTimelineChart({ data }: WatchesTimelineProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-cine-500">
        No hay registros temporales aún
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
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
                      {item.month}
                    </span>
                    :{" "}
                    <span className="text-white">
                      {item.count} películas vistas
                    </span>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
