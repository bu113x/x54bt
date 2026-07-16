import { useTranslations } from "next-intl";
import { advantages } from "@/lib/content/data";
import { cn } from "@/lib/utils";

const Advantages = () => {
  const t = useTranslations("Advantages");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-success">
        {t("badge")}
      </span>

      <h2
        className="mt-6 text-4xl font-bold sm:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t("heading")}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-muted">
        {t("subheading")}
      </p>

      <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
        {advantages.map((advantage) => (
          <div
            key={advantage.id}
            className={cn(
              "rounded-card border border-border bg-surface p-6",
              advantage.span === 2 ? "lg:col-span-2" : "lg:col-span-1",
            )}
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-success/15 text-success">
                <advantage.icon className="h-5 w-5" />
              </span>
              {advantage.badge && (
                <div className="text-right">
                  <span className="inline-flex rounded-full border border-success/30 bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                    {advantage.badge.value}
                  </span>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-foreground-muted">
                    {advantage.badge.label}
                  </p>
                </div>
              )}
            </div>

            <h3
              className="mt-4 text-lg font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t(`items.${advantage.id}.title`)}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              {t(`items.${advantage.id}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;
