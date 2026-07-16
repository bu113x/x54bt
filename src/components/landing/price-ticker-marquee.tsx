"use client";

import { useEffect, useRef } from "react";
import type { Asset } from "@/types/asset";
import { formatPrice } from "@/lib/content/format";
import useMarqueeScroll from "@/hooks/use-marquee-scroll";

const SPEED_PX_PER_SEC = 40;
const COPIES = 4;

const TickerItem = ({ asset }: { asset: Asset }) => {
  const isUp = asset.change24hPct >= 0;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap px-5 text-sm">
      <span className="font-medium text-foreground-muted">{asset.symbol}</span>
      <span style={{ fontFamily: "var(--font-mono)" }}>
        {formatPrice(asset.priceUsd)}
      </span>
      <span
        className={isUp ? "text-success" : "text-danger"}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {isUp ? "+" : ""}
        {asset.change24hPct.toFixed(2)}%
      </span>
    </div>
  );
};

const PriceTickerMarquee = ({ assets }: { assets: Asset[] }) => {
  const { trackRef, onMouseEnter, onMouseLeave } = useMarqueeScroll({
    speed: 40,
    direction: "left",
  });
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const firstSet = track.children[0] as HTMLElement | undefined;
      setWidthRef.current = firstSet?.getBoundingClientRect().width ?? 0;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let frameId: number;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausedRef.current && setWidthRef.current > 0) {
        offsetRef.current += SPEED_PX_PER_SEC * deltaSeconds;
        if (offsetRef.current >= setWidthRef.current) {
          offsetRef.current -= setWidthRef.current;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [assets]);

  return (
    <div
      className="overflow-hidden border-b border-border bg-surface/50 py-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: COPIES }).map((_, copyIndex) => (
          <div
            key={copyIndex}
            className="flex shrink-0"
            aria-hidden={copyIndex > 0}
          >
            {assets.map((asset) => (
              <TickerItem key={`${copyIndex}-${asset.symbol}`} asset={asset} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTickerMarquee;
