import { siteConfig } from "@/config/site";

/**
 * Placeholder landing page — exists purely to visually confirm the theme
 * tokens are wired correctly. Replace once real page development starts.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border border-border-strong px-3 py-1 text-xs uppercase tracking-widest text-foreground-muted">
        Theme preview
      </span>
      <h1
        className="text-5xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {siteConfig.name}
      </h1>
      <p className="max-w-md text-foreground-muted">
        {siteConfig.description}
      </p>
      <div className="flex gap-3">
        <button className="rounded-full bg-primary px-5 py-2.5 font-medium text-on-primary transition-colors hover:bg-primary-hover">
          Get started
        </button>
        <button className="rounded-full border border-border-strong px-5 py-2.5 font-medium text-foreground transition-colors hover:bg-surface">
          Learn more
        </button>
      </div>
      <div className="mt-8 flex gap-4 text-sm">
        <span className="text-success">▲ 4.32%</span>
        <span className="text-danger">▼ 1.08%</span>
      </div>
    </main>
  );
}
