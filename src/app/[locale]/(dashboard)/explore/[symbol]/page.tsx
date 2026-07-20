"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Button } from "@/components/ui/button";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import AssetPriceChart from "@/components/dashboard/asset-price-chart";
import AssetStatsGrid from "@/components/dashboard/asset-stats-grid";
import InvestModal from "@/components/dashboard/invest-modal";
import { mockAssetDetails } from "@/lib/content/dashboard";

const formatPrice = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AssetDetailPage = ({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) => {
  const { symbol } = use(params);
  const t = useTranslations("AssetDetail");
  const [modalOpen, setModalOpen] = useState(false);

  const asset = mockAssetDetails[symbol.toLowerCase()];
  if (!asset) notFound();

  const positive = asset.changePercent24h >= 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={asset.logo}
            alt={asset.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full"
          />
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

        <Button onClick={() => setModalOpen(true)} className="cursor-pointer">
          {t("investNow")}
        </Button>
      </div>

      <RiskDisclosureBanner compact />

      <div className="rounded-card border border-border bg-surface p-6">
        <div className="flex items-baseline gap-3">
          <p
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {formatPrice(asset.price)}
          </p>
          <p className={`text-sm ${positive ? "text-success" : "text-danger"}`}>
            {positive ? "+" : ""}
            {asset.changePercent24h.toFixed(2)}% · {t("24h")}
          </p>
        </div>
        <div className="mt-4">
          <AssetPriceChart data={asset.priceHistory} />
        </div>
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

      <InvestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        asset={asset}
      />
    </div>
  );
};

export default AssetDetailPage;
