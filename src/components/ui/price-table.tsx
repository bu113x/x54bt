import Link from "next/link";
import type { Asset } from "@/types/asset";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/content/format";

const PriceTable = ({ assets }: { assets: Asset[] }) => {
  return (
    <div className="overflow-hidden rounded-card border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-foreground-muted">
            <th className="px-6 py-3 font-normal">Asset</th>
            <th className="px-6 py-3 font-normal">Price</th>
            <th className="px-6 py-3 font-normal">24h</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.symbol}
              className="border-b border-border last:border-0"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/assets/${asset.symbol.toLowerCase()}`}
                  className="flex items-center gap-3 hover:underline"
                >
                  <span
                    className="font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {asset.name}
                  </span>
                  <span className="text-foreground-muted">{asset.symbol}</span>
                </Link>
              </td>
              <td
                className="px-6 py-4 tabular-nums"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {formatPrice(asset.priceUsd)}
              </td>
              <td className="px-6 py-4">
                <Badge variant={asset.change24hPct >= 0 ? "success" : "danger"}>
                  {asset.change24hPct >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(asset.change24hPct).toFixed(2)}%
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
