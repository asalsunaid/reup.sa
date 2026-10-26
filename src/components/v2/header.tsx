"use client";
import { useEffect, useState } from "react";
import { List, X, ArrowUpLeft, ArrowUpRight } from "@phosphor-icons/react";
import type { Dict, Locale } from "@/lib/content";
import { Logo } from "../logo";
import { ThemeToggle } from "../theme-toggle";


export function V2Header({ nav, locale }: { nav: Dict["nav"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ar = locale === "ar";
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className={"v2-header"}>
      <div className={"v2-headerInner"}>
        <a href="#top" aria-label={nav.home}><Logo height={24} unoptimized preload /></a>
        <nav className={"v2-desktopNav"} aria-label={nav.label}>
          {nav.links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className={"v2-headerActions"}>
          <ThemeToggle locale={locale} />
          <a className={"v2-language"} href={ar ? "/en/v2" : "/v2"} lang={ar ? "en" : "ar"} hrefLang={ar ? "en" : "ar"}>{nav.lang.label}</a>
          <a className={"v2-headerCta"} href="#contact">{nav.cta}<Arrow size={17} aria-hidden /></a>
          <button className={"v2-menuButton"} type="button" aria-expanded={open} aria-controls="v2-mobile-nav"
            aria-label={open ? nav.close : nav.open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
      {open && <nav id="v2-mobile-nav" className={"v2-mobileNav"} aria-label={nav.label}>
        {nav.links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <a href="#contact" className={"v2-primaryButton"} onClick={() => setOpen(false)}>{nav.cta}<Arrow size={18} /></a>
      </nav>}
    </header>
  );
}
