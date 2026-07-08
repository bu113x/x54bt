import Link from "next/link";
import { siteConfig } from "@/config/site";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/markets", label: "Markets" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/risk-disclosure", label: "Risk disclosure" },
    ],
  },
];

/**
 * Site-wide footer. The legal column is deliberately not optional —
 * terms/privacy/risk-disclosure links belong in the footer of every page
 * on an investment product, not just a dedicated legal page.
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.name}
            </span>
            <p className="mt-3 max-w-xs text-sm text-foreground-muted">
              {siteConfig.description}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-medium uppercase tracking-wide text-foreground-muted">
                {col.heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Investing involves risk, including possible loss of principal.</p>
        </div>
      </div>
    </footer>
  );
}
