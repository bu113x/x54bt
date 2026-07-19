import { useTranslations } from "next-intl";
import PositionRow from "@/components/dashboard/position-row";
import type { Position } from "@/types/investment";

const PositionsTable = ({ positions }: { positions: Position[] }) => {
  const t = useTranslations("Portfolio");

  if (positions.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border p-12 text-center text-sm text-foreground-muted">
        {t("noPositions")}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 border-b border-border px-6 py-3 text-xs uppercase tracking-wide text-foreground-muted sm:grid">
        <span>{t("asset")}</span>
        <span>{t("riskTier")}</span>
        <span>{t("invested")}</span>
        <span>{t("currentValue")}</span>
        <span className="text-right">{t("pnl")}</span>
      </div>
      <div className="divide-y divide-border">
        {positions.map((position) => (
          <PositionRow key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
};

export default PositionsTable;
