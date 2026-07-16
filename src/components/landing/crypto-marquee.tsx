"use client";

import CryptoCard, { CryptoAsset } from "./crypto-card";

type CryptoMarqueeProps = {
  assets: CryptoAsset[];
  speed?: number;
  direction?: "left" | "right";
};

const CryptoMarquee = ({
  assets,
  speed = 30,
  direction = "left",
}: CryptoMarqueeProps) => {
  const track = [...assets, ...assets];

  return (
    <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex gap-5 animate-crypto-marquee hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {track.map((asset, index) => (
          <CryptoCard key={`${asset.id}-${index}`} asset={asset} />
        ))}
      </div>

      <style>{`
        @keyframes crypto-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-crypto-marquee {
          animation-name: crypto-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default CryptoMarquee;
