"use client";

import useMarqueeScroll from "@/hooks/use-marquee-scroll";
import {
  ShieldCheck,
  Zap,
  Headphones,
  Activity,
  Receipt,
  Repeat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface Chip {
  icon: LucideIcon;
  label: string;
}

function ChipRow({
  chips,
  direction,
}: {
  chips: Chip[];
  direction: "left" | "right";
}) {
  const { trackRef, onMouseEnter, onMouseLeave } = useMarqueeScroll({
    speed: 25,
    direction,
  });

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: 4 }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            className="flex shrink-0"
            aria-hidden={copyIndex > 0}
          >
            {chips.map((chip, i) => (
              <div
                key={`${copyIndex}-${i}`}
                className="mx-2 flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm"
              >
                <chip.icon className="h-4 w-4 text-success" />
                {chip.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Wins() {
  const t = useTranslations("Wins");
  const tAdv = useTranslations("Advantages");

  const rowA: Chip[] = [
    { icon: ShieldCheck, label: t("secureTitle") },
    { icon: Zap, label: t("verificationTitle") },
    { icon: Headphones, label: t("supportTitle") },
    { icon: Activity, label: tAdv("items.marketData.title") },
  ];

  const rowB: Chip[] = [
    { icon: Receipt, label: tAdv("items.fees.title") },
    { icon: Repeat, label: tAdv("items.recurring.title") },
    { icon: ShieldCheck, label: t("secureTitle") },
    { icon: Headphones, label: t("supportTitle") },
  ];

  return (
    <section className="space-y-4 bg-surface/30 py-10">
      <ChipRow chips={rowA} direction="left" />
      <ChipRow chips={rowB} direction="right" />
    </section>
  );
}

export default Wins;
