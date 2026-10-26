"use client";

import { ArrowRight } from "@phosphor-icons/react";

/** Client-side twin of ForwardArrow for use inside client components. */
export function ForwardArrowClient({ size = 16 }: { size?: number }) {
  return <ArrowRight size={size} weight="bold" className="btn-arrow rtl:-scale-x-100" aria-hidden />;
}
