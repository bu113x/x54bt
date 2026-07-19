"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Wallet, TrendingUp, Layers } from "lucide-react";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import StatCard from "@/components/dashboard/stat-card";
import AllocationBar from "@/components/dashboard/allocation-bar";
import TabGroup from "@/components/dashboard/tab-group";
import PositionsTable from "@/components/dashboard/positions-table";
import {
  mockClosedPositions,
  mockPortfolioSummary,
  mockPositions,
} from "@/lib/content/dashboard";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type Tab = "active" | "closed";

const PortfolioPage = () => {
  const t = useTranslations("Portfolio");
  const [tab, setTab] = useState<Tab>("active");

  const summary = mockPortfolioSummary;
  const positionsToShow =
    tab === "active" ? mockPositions : mockClosedPositions;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("heading")}
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">{t("subheading")}</p>
      </div>

      <RiskDisclosureBanner compact />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Wallet}
          label={t("totalValue")}
          value={formatCurrency(summary.totalValue)}
        />
        <StatCard
          icon={TrendingUp}
          label={t("netProfit")}
          value={formatCurrency(summary.totalProfit)}
          sublabel={t("afterFees")}
        />
        <StatCard
          icon={Layers}
          label={t("activePositions")}
          value={String(summary.activePositionsCount)}
        />
      </div>

      <AllocationBar positions={mockPositions} />

      <div>
        <TabGroup<Tab>
          tabs={[
            {
              value: "active",
              label: t("active"),
              count: mockPositions.length,
            },
            {
              value: "closed",
              label: t("closed"),
              count: mockClosedPositions.length,
            },
          ]}
          active={tab}
          onChange={setTab}
        />

        <div className="mt-4">
          <PositionsTable positions={positionsToShow} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
