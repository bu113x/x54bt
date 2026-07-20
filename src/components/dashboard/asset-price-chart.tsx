"use client";

import { formatDate } from "@/lib/content/format";
import { useLocale } from "next-intl";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatPrice = (value: number) =>
  `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

const CustomTooltip = ({
  active,
  payload,
  locale,
}: {
  active?: boolean;
  payload?: { value: number; payload: { date: string } }[];
  locale: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-xs shadow-lg">
      <p className="font-medium">{formatPrice(payload[0].value)}</p>
      <p className="mt-0.5 text-foreground-muted">
        {formatDate(payload[0].payload.date, locale)}
      </p>
    </div>
  );
};

const AssetPriceChart = ({
  data,
}: {
  data: { date: string; price: number }[];
}) => {
  const locale = useLocale();

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="assetPriceGradient" x1="0" y1="0" x2="0" y2="1">
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
            tickFormatter={(d) => formatDate(d, locale)}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-fg-muted)", fontSize: 11 }}
            minTickGap={40}
          />
          <YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
          <Tooltip content={<CustomTooltip locale={locale} />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#assetPriceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AssetPriceChart;
