"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * One pointer listener for the whole page: the card under the mouse gets --mx/--my so its
 * `.spot-cell::after` radial highlight follows the cursor. Touch and pen never trigger it.
 */
export function SpotlightGroup({ children }: { children: ReactNode }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const cell = (e.target as HTMLElement).closest<HTMLElement>(".spot-cell");
    if (!cell) return;
    const r = cell.getBoundingClientRect();
    cell.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cell.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div onPointerMove={onMove}>{children}</div>;
}

/** Product screenshot that settles from 92% to full size as it scrolls in, then tilts toward the pointer. */
export function TiltScreen({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tilt = { stiffness: 150, damping: 18 };
  const srx = useSpring(rx, tilt);
  const sry = useSpring(ry, tilt);
  const transform = useMotionTemplate`perspective(1600px) scale(${scale}) rotateX(${srx}deg) rotateY(${sry}deg)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { transform }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
