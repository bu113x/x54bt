import Link from "next/link";
import { Button } from "@/components/ui/button";
import LivePortfolioPreview from "./live-portfolio-preview";
import { davidK, jenniferL, lisaM, robertT } from "@/assets/investors";
import Image from "next/image";

const Hero = () => {
  const ratings = [
    { initial: "JL", avatar: jenniferL },
    { initial: "DK", avatar: davidK },
    { initial: "LM", avatar: lisaM },
    { initial: "RT", avatar: robertT },
  ];

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
          from as little as $200.
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
            <Button size="lg" className="cursor-pointer">
              Start investing
            </Button>
          </Link>
          <Link href="/markets">
            <Button variant="secondary" size="lg" className="cursor-pointer">
              View markets
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {ratings.map((rating) => (
              <div key={rating.initial} className="relative cursor-pointer">
                {rating.avatar ? (
                  <Image
                    src={rating.avatar}
                    alt={`${rating.initial} avatar`}
                    className="w-8 h-8 border-2 border-primary rounded-full"
                  />
                ) : (
                  <span
                    key={rating.initial}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-surface-elevated text-xs font-medium"
                  >
                    {rating.initial}
                  </span>
                )}
              </div>
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
