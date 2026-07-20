"use client";

import {
  Compass,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Receipt,
  Settings,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import Logo from "@/components/ui/logo";
import { supabase } from "@/lib/supabase/client";
import useSession from "@/hooks/use-session";

const navItems = [
  { href: "/overview", labelKey: "overview", icon: LayoutDashboard },
  { href: "/explore", labelKey: "explore", icon: Compass },
  { href: "/portfolio", labelKey: "portfolio", icon: Wallet },
  { href: "/ledger", labelKey: "ledger", icon: Receipt },
  { href: "/support", labelKey: "support", icon: LifeBuoy },
  { href: "/account", labelKey: "account", icon: Settings },
] as const;

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const email = session?.user?.email ?? "";
  const initial = email.charAt(0).toUpperCase() || "?";

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="px-6 py-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-sm font-medium text-primary">
            {initial}
          </span>
          <p className="flex-1 truncate text-sm text-foreground-muted">
            {email}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-danger cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          {t("signOut")}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
