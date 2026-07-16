import Hero from "@/components/marketing/hero";
import TrustBadges from "@/components/marketing/trust-badges";
import HowItWorks from "@/components/marketing/how-it-works";
import PopularAssets from "@/components/marketing/popular-assets";
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
