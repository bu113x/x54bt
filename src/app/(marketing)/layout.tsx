import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/**
 * Shell for every public/marketing page (landing, markets, pricing, about,
 * legal). The (dashboard) route group gets its own layout with a sidebar
 * instead of this navbar/footer — a logged-in trading UI shouldn't carry
 * marketing chrome.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
