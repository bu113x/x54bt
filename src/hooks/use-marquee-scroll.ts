"use client";

import { useEffect, useRef } from "react";

interface UseMarqueeScrollOptions {
  speed?: number;
  direction?: "left" | "right";
}

function useMarqueeScroll({
  speed = 40,
  direction = "left",
}: UseMarqueeScrollOptions = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let setWidth = 0;
    let offset = 0;

    const measure = () => {
      const firstSet = track.children[0] as HTMLElement | undefined;
      setWidth = firstSet?.getBoundingClientRect().width ?? 0;
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    let frameId: number;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const deltaSeconds = (time - lastTime) / 1000;
      lastTime = time;

      if (!pausedRef.current && setWidth > 0) {
        const delta = speed * deltaSeconds;
        offset += direction === "left" ? delta : -delta;

        if (offset >= setWidth) offset -= setWidth;
        if (offset < 0) offset += setWidth;

        track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [speed, direction]);

  return {
    trackRef,
    onMouseEnter: () => {
      pausedRef.current = true;
    },
    onMouseLeave: () => {
      pausedRef.current = false;
    },
  };
}

export default useMarqueeScroll;
