import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/layout/language-switcher";

const Navbar = () => {
  const t = useTranslations("Navbar");

  const navLinks = [
    { href: "/assets", label: "Assets" },
    { href: "/advantages", label: "Advantages" },
    { href: "/finance", label: "Finance" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path
                d="M4 17V10M9 17V6M14 17V13M19 17V8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {siteConfig.name}
          </span>
        </Link>

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
          <Link
            href="/login"
            className="hidden text-sm text-foreground-muted transition-colors hover:text-foreground sm:block"
          >
            {t("signIn")}
          </Link>
          <Link href="/signup">
            <Button size="sm">{t("getStarted")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
