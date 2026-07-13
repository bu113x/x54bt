import { Badge } from "@/components/ui/badge";

const LivePortfolioPreview = () => {
  return (
    <div className="relative rounded-card border border-border bg-surface p-6 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-on-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M4 17V10M9 17V6M14 17V13M19 17V8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-medium">Portfolio preview</p>
            <p className="text-xs text-foreground-muted">Sample data</p>
          </div>
        </div>
        <Badge variant="success">+18.4%</Badge>
      </div>

      <div className="relative mt-6">
        <p className="text-xs text-foreground-muted">Total balance</p>
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
            <p className="font-medium">BTC bought +2.1%</p>
            <p className="text-foreground-muted">Just now</p>
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

        {/* Floating notification chip — overlaps the bottom-right of the chart */}
        <div className="animate-float-chip-delayed absolute -bottom-3 right-0 flex items-center gap-2 rounded-xl border border-border bg-surface-elevated px-3 py-2 shadow-lg sm:right-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
            $
          </span>
          <div className="text-xs">
            <p className="font-medium">+$240 profit</p>
            <p className="text-foreground-muted">ETH sold</p>
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
          <p className="text-xs text-foreground-muted">Assets held</p>
        </div>
        <div className="text-center">
          <p
            className="text-lg font-bold text-success"
            style={{ fontFamily: "var(--font-display)" }}
          >
            +18.4%
          </p>
          <p className="text-xs text-foreground-muted">This month</p>
        </div>
        <div className="text-center">
          <p
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            0.1%
          </p>
          <p className="text-xs text-foreground-muted">Trade fee</p>
        </div>
      </div>
    </div>
  );
};

export default LivePortfolioPreview;
