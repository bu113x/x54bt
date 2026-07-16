/**
 * Central site configuration.
 * Import this anywhere you need brand copy, URLs, or nav structure so it
 * stays in one place instead of getting hardcoded across pages.
 */

/* Investing involves risk, including possible loss of principal. */

export const siteConfig = {
  name: "Bullex",
  description: "Buy, hold, and grow your crypto portfolio.",
  url: "https://bullex.com",
  dest_url: "https://bull-ex.com",
  domain: "bullex.com",
  dest_domain: "bull-ex.com",
  dest_ref_id: "383947",
  links: {
    twitter: "https://twitter.com/bullex",
    support: "https://bullex.com/support",
  },
  support_email: "support@bullex.com",
} as const;

/**
 * Brand palette reference — mirrors the raw tokens in globals.css.
 * Prefer Tailwind utility classes (bg-primary, text-foreground, etc.) in
 * components. This export exists for the rare case you need a raw hex
 * value outside of CSS, e.g. a canvas chart, an email template, or a
 * meta theme-color tag.
 */
export const brand = {
  green: "#279B3C",
  greenLight: "#3BCE56",
  gold: "#F0B90B",
  goldLight: "#FCD535",
  shark950: "#0C0E12",
  shark900: "#1E2329",
  white: "#FFFFFF",
  marketUp: "#03A66D",
  marketDown: "#F6465D",
} as const;
