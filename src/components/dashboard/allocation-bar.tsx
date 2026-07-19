import { useTranslations } from "next-intl";
import type { Position, RiskTier } from "@/types/investment";

const tierColors: Record<RiskTier, string> = {
  conservative: "bg-success",
  balanced: "bg-primary",
  aggressive: "bg-danger",
};

const AllocationBar = ({ positions }: { positions: Position[] }) => {
  const t = useTranslations("RiskTiers");
  const total = positions.reduce((sum, p) => sum + p.currentValue, 0);

  const byTier = (["conservative", "balanced", "aggressive"] as RiskTier[]).map(
    (tier) => {
      const value = positions
        .filter((p) => p.riskTier === tier)
        .reduce((sum, p) => sum + p.currentValue, 0);
      return { tier, value, percent: total > 0 ? (value / total) * 100 : 0 };
    },
  );

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <p className="text-sm font-medium">{t("allocationByRisk")}</p>

      <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-elevated">
        {byTier.map(({ tier, percent }) =>
          percent > 0 ? (
            <div
              key={tier}
              className={tierColors[tier]}
              style={{ width: `${percent}%` }}
            />
          ) : null,
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {byTier.map(({ tier, percent }) => (
          <div key={tier} className="flex items-center gap-1.5 text-xs">
            <span className={`h-2 w-2 rounded-full ${tierColors[tier]}`} />
            <span className="text-foreground-muted">{t(tier)}</span>
            <span className="font-medium">{percent.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationBar;
