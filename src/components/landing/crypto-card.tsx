import { Clock, TrendingUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export type CryptoAsset = {
  id: string;
  name: string;
  logo: StaticImageData;
  winRate: string;
  iconBg: string;
  iconColor?: string;
};

const CryptoCard = ({ asset }: { asset: CryptoAsset }) => {
  return (
    <div className="flex w-44 shrink-0 flex-col justify-between items-center gap-y-10 rounded-2xl border border-border hover:border-primary bg-surface-elevated p-5 md:w-50">
      <div className="w-full flex items-center justify-between text-foreground-muted">
        <TrendingUp className="h-5 w-5 text-success" />
        <span
          className="font-medium uppercase tracking-wide text-primary text-xs"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {asset.winRate}
        </span>
      </div>

      <Image src={asset.logo} alt={asset.name} width={100} height={100} />

      <p className="text-center text-sm font-medium text-foreground">
        {asset.name}
      </p>
    </div>
  );
};

export default CryptoCard;
