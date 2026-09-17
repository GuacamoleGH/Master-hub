"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

interface CriticVsYouChartProps {
  data: Array<{
    title: string;
    userRating: number;
    criticRating: number;
    gameKnowledge: number;
  }>;
}

export default function CriticVsYouChart({ data }: CriticVsYouChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-cine-500 text-xs">
        No hay suficientes juegos calificados para comparar con Metacritic.
      </div>
    );
  }

  // Tomamos los juegos calificados más recientes
  const chartData = data.slice(0, 10).map((d) => ({
    name: d.title.length > 22 ? `${d.title.substring(0, 20)}…` : d.title,
    fullName: d.title,
    "Tu Nota": d.userRating,
    "Metacritic (Crítica)": d.criticRating,
    gk: d.gameKnowledge,
  }));

  const renderCustomTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={12}
          dx={-4}
          textAnchor="end"
          fill="#94a3b8"
          fontSize={11}
          fontWeight={500}
          transform="rotate(-28)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-80 pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 15, right: 15, left: -15, bottom: 70 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#71717a"
            tickLine={false}
            interval={0}
            height={70}
            tick={renderCustomTick}
          />
          <YAxis
            domain={[0, 10]}
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            ticks={[0, 2, 4, 6, 8, 10]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="p-3 bg-cine-950/95 border border-purple-500/40 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5 z-50">
                    <p className="font-bold text-white max-w-[200px] border-b border-cine-800 pb-1">
                      {item.fullName}
                    </p>
                    <div className="flex items-center justify-between gap-4 text-purple-300">
                      <span>Tu Veredicto:</span>
                      <strong className="font-mono text-sm">
                        {item["Tu Nota"]} / 10
                      </strong>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-cyan-300">
                      <span>Metacritic:</span>
                      <strong className="font-mono text-sm">
                        {item["Metacritic (Crítica)"]} / 10
                      </strong>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-cine-400 pt-1 border-t border-cine-800 font-mono">
                      <span>Game Knowledge:</span>
                      <strong className="text-white">{item.gk}%</strong>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: "16px", fontSize: "12px" }}
          />
          <Bar
            dataKey="Tu Nota"
            fill="#8B5CF6"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            dataKey="Metacritic (Crítica)"
            fill="#06B6D4"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
