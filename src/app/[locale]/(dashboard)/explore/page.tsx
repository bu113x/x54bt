import { getTranslations } from "next-intl/server";
import RiskDisclosureBanner from "@/components/dashboard/risk-disclosure-banner";
import { getExplorableAssets } from "@/lib/supabase/queries/asset";
import ExplorePageClient from "@/components/dashboard/explore-page-client";

const ExplorePage = async () => {
  const t = await getTranslations("Explore");
  const assets = await getExplorableAssets();

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

      <RiskDisclosureBanner compact />

      <ExplorePageClient assets={assets} />
    </div>
  );
};

export default ExplorePage;
