import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Position } from "@/types/investment";

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const riskTierStyles: Record<Position["riskTier"], string> = {
  conservative: "bg-success/10 text-success",
  balanced: "bg-primary/10 text-primary",
  aggressive: "bg-danger/10 text-danger",
};

const HoldingsBreakdown = ({ positions }: { positions: Position[] }) => {
  const t = useTranslations("Portfolio");

  return (
    <div className="rounded-card border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h3 className="font-semibold">{t("activePositions")}</h3>
        <Link
          href="/portfolio"
          className="text-sm text-primary hover:underline"
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="divide-y divide-border">
        {positions.map((position) => (
          <Link
            key={position.id}
            href={`/explore/${position.assetSymbol.toLowerCase()}`}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface-elevated"
          >
            <div className="flex items-center gap-3">
              <Image
                src={position.assetLogo}
                alt={position.assetName}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{position.assetSymbol}</p>
                <span
                  className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${riskTierStyles[position.riskTier]}`}
                >
                  {position.riskTier}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">
                {formatCurrency(position.currentValue)}
              </p>
              <p
                className={`text-xs ${position.pnl >= 0 ? "text-success" : "text-danger"}`}
              >
                {position.pnl >= 0 ? "+" : ""}
                {position.pnlPercent.toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HoldingsBreakdown;
