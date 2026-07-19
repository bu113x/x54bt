import { CircleDollarSign, TrendingUp, Wallet, Percent } from "lucide-react";
import { useTranslations } from "next-intl";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import StatCard from "@/components/dashboard/stat-card";
import PortfolioChart from "@/components/dashboard/portfolio-chart";
import HoldingsBreakdown from "@/components/dashboard/holdings-breakdown";
import ActivityFeed from "@/components/dashboard/activity-feed";
import {
  mockActivity,
  mockPortfolioHistory,
  mockPortfolioSummary,
  mockPositions,
} from "@/lib/content/dashboard";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const OverviewPage = () => {
  const t = useTranslations("Overview");
  const summary = mockPortfolioSummary;

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

      <RiskDisclosureBanner />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          label={t("totalValue")}
          value={formatCurrency(summary.totalValue)}
          delta={{
            value: `${summary.allTimeChangePercent}%`,
            positive: summary.allTimeChangePercent >= 0,
          }}
          sublabel={t("allTime")}
        />
        <StatCard
          icon={TrendingUp}
          label={t("netProfit")}
          value={formatCurrency(summary.totalProfit)}
          sublabel={t("afterFees")}
        />
        <StatCard
          icon={CircleDollarSign}
          label={t("totalDeposited")}
          value={formatCurrency(summary.totalDeposited)}
        />
        <StatCard
          icon={Percent}
          label={t("performanceFeePaid")}
          value={formatCurrency(summary.performanceFeePaid)}
          sublabel={t("performanceFeeNote")}
        />
      </div>

      <div className="rounded-card border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{t("portfolioPerformance")}</h3>
          <span className="text-xs text-foreground-muted">
            {t("last6Months")}
          </span>
        </div>
        <PortfolioChart data={mockPortfolioHistory} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <HoldingsBreakdown positions={mockPositions} />
        <ActivityFeed items={mockActivity} />
      </div>
    </div>
  );
};

export default OverviewPage;
