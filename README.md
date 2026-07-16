# Bullex

Crypto investment platform. Buy, hold, and grow a crypto portfolio.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript, src/ dir)
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-first config via `@theme` in `globals.css`, no `tailwind.config.js`
- [better-auth](https://better-auth.com) — installed, not yet configured (`src/lib/auth`)
- [NOWPayments](https://nowpayments.io) — crypto deposit collection, REST wrapper placeholder (`src/lib/payments`)
- [Smartsupp](https://smartsupp.com) — support widget, placeholder component (`src/components/integrations`)

## Folder structure

```
src/
  app/                    routes (App Router)
  components/
    ui/                   generic, reusable UI primitives (buttons, inputs, cards...)
    layout/                header, footer, shell components
    landing/              landing page sections
    integrations/          third-party widget wrappers (Smartsupp, etc.)
  lib/
    auth/                  better-auth config and helpers
    payments/              NOWPayments client + webhook handling
  hooks/                  shared React hooks
  types/                  shared TypeScript types
  config/
    site.ts                site metadata + brand palette reference
```

## Theme

Color tokens live in `src/app/globals.css`, defined as CSS custom properties
and mapped into Tailwind via `@theme inline`. Palette is Binance-derived:

| Token              | Value     | Use                                  |
|--------------------|-----------|---------------------------------------|
| `--gold-500`       | `#F0B90B` | Primary brand color, CTAs             |
| `--gold-400`       | `#FCD535` | Hover/highlight state on primary      |
| `--shark-950`      | `#0C0E12` | Base background (dark, default)      |
| `--shark-900`      | `#1E2329` | Card / surface background            |
| `--shark-800`      | `#2B3139` | Elevated surface, borders             |
| `--white`          | `#FFFFFF` | Primary text on dark                  |
| `--market-up`       | `#03A66D` | Price increase / positive state      |
| `--market-down`     | `#F6465D` | Price decrease / negative state      |

Use the **semantic** Tailwind classes in components — `bg-background`,
`bg-surface`, `text-foreground`, `bg-primary`, `text-success`, etc. — rather
than raw hex or the `gold-*`/`shark-*` scale directly. That's what makes a
future re-theme (e.g. a light mode pass) a token edit instead of a
find-and-replace across the codebase.

Light mode exists as an opt-in via `[data-theme="light"]` on `<html>`, but
dark is the default shell — not currently toggled anywhere.

## Fonts

- **Inter** — body text
- **Space Grotesk** — display/headings (`var(--font-display)`)
- **Geist Mono** — numeric data, tickers, code

## Getting started

```bash
cp .env.example .env.local   # fill in real values
npm install
npm run dev
```

## Not done yet (by design)

This is setup only — no auth flow, no payment flow, no real pages. Folder
structure and env vars are in place so the next phase of work has an
obvious place to land.
