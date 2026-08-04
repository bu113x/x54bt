import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NotFound = () => {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-background px-6 py-16">
      {/* Ticker card — the signature element */}
      <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-foreground-muted">
              {t("ticker")}
            </span>
            <span className="font-mono text-3xl font-semibold text-foreground">
              404
            </span>
          </div>
          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-danger/30 bg-danger/10 px-2.5 py-1 text-xs font-medium text-danger">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger" />
            </span>
            {t("delisted")}
          </span>
        </div>

        <Sparkline />

        <p className="text-sm text-foreground-muted">{t("tickerNote")}</p>
      </div>

      {/* Message */}
      <div className="flex max-w-md flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          {t("heading")}
        </h1>
        <p className="text-sm text-foreground-muted">{t("subheading")}</p>
      </div>

      {/* Actions */}
      <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <Link
          href="/overview"
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-success/90"
        >
          {t("primaryCta")}
        </Link>
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          {t("secondaryCta")}
        </Link>
      </div>
    </div>
  );
};

const Sparkline = () => (
  <svg
    viewBox="0 0 320 96"
    className="h-24 w-full overflow-visible"
    aria-hidden="true"
  >
    {/* baseline grid */}
    <line
      x1="0"
      y1="72"
      x2="320"
      y2="72"
      className="stroke-border"
      strokeWidth="1"
      strokeDasharray="2 4"
    />

    {/* the trading line — draws in, then hands off to the gap */}
    <path
      d="M0,58 L28,50 L56,54 L84,38 L112,42 L140,26 L168,30 L196,18"
      fill="none"
      className="stroke-success [stroke-dasharray:280] [stroke-dashoffset:280] motion-safe:animate-[draw_1.1s_ease-out_forwards]"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* the gap where the asset stopped trading */}
    <path
      d="M196,18 L320,74"
      fill="none"
      className="stroke-danger opacity-0 [stroke-dasharray:4_6] motion-safe:animate-[fadeIn_0.4s_ease-out_1.1s_forwards]"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* break point marker */}
    <circle
      cx="196"
      cy="18"
      r="3.5"
      className="fill-danger opacity-0 motion-safe:animate-[fadeIn_0.3s_ease-out_1.1s_forwards]"
    />

    <style>{`
      @keyframes draw {
        to { stroke-dashoffset: 0; }
      }
      @keyframes fadeIn {
        to { opacity: 1; }
      }
    `}</style>
  </svg>
);

export default NotFound;
