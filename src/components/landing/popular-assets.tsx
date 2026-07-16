import Link from "next/link";
import PriceTable from "../ui/price-table";
import { mockAssets } from "@/lib/content/data";

const PopularAssets = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-center justify-between">
        <h2
          className="text-3xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Popular assets
        </h2>
        <Link href="/markets" className="text-sm text-primary hover:underline">
          See All Assets
        </Link>
      </div>
      <div className="mt-8">
        <PriceTable assets={mockAssets} />
      </div>
    </section>
  );
};

export default PopularAssets;
