import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { mockAssets } from "@/lib/markets/data";
import PriceTickerMarquee from "@/components/landing/price-ticker-marquee";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PriceTickerMarquee assets={mockAssets} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default LandingLayout;
