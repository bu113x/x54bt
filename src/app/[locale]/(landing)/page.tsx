import Hero from "@/components/sections/hero";
import Wins from "@/components/sections/wins";
import HowItWorks from "@/components/sections/how-it-works";
import Assets from "@/components/sections/assets";
import Testimonials from "@/components/sections/testimonials";
import Faqs from "@/components/sections/faq";
import FeaturedIn from "@/components/landing/featured-in";
import Advantages from "@/components/sections/advantages";

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
