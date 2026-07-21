"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import RiskTierFilter from "@/components/dashboard/risk-tier-filter";
import ExploreAssetCard from "@/components/dashboard/explore-asset-card";
import type { ExplorableAsset, RiskTier } from "@/types/investment";

const ExplorePageClient = ({ assets }: { assets: ExplorableAsset[] }) => {
  const t = useTranslations("Explore");
  const [selectedTier, setSelectedTier] = useState<RiskTier | "all">("all");
  const [search, setSearch] = useState("");

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesTier =
        selectedTier === "all" || asset.riskTier === selectedTier;
      const matchesSearch =
        asset.symbol.toLowerCase().includes(search.toLowerCase()) ||
        asset.name.toLowerCase().includes(search.toLowerCase());
      return matchesTier && matchesSearch;
    });
  }, [assets, selectedTier, search]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <RiskTierFilter selected={selectedTier} onChange={setSelectedTier} />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-primary sm:w-64"
        />
      </div>

      {filteredAssets.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-border p-12 text-center text-sm text-foreground-muted">
          {t("noResults")}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <ExploreAssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </>
  );
};

export default ExplorePageClient;
