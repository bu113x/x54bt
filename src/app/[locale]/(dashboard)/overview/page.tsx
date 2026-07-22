import {
  CircleDollarSign,
  TrendingUp,
  Wallet,
  Percent,
  ChartArea,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import StatCard from "@/components/dashboard/stat-card";
import PortfolioChart from "@/components/dashboard/portfolio-chart";
import HoldingsBreakdown from "@/components/dashboard/holdings-breakdown";
import ActivityFeed from "@/components/dashboard/activity-feed";
import {
  getAllPositions,
  getPortfolioSummary,
} from "@/lib/supabase/queries/portfolio";
import { getRecentActivity } from "@/lib/supabase/queries/activity";
import { getPortfolioHistory } from "@/lib/supabase/queries/portfolio-history";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const OverviewPage = async () => {
  const t = await getTranslations("Overview");

  const allPositions = await getAllPositions();
  const [summary, recentActivity, portfolioHistory] = await Promise.all([
    getPortfolioSummary(allPositions),
    getRecentActivity(4),
    getPortfolioHistory(180),
  ]);

  const activePositions = allPositions.filter((p) => p.status === "active");

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Wallet}
          label={t("totalValue")}
          value={formatCurrency(summary.totalValue)}
          delta={{
            value: `${summary.allTimeChangePercent.toFixed(2)}%`,
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
        {portfolioHistory.length > 0 ? (
          <PortfolioChart data={portfolioHistory} />
        ) : (
          <div className="min-h-72 w-full border border-dashed border-gray-500/30 mt-5 flex flex-col justify-center items-center rounded gap-y-2">
            <ChartArea className="h-16 w-16 text-foreground-muted opacity-30" />
            <p className="text-center text-sm text-foreground-muted opacity-30">
              {t("noHistoryYet")}
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <HoldingsBreakdown positions={activePositions} />
        <ActivityFeed items={recentActivity} />
      </div>
    </div>
  );
};

export default OverviewPage;
