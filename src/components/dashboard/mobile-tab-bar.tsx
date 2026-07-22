"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { mobileTabItems } from "@/lib/content/nav-items";

const MobileTabBar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-around rounded-full border border-border bg-surface/90 py-2 shadow-2xl backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      {mobileTabItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-1 flex-col items-center gap-0.5 py-1"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-foreground-muted"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span
              className={`text-[10px] transition-colors ${
                isActive ? "font-medium text-primary" : "text-foreground-muted"
              }`}
            >
              {t(item.labelKey)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileTabBar;
