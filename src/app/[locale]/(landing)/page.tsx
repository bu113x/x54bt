import Hero from "@/components/landing/hero";
import TrustBadges from "@/components/landing/trust-badges";
import HowItWorks from "@/components/landing/how-it-works";
import Assets from "@/components/sections/assets";
import Testimonials from "@/components/landing/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <Testimonials />
      <Assets />
    </>
  );
}
