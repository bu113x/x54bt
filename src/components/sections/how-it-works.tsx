import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { steps, quickStats } from "@/lib/content/data";

const HowItWorks = () => {
  const t = useTranslations("HowItWorks");

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

      <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="rounded-card border border-border bg-surface p-6"
          >
            <div className="flex items-start justify-between">
              <span
                className="text-5xl font-bold text-success"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.number}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/15 text-success">
                <step.icon className="h-5 w-5" />
              </span>
            </div>
            <h3
              className="mt-4 text-lg font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t(`steps.${step.id}.title`)}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              {t(`steps.${step.id}.description`)}
            </p>
          </div>
        ))}
      </div>

      <Link href="/signup">
        <Button size="lg" className="mt-12">
          {t("cta")}
        </Button>
      </Link>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {quickStats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-card border border-border bg-surface p-8"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-success/15 text-success">
              <stat.icon className="h-6 w-6" />
            </span>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-success">
              {t(`quickStats.${stat.id}`)}
            </p>
            <p
              className="mt-1 text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
