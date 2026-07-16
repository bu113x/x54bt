import type { LucideIcon } from "lucide-react";

export interface PressMention {
  name: string;
  href?: string;
}

export interface HowItWorksStep {
  id: "register" | "explore" | "deposit";
  number: string;
  icon: LucideIcon;
}

export interface QuickStat {
  id: "minPeriod" | "minInvestment" | "assetOptions";
  value: string;
  icon: LucideIcon;
}

export interface AdvantageBadge {
  value: string;
  label: string;
}

export interface Advantage {
  id:
    | "interface"
    | "marketData"
    | "fees"
    | "deposits"
    | "recurring"
    | "support";
  icon: LucideIcon;
  badge?: AdvantageBadge;
  span?: 1 | 2;
}
