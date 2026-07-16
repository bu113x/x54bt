import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cryptoAssets } from "@/lib/content/data";

type CryptoAsset = (typeof cryptoAssets)[number];

const Sparkline = ({
  data,
  positive,
}: {
  data: number[];
  positive: boolean;
}) => {
  const width = 200;
  const height = 60;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const color = positive ? "var(--success)" : "var(--danger)";
  const areaPoints = `0,${height} ${points.join(" ")} ${width},${height}`;
  const gradientId = `sparkline-${positive ? "up" : "down"}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-4 h-16 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const formatPrice = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: value < 10 ? 4 : 2,
    maximumFractionDigits: value < 10 ? 4 : 2,
  });

const AssetCard = ({
  asset,
  bidLabel,
  askLabel,
}: {
  asset: CryptoAsset;
  bidLabel: string;
  askLabel: string;
}) => {
  const positive = asset.changePercent >= 0;
  const priceColor = positive ? "text-success" : "text-danger";

  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <Image
          src={asset.logo}
          alt={asset.name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{asset.symbol}</p>
          <p className="text-xs uppercase tracking-wide text-foreground-muted">
            {asset.name}
          </p>
        </div>
      </div>

      <p
        className={`mt-4 text-3xl font-bold ${priceColor}`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {formatPrice(asset.price)}
      </p>

      <Sparkline data={asset.sparkline} positive={positive} />

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-foreground-muted">
            {bidLabel}
          </p>
          <p className="font-medium">{formatPrice(asset.bid)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-foreground-muted">
            {askLabel}
          </p>
          <p className="font-medium">{formatPrice(asset.ask)}</p>
        </div>
      </div>
    </div>
  );
};

const PopularAssets = () => {
  const t = useTranslations("Markets");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-center justify-between">
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("popularAssets")}
        </h2>
        <Link href="/explore" className="text-sm text-primary hover:underline">
          {t("seeAll")}
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cryptoAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            bidLabel={t("bid")}
            askLabel={t("ask")}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularAssets;
