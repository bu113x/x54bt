import type { Asset } from "@/types/asset";
import { formatPrice } from "@/lib/markets/format";

const TickerItem = ({ asset }: { asset: Asset }) => {
  const isUp = asset.change24hPct >= 0;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-5 text-sm">
      <span className="font-medium text-foreground-muted">{asset.symbol}</span>
      <span style={{ fontFamily: "var(--font-mono)" }}>
        {formatPrice(asset.priceUsd)}
      </span>
      <span
        className={isUp ? "text-success" : "text-danger"}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {isUp ? "+" : ""}
        {asset.change24hPct.toFixed(2)}%
      </span>
    </div>
  );
};

const PriceTickerMarquee = ({ assets }: { assets: Asset[] }) => {
  return (
    <div className="overflow-hidden border-b border-border bg-surface/50 py-2">
      <div className="flex w-max animate-marquee">
        {[...assets, ...assets].map((asset, i) => (
          <TickerItem key={`${asset.symbol}-${i}`} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default PriceTickerMarquee;
