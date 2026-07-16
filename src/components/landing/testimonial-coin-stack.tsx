import Image from "next/image";
import type { TestimonialCoin } from "@/types/testimonial";

const CoinStack = ({ coins }: { coins: TestimonialCoin[] }) => {
  return (
    <div className="flex -space-x-2">
      {coins.map((coin, i) => (
        <div
          key={`${coin.alt}-${i}`}
          className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-surface bg-surface-elevated"
        >
          <Image
            src={coin.src}
            alt={coin.alt}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default CoinStack;
