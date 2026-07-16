import Hero from "@/components/landing/hero";
import Wins from "@/components/landing/wins";
import HowItWorks from "@/components/landing/how-it-works";
import Assets from "@/components/sections/assets";
import Testimonials from "@/components/landing/testimonials";
import Faqs from "@/components/landing/faq";
import FeaturedIn from "@/components/landing/featured-in";
import Advantages from "@/components/landing/advantages";

export default function Home() {
  return (
    <>
      <Hero />
      <Assets />
      <HowItWorks />
      <Wins />
      <Advantages />
      <Testimonials />
      <FeaturedIn />
      <Faqs />
    </>
  );
}
