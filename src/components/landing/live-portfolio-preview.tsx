import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { SmallLogo } from "@/components/ui/logo";

const LivePortfolioPreview = () => {
  const t = useTranslations("LivePortfolioPreview");

  return (
    <div className="relative rounded-card border border-border bg-surface p-6 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SmallLogo />
          <div>
            <p className="text-sm font-medium">{t("title")}</p>
            <p className="text-xs text-foreground-muted">{t("sampleData")}</p>
          </div>
        </div>
        <Badge variant="success">+18.4%</Badge>
      </div>

      <div className="relative mt-6">
        <p className="text-xs text-foreground-muted">{t("totalBalance")}</p>
        <p
          className="text-4xl font-bold tabular-nums"
          style={{ fontFamily: "var(--font-display)" }}
        >
          $24,832.10
        </p>

        <div className="animate-float-chip absolute -right-2 top-1 flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 shadow-lg sm:right-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/15 text-success">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="text-xs">
            <p className="font-medium">{t("btcBought")}</p>
            <p className="text-foreground-muted">{t("justNow")}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <svg
          viewBox="0 0 400 120"
          className="w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-success)"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="var(--color-success)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <path
            d="M0,90 L40,95 L80,70 L120,80 L160,60 L200,65 L240,40 L280,45 L320,20 L360,15 L400,10 L400,120 L0,120 Z"
            fill="url(#sparkline-fill)"
          />
          <path
            d="M0,90 L40,95 L80,70 L120,80 L160,60 L200,65 L240,40 L280,45 L320,20 L360,15 L400,10"
            fill="none"
            stroke="var(--color-success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="animate-float-chip-delayed absolute -bottom-3 right-0 flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 shadow-lg sm:right-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
            $
          </span>
          <div className="text-xs">
            <p className="font-medium">{t("ethProfit")}</p>
            <p className="text-foreground-muted">{t("ethSold")}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-6">
        <div className="text-center">
          <p
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            12
          </p>
          <p className="text-xs text-foreground-muted">{t("assetsHeld")}</p>
        </div>
        <div className="text-center">
          <p
            className="text-lg font-bold text-success"
            style={{ fontFamily: "var(--font-display)" }}
          >
            +18.4%
          </p>
          <p className="text-xs text-foreground-muted">{t("thisMonth")}</p>
        </div>
        <div className="text-center">
          <p
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            0.1%
          </p>
          <p className="text-xs text-foreground-muted">{t("tradeFee")}</p>
        </div>
      </div>
    </div>
  );
};

export default LivePortfolioPreview;
