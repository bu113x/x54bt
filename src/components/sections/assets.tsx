import Link from "next/link";
import { Button } from "@/components/ui/button";
import CryptoMarquee from "../landing/crypto-marquee";
import type { CryptoAsset } from "../landing/crypto-card";
import {
  bitcoin,
  cardano,
  ethereum,
  litecoin,
  ripple,
  tether,
} from "@/assets/coins";
import { useTranslations } from "next-intl";

const assets: CryptoAsset[] = [
  {
    id: "usdt",
    name: "Tether USDT",
    logo: tether,
    winRate: "98% Win Rate",
    iconBg: "#26A17B",
  },
  {
    id: "eth",
    name: "Ethereum",
    logo: ethereum,
    winRate: "95% Win Rate",
    iconBg: "#FFFFFF",
    iconColor: "#0F0F10",
  },
  {
    id: "xrp",
    name: "Ripple",
    logo: ripple,
    winRate: "90% Win Rate",
    iconBg: "#0F0F10",
  },
  {
    id: "ltc",
    name: "Litecoin",
    logo: litecoin,
    winRate: "85% Win Rate",
    iconBg: "#BFBBBB",
    iconColor: "#0F0F10",
  },
  {
    id: "ada",
    name: "Cardano",
    logo: cardano,
    winRate: "90% Win Rate",
    iconBg: "#FFFFFF",
    iconColor: "#1652F0",
  },
  {
    id: "btc",
    name: "Bitcoin",
    logo: bitcoin,
    winRate: "99% Win Rate",
    iconBg: "#F7931A",
  },
];

const Assets = () => {
  const t = useTranslations("Assets");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm text-success">
        {t("badge")}
      </span>

      <h2
        className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t("heading")}
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
        {t("description")}
      </p>

      <div className="mt-14">
        <CryptoMarquee assets={assets} speed={28} />
      </div>

      <Link href="/signup">
        <Button size="lg" className="mt-10">
          {t("cta")}
        </Button>
      </Link>
    </section>
  );
};

export default Assets;
