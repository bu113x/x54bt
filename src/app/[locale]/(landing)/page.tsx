import Hero from "@/components/landing/hero";
import TrustBadges from "@/components/landing/trust-badges";
import HowItWorks from "@/components/landing/how-it-works";
import PopularAssets from "@/components/landing/popular-assets";
import Assets from "@/components/sections/assets";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <PopularAssets />
      <Assets />
    </>
  );
}
