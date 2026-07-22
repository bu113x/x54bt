"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/layout/language-switcher";
import UserMenu from "@/components/layout/user-menu";
import Logo from "../ui/logo";
import useSession from "@/hooks/use-session";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/assets", label: t("assets") },
    { href: "/advantages", label: t("advantages") },
    { href: "/testimonials", label: t("testimonials") },
    { href: "/how-it-works", label: t("howItWorks") },
  ];

  const isLoggedIn = !isPending && !!session?.user;

  // Close the mobile menu on route change, and lock body scroll while open
  // so the page behind the overlay doesn't scroll along with it.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-surface-elevated" />
          ) : isLoggedIn ? (
            <div className="hidden sm:block">
              <UserMenu />
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden text-sm text-foreground-muted transition-colors hover:text-foreground sm:block"
              >
                {t("signIn")}
              </Link>
              <Link href="/sign-up" className="hidden sm:block">
                <Button size="sm" className="cursor-pointer">
                  {t("getStarted")}
                </Button>
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-surface-elevated md:hidden cursor-pointer"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-muted">
              {t("language")}
            </span>
            <LanguageSwitcher />
          </div>

          {isPending ? null : isLoggedIn ? (
            <div className="border-t border-border pt-3">
              <UserMenu />
            </div>
          ) : (
            <div className="flex flex-col gap-2 border-t border-border pt-3">
              <Link
                href="/sign-in"
                className="rounded-lg px-3 py-2.5 text-center text-sm text-foreground-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
              >
                {t("signIn")}
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="w-full cursor-pointer">
                  {t("getStarted")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
