import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { davidK, jenniferL, lisaM, robertT } from "@/assets/investors";
import LivePortfolioPreview from "../landing/live-portfolio-preview";

const Hero = () => {
  const t = useTranslations("Hero");

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
          {t("badge")}
        </span>

        <h1
          className="mt-6 text-5xl font-bold leading-[1.1] sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("headlineLine1")}
          <br />
          <span className="text-primary">{t("headlineHighlight")}</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-foreground-muted">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-8">
          <div>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              $120M+
            </p>
            <p className="text-sm text-foreground-muted">
              {t("statAssetsManaged")}
            </p>
          </div>
          <div>
            <p
              className="text-3xl font-bold text-success"
              style={{ fontFamily: "var(--font-display)" }}
            >
              50+
            </p>
            <p className="text-sm text-foreground-muted">
              {t("statCryptocurrencies")}
            </p>
          </div>
          <div>
            <p
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              40K+
            </p>
            <p className="text-sm text-foreground-muted">
              {t("statInvestors")}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/sign-up">
            <Button size="lg" className="cursor-pointer">
              {t("startInvesting")}
            </Button>
          </Link>
          <Link href="/markets">
            <Button variant="secondary" size="lg" className="cursor-pointer">
              {t("viewMarkets")}
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
            <p className="text-xs text-foreground-muted">{t("ratingLabel")}</p>
          </div>
        </div>
      </div>

      <LivePortfolioPreview />
    </section>
  );
};

export default Hero;
