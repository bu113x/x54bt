"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const faqIds = [
  "experience",
  "guarantee",
  "minAmount",
  "assets",
  "security",
  "depositsWithdrawals",
  "mobile",
] as const;

const Faqs = () => {
  const t = useTranslations("FAQ");
  const [openId, setOpenId] = useState<string | null>(faqIds[0]);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-medium uppercase tracking-wide text-primary">
        {t("badge")}
      </span>

      <h2
        className="mt-6 text-4xl font-bold sm:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t.rich("heading", {
          highlight: (chunks) => <span className="text-primary">{chunks}</span>,
        })}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-muted">
        {t("subheading")}
      </p>

      <div className="mt-12 space-y-4 text-left">
        {faqIds.map((id) => {
          const isOpen = openId === id;
          return (
            <div
              key={id}
              className="rounded-card border border-border bg-surface"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium">{t(`items.${id}.question`)}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-foreground-muted transition-transform",
                    isOpen && "rotate-180",
                  )}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm text-foreground-muted">
                  {t(`items.${id}.answer`)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-card border border-border bg-surface p-8">
        <p className="text-foreground-muted">{t("stillHaveQuestions")}</p>
        <Link
          href="/contact"
          className="mt-2 inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {t("contactSupport")} →
        </Link>
      </div>
    </section>
  );
};

export default Faqs;
