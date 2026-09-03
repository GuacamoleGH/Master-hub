'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

interface CriticVsYouChartProps {
  data: {
    title: string;
    userRating: number;
    criticRating: number;
    gameKnowledge: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const diff = Number((item.userRating - item.criticRating).toFixed(1));

    return (
      <div className="glass-panel p-3 rounded-xl border border-purple-500/30 bg-cine-950/95 shadow-2xl text-xs space-y-1">
        <div className="font-bold text-white text-sm line-clamp-1">{item.title}</div>
        <div className="flex items-center justify-between gap-4 text-purple-300">
          <span>Tu Nota:</span>
          <strong className="font-mono">{item.userRating.toFixed(1)} / 10</strong>
        </div>
        <div className="flex items-center justify-between gap-4 text-cyan-300">
          <span>Metacritic:</span>
          <strong className="font-mono">{item.criticRating.toFixed(1)} / 10</strong>
        </div>
        <div className="pt-1 border-t border-cine-800 flex items-center justify-between gap-4 text-white font-mono">
          <span>Game Knowledge:</span>
          <strong className="text-purple-400">{item.gameKnowledge.toFixed(1)}%</strong>
        </div>
        <div className="text-[10px] text-cine-400 font-mono">
          Diferencia: {diff > 0 ? `+${diff}` : diff} pts
        </div>
      </div>
    );
  }
  return null;
};

export default function CriticVsYouChart({ data }: CriticVsYouChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-cine-500 italic">
        Completa y califica videojuegos para generar la comparativa con Metacritic.
      </div>
    );
  }

  // Acortar títulos para el eje X
  const formattedData = data.slice(0, 10).map((d) => ({
    ...d,
    shortTitle: d.title.length > 14 ? `${d.title.substring(0, 12)}...` : d.title,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#232635" vertical={false} />
          <XAxis
            dataKey="shortTitle"
            stroke="#71717A"
            fontSize={11}
            tickLine={false}
            interval={0}
            angle={-20}
            textAnchor="end"
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            stroke="#71717A"
            fontSize={11}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
          />
          <Bar
            name="Tu Nota"
            dataKey="userRating"
            fill="#8B5CF6"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
          <Bar
            name="Metacritic (Crítica)"
            dataKey="criticRating"
            fill="#06B6D4"
            radius={[4, 4, 0, 0]}
            maxBarSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
