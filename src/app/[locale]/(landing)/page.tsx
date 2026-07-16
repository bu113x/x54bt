import Hero from "@/components/landing/hero";
import TrustBadges from "@/components/landing/trust-badges";
import HowItWorks from "@/components/landing/how-it-works";
import Assets from "@/components/sections/assets";
import Testimonials from "@/components/landing/testimonials";
import Faqs from "@/components/landing/faq";
import FeaturedIn from "@/components/landing/featured-in";

export default function Home() {
  return (
    <>
      <Hero />
      <Assets />
      <HowItWorks />
      <TrustBadges />
      <Testimonials />
      <FeaturedIn />
      <Faqs />
    </>
  );
}
