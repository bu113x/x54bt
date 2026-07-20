"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/layout/language-switcher";
import UserMenu from "@/components/layout/user-menu";
import Logo from "../ui/logo";
import useSession from "@/hooks/use-session";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const { data: session, isPending } = useSession();

  const navLinks = [
    { href: "/assets", label: t("assets") },
    { href: "/advantages", label: t("advantages") },
    { href: "/testimonials", label: t("testimonials") },
    { href: "/how-it-works", label: t("howItWorks") },
  ];

  const isLoggedIn = !isPending && !!session?.user;

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
          <LanguageSwitcher />

          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-surface-elevated" />
          ) : isLoggedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/sign-in"
                className="hidden text-sm text-foreground-muted transition-colors hover:text-foreground sm:block"
              >
                {t("signIn")}
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="cursor-pointer">
                  {t("getStarted")}
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
