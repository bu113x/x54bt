import Link from "next/link";
import { Button } from "@/components/ui/button";
import LivePortfolioPreview from "./live-portfolio-preview";

const Hero = () => {
  const avatarInitials = ["JD", "MK", "SA", "RT"];

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-20 pt-20 lg:grid-cols-2">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-sm text-success">
          <span className="h-2 w-2 rounded-full bg-success" />
          2,847 investors joined this month
        </span>

        <h1
          className="mt-6 text-5xl font-bold leading-[1.1] sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Buy, hold, and grow
          <br />
          <span className="text-primary">your crypto portfolio</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-foreground-muted">
          Invest in Bitcoin, Ethereum, and 50+ other cryptocurrencies. Start
          from as little as $10.
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-8">
          <div>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              $120M+
            </p>
            <p className="text-sm text-foreground-muted">Assets managed</p>
          </div>
          <div>
            <p
              className="text-3xl font-bold text-success"
              style={{ fontFamily: "var(--font-display)" }}
            >
              50+
            </p>
            <p className="text-sm text-foreground-muted">Cryptocurrencies</p>
          </div>
          <div>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              40K+
            </p>
            <p className="text-sm text-foreground-muted">Investors</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/signup">
            <Button size="lg">Start investing</Button>
          </Link>
          <Link href="/markets">
            <Button variant="secondary" size="lg">
              View markets
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatarInitials.map((initials) => (
              <span
                key={initials}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-surface-elevated text-xs font-medium"
              >
                {initials}
              </span>
            ))}
          </div>
          <div>
            <div className="flex text-primary">{"★★★★★"}</div>
            <p className="text-xs text-foreground-muted">
              4.9/5 from 2,847 investors
            </p>
          </div>
        </div>
      </div>

      <LivePortfolioPreview />
    </section>
  );
};

export default Hero;
