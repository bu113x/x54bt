import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/assets", label: "Assets" },
  { href: "/advantages", label: "Advantages" },
  { href: "/finance", label: "Finance" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Navbar() {
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
          <Link
            href="/login"
            className="hidden text-sm text-foreground-muted transition-colors hover:text-foreground sm:block"
          >
            Sign in
          </Link>
          <Link href="/signup">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
