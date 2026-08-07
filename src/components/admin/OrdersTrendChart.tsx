"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { formatPKR } from "@/lib/shipping";

export interface TrendPoint {
  date: string;
  orders: number;
  revenue: number;
}

export function OrdersTrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#1e1e1e" vertical={false} />
        <XAxis dataKey="date" stroke="#666" fontSize={11} tickLine={false} axisLine={{ stroke: "#1e1e1e" }} interval="preserveStartEnd" minTickGap={24} />
        <YAxis yAxisId="orders" stroke="#666" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30} />
        <YAxis yAxisId="revenue" orientation="right" stroke="#666" fontSize={12} tickLine={false} axisLine={false} width={0} />
        <Tooltip
          contentStyle={{ background: "#111", border: "1px solid #282828", borderRadius: 12, fontSize: 12 }}
          labelStyle={{ color: "#999" }}
          formatter={(value, name) =>
            name === "revenue" ? [formatPKR(Number(value)), "Revenue"] : [Number(value), "Orders"]
          }
        />
        <Bar yAxisId="orders" dataKey="orders" fill="#2a2a2a" radius={[4, 4, 0, 0]} barSize={12} />
        <Line yAxisId="revenue" type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
