import { useTranslations } from "next-intl";
import RiskTierBadge from "@/components/dashboard/risk-tier-badge";
import type { AssetDetail } from "@/types/investment";

const AssetStatsGrid = ({ asset }: { asset: AssetDetail }) => {
  const t = useTranslations("AssetDetail");

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-card border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground-muted">
          {t("riskTier")}
        </p>
        <div className="mt-1.5">
          <RiskTierBadge tier={asset.riskTier} />
        </div>
      </div>
      <div className="rounded-card border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground-muted">
          {t("historicalRange")}
        </p>
        <p className="mt-1.5 text-sm font-medium">
          {asset.historicalRangeLabel}
        </p>
      </div>
      <div className="rounded-card border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground-muted">
          {t("performanceFee")}
        </p>
        <p className="mt-1.5 text-sm font-medium">
          {asset.performanceFeePercent}%
        </p>
      </div>
      <div className="rounded-card border border-border bg-surface p-4">
        <p className="text-xs uppercase tracking-wide text-foreground-muted">
          {t("minInvestment")}
        </p>
        <p className="mt-1.5 text-sm font-medium">${asset.minInvestment}</p>
      </div>
    </div>
  );
};

export default AssetStatsGrid;
