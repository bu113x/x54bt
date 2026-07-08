import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { mockAssets } from "@/lib/markets/data";
import PriceTickerMarquee from "@/components/marketing/price-ticker-marquee";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PriceTickerMarquee assets={mockAssets} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default MarketingLayout;
