"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * The 8.4 MB walkthrough only starts downloading when its section is about to scroll into view,
 * plays muted on a loop while visible and pauses off-screen. Reduced motion shows the first frame
 * with native controls instead of autoplay.
 */
export function ModulesVideo({
  src,
  poster,
  label,
  width,
  height,
}: {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          if (!reduce && el.currentSrc) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="v3-appShot v3-appVideo"
      width={width}
      height={height}
      poster={poster}
      src={load ? src : undefined}
      aria-label={label}
      autoPlay={!reduce}
      controls={reduce ? true : undefined}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
