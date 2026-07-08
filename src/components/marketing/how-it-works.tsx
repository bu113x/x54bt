import { steps } from "@/lib/markets/data";

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2
        className="text-center text-3xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Get started in minutes
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number}>
            <span
              className="text-sm font-medium text-primary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {step.number}
            </span>
            <h3
              className="mt-2 text-lg font-medium"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step.title}
            </h3>
            <p className="mt-1 text-sm text-foreground-muted">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
