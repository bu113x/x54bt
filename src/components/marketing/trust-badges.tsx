import { badges } from "@/lib/markets/data";

const TrustBadges = () => {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-3">
        {badges.map((badge) => (
          <div key={badge.title}>
            <h3
              className="text-base font-medium"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {badge.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-muted">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
