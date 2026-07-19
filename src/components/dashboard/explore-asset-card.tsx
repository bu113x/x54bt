import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MiniSparkline from "@/components/dashboard/mini-sparkline";
import RiskTierBadge from "@/components/dashboard/risk-tier-badge";
import type { ExplorableAsset } from "@/types/investment";

const formatPrice = (value: number) =>
  `$${value.toLocaleString(undefined, {
    minimumFractionDigits: value < 10 ? 4 : 2,
    maximumFractionDigits: value < 10 ? 4 : 2,
  })}`;

const ExploreAssetCard = ({ asset }: { asset: ExplorableAsset }) => {
  const t = useTranslations("Explore");
  const positive = asset.changePercent24h >= 0;

  return (
    <Link
      href={`/explore/${asset.symbol.toLowerCase()}`}
      className="flex flex-col rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary/40"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={asset.logo}
            alt={asset.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
          />
          <div>
            <p className="font-semibold">{asset.symbol}</p>
            <p className="text-xs text-foreground-muted">{asset.name}</p>
          </div>
        </div>
        <RiskTierBadge tier={asset.riskTier} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatPrice(asset.price)}
          </p>
          <p className={`text-xs ${positive ? "text-success" : "text-danger"}`}>
            {positive ? "+" : ""}
            {asset.changePercent24h.toFixed(2)}% · {t("24h")}
          </p>
        </div>
        <div className="h-10 w-24">
          <MiniSparkline
            data={asset.sparkline}
            positive={positive}
            height={40}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
        <div>
          <p className="text-foreground-muted">{t("historicalRange")}</p>
          <p className="mt-0.5 font-medium">{asset.historicalRangeLabel}</p>
        </div>
        <div className="text-right">
          <p className="text-foreground-muted">{t("minInvestment")}</p>
          <p className="mt-0.5 font-medium">${asset.minInvestment}</p>
        </div>
      </div>
    </Link>
  );
};

export default ExploreAssetCard;
