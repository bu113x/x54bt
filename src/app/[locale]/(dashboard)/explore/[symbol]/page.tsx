import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import AssetPriceChart from "@/components/dashboard/asset-price-chart";
import AssetStatsGrid from "@/components/dashboard/asset-stats-grid";
import AssetDetailActions from "@/components/dashboard/asset-detail-actions";
import { getAssetBySymbol } from "@/lib/supabase/queries/asset";

const formatPrice = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AssetDetailPage = async ({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) => {
  const { symbol } = await params;
  const t = await getTranslations("AssetDetail");
  const asset = await getAssetBySymbol(symbol);

  if (!asset) notFound();

  const positive = asset.changePercent24h >= 0;
  const hasChartData = asset.priceHistory.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {asset.logo && (
            <Image
              src={asset.logo}
              alt={asset.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {asset.symbol}
            </h1>
            <p className="text-sm text-foreground-muted">{asset.name}</p>
          </div>
        </div>

        <AssetDetailActions asset={asset} />
      </div>

      <RiskDisclosureBanner compact />

      <div className="rounded-card border border-border bg-surface p-6">
        {hasChartData ? (
          <>
            <div className="flex items-baseline gap-3">
              <p
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatPrice(asset.price)}
              </p>
              <p
                className={`text-sm ${positive ? "text-success" : "text-danger"}`}
              >
                {positive ? "+" : ""}
                {asset.changePercent24h.toFixed(2)}% · {t("24h")}
              </p>
            </div>
            <div className="mt-4">
              <AssetPriceChart data={asset.priceHistory} />
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-foreground-muted">
            {t("priceDataUnavailable")}
          </p>
        )}
      </div>

      <AssetStatsGrid asset={asset} />

      <div className="rounded-card border border-border bg-surface p-6">
        <h3 className="font-semibold">{t("about")}</h3>
        <p className="mt-2 text-sm text-foreground-muted">{asset.about}</p>
      </div>

      <div className="rounded-card border border-border bg-surface p-6">
        <h3 className="font-semibold">{t("strategy")}</h3>
        <p className="mt-2 text-sm text-foreground-muted">
          {asset.strategyDescription}
        </p>
      </div>
    </div>
  );
};

export default AssetDetailPage;
