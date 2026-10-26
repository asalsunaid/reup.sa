"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Scroll-in reveal: rises and un-blurs once. Reduced motion keeps only the fade. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: `translateY(${y}px)`, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.3 : 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
