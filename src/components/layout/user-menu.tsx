"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";
import useSession from "@/hooks/use-session";

const UserMenu = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) return null;

  const email = session.user.email ?? "";
  const initial = email.charAt(0).toUpperCase() || "?";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 transition-colors hover:bg-surface-elevated cursor-pointer"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
          {initial}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-foreground-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-card border border-border bg-surface p-1.5 shadow-xl">
          <div className="px-3 py-2">
            <p className="truncate text-sm font-medium">{email}</p>
          </div>
          <div className="my-1 h-px bg-border" />
          <Link
            href="/overview"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            {t("dashboard")}
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-danger cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            {t("signOut")}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
