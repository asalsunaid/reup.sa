"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/content";
import { Logo } from "../logo";
import { ThemeToggle } from "../theme-toggle";
import type { V3Dict } from "./content";

export function V3Header({ nav, v3, locale }: { nav: Dict["nav"]; v3: V3Dict; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const ar = locale === "ar";
  const otherHref = ar ? "/en/v3" : "/v3";

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);

  return (
    <header className="v3-header">
      <div className="v3-headerInner">
        <a href="#top" aria-label={nav.home} className="v3-brand">
          <Logo height={22} preload />
        </a>
        <nav className="v3-desktopNav" aria-label={nav.label}>
          {v3.nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="v3-headerActions">
          <a className="v3-lang" href={otherHref} lang={nav.lang.code} hrefLang={nav.lang.code}>
            {ar ? "EN" : "عربي"}
          </a>
          <ThemeToggle locale={locale} />
          <a className="v3-btn v3-btn-dark v3-btn-sm v3-headerCta" href="#contact">
            {v3.cta}
          </a>
          <button
            className="v3-menuButton"
            type="button"
            aria-expanded={open}
            aria-controls="v3-mobile-nav"
            aria-label={open ? nav.close : nav.open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="v3-mobile-nav"
            className="v3-mobileNav"
            aria-label={nav.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.14 } }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            {v3.nav.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="v3-mobileActions">
              <a href={otherHref} lang={nav.lang.code} hrefLang={nav.lang.code} className="v3-btn v3-btn-outline">
                {nav.lang.label}
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="v3-btn v3-btn-primary">
                {v3.cta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
