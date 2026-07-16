import { useTranslations } from "next-intl";
import TestimonialCard from "@/components/landing/testimonial-card";
import { mockTestimonials } from "@/lib/content/data";

const Testimonials = () => {
  const t = useTranslations("Testimonials");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm text-success">
        {t("badge")}
      </span>

      <h2
        className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {t.rich("heading", {
          highlight: (chunks) => <span className="text-success">{chunks}</span>,
        })}
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-muted">
        {t("subheading")}
      </p>

      <div className="mt-14 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
        {mockTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
