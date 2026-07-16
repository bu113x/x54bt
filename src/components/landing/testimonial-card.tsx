import Image from "next/image";
import { Quote, ShieldCheck, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import CoinStack from "@/components/landing/testimonial-coin-stack";
import type { Testimonial } from "@/types/testimonial";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const t = useTranslations("Testimonials");

  return (
    <div className="relative flex flex-col rounded-card border border-border bg-surface p-6">
      <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg">
        <Quote className="h-4 w-4" fill="currentColor" />
      </span>

      <div className="flex items-center justify-between pt-2">
        <span
          className="rounded-lg bg-success/15 px-3 py-1.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="font-medium text-success">
            {testimonial.metricValue}
          </span>{" "}
          <span className="text-xs text-foreground-muted">
            {testimonial.metricLabel}
          </span>
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
          <ShieldCheck className="h-3.5 w-3.5" />
          {t("verified")}
        </span>
      </div>

      <div className="mt-3 flex text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < testimonial.rating ? "currentColor" : "none"}
          />
        ))}
      </div>

      <p className="mt-4 flex-1 text-sm text-foreground-muted">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 rounded-lg border border-border bg-surface-elevated px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
          {t("investedIn")}
        </p>
        <div className="mt-2">
          <CoinStack coins={testimonial.coins} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.investorName}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-medium">{testimonial.investorName}</p>
          <p className="text-xs text-foreground-muted">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
