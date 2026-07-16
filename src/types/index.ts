import { LucideIcon } from "lucide-react";

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
  id: "minDeposit" | "minInvestment" | "practiceAccount";
  value: string;
  icon: LucideIcon;
}
