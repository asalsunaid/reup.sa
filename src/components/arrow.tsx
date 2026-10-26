import { ArrowRight } from "@phosphor-icons/react/ssr";

/** Forward arrow that points along the reading direction (left in Arabic, right in English). */
export function ForwardArrow({ size = 16, className = "" }: { size?: number; className?: string }) {
  return <ArrowRight size={size} weight="bold" className={`btn-arrow rtl:-scale-x-100 ${className}`} aria-hidden />;
}
