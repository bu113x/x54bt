import { getTranslations } from "next-intl/server";
import { Wallet, TrendingUp, Layers } from "lucide-react";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import StatCard from "@/components/dashboard/stat-card";
import AllocationBar from "@/components/dashboard/allocation-bar";
import PositionsTable from "@/components/dashboard/positions-table";
import {
  getAllPositions,
  getPortfolioSummary,
} from "@/lib/supabase/queries/portfolio";
import PortfolioTabs from "@/components/dashboard/portfolio-tabs";
import { formatCurrency } from "@/lib/content/format";

interface PortfolioPageProps {
  searchParams: Promise<{ tab?: string }>;
}

const PortfolioPage = async ({ searchParams }: PortfolioPageProps) => {
  const t = await getTranslations("Portfolio");
  const params = await searchParams;
  const activeTab = params.tab === "closed" ? "closed" : "active";

  const allPositions = await getAllPositions();
  const summary = await getPortfolioSummary(allPositions);

  const activeCount = allPositions.filter((p) => p.status === "active").length;
  const closedCount = allPositions.filter((p) => p.status === "closed").length;
  const positionsToShow = allPositions.filter((p) => p.status === activeTab);

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

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Wallet}
          label={t("totalValue")}
          value={formatCurrency(summary.totalValue, false)}
        />
        <StatCard
          icon={TrendingUp}
          label={t("netProfit")}
          value={formatCurrency(summary.totalProfit, false)}
          sublabel={t("afterFees")}
        />
        <StatCard
          icon={Layers}
          label={t("activePositions")}
          value={String(summary.activePositionsCount)}
        />
      </div>

      <AllocationBar
        positions={allPositions.filter((p) => p.status === "active")}
      />

      <PortfolioTabs
        activeTab={activeTab}
        activeCount={activeCount}
        closedCount={closedCount}
      />

      <PositionsTable positions={positionsToShow} />
    </div>
  );
};

export default PortfolioPage;
