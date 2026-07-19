"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PortfolioHistoryPoint } from "@/types/investment";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const formatMonth = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(undefined, { month: "short" });

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-xs shadow-lg">
      <p className="font-medium">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

const PortfolioChart = ({ data }: { data: PortfolioHistoryPoint[] }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--portfolio-chart-gradient-start)"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="var(--portfolio-chart-gradient-end)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatMonth}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--gold-500)", fontSize: 11 }}
          />
          <YAxis hide domain={["dataMin - 500", "dataMax + 500"]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#portfolioGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
