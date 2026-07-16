import { featuredIn } from "@/lib/content/data";
import { useTranslations } from "next-intl";

const FeaturedIn = () => {
  const t = useTranslations("FeaturedIn");

  return (
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-surface/50 px-8 py-6 sm:flex-row sm:justify-between">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-foreground-muted">
          {t("label")}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {featuredIn.map((mention) => (
            <span
              key={mention.name}
              className="text-lg font-bold text-foreground-muted/70"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {mention.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedIn;
