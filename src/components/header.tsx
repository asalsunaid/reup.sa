"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import type { Dict } from "@/lib/content";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Header({ t }: { t: Dict["nav"] }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        data-scrolled={scrolled || open}
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border border-transparent ps-5 pe-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-surface/75 data-[scrolled=true]:shadow-[var(--shadow-float)] data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150"
      >
        <a href="#top" aria-label={t.home} className="flex items-center rounded-md py-2">
          <Logo height={20} preload />
        </a>

        <nav className="hidden lg:block" aria-label={t.label} onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center">
            {t.links.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  className="relative z-10 block rounded-full px-4 py-2 text-[0.94rem] font-medium text-muted transition-colors duration-200 hover:text-ink"
                >
                  {l.label}
                </a>
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.32, bounce: 0.12 }}
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle locale={t.lang.code === "en" ? "ar" : "en"} />
          <a
            href={t.lang.href}
            hrefLang={t.lang.code}
            lang={t.lang.code}
            className="hidden h-10 items-center rounded-full px-3.5 text-[0.9rem] font-medium text-muted transition-colors duration-200 hover:text-ink sm:inline-flex"
          >
            {t.lang.label}
          </a>
          <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            {t.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.close : t.open}
            className="btn btn-ghost btn-sm !h-11 !w-11 !px-0 lg:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px) scale(0.98)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px) scale(0.98)", transition: { duration: 0.15 } }
            }
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto mt-2 max-w-[1240px] rounded-[20px] border border-line bg-surface/95 p-2 shadow-[var(--shadow-float)] backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {t.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-[14px] px-4 py-3.5 text-base font-medium text-ink transition-colors duration-200 active:bg-surface-2"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line p-2 pt-4">
              <a href={t.lang.href} hrefLang={t.lang.code} lang={t.lang.code} className="btn btn-ghost btn-sm">
                {t.lang.label}
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary btn-sm">
                {t.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
