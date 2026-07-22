import {
  Compass,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  labelKey: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/overview", labelKey: "overview", icon: LayoutDashboard },
  { href: "/explore", labelKey: "explore", icon: Compass },
  { href: "/portfolio", labelKey: "portfolio", icon: Wallet },
  { href: "/ledger", labelKey: "ledger", icon: Receipt },
  { href: "/support", labelKey: "support", icon: LifeBuoy },
  { href: "/account", labelKey: "account", icon: Settings },
];

export const mobileTabItems: NavItem[] = navItems.filter(
  (item) => item.href !== "/support",
);
