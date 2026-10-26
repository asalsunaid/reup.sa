"use client";

import { Buildings, ChatsCircle, Check, CheckCircle, FirstAidKit, Receipt, Wallet } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image, { getImageProps } from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { preload } from "react-dom";
import type { Dict } from "@/lib/content";
import { Reveal } from "./reveal";

const EASE = [0.23, 1, 0.32, 1] as const;
const SIZES = "(min-width: 1024px) 700px, 100vw";
const icons = { propup: Buildings, medup: FirstAidKit, fiup: Wallet, cxup: ChatsCircle, einvoice: Receipt } as const;

// Warm a tab's photo while the pointer is on its way to the click, so the swap never shows an empty frame.
const warm = (src: string) => {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: SIZES });
  preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "low" });
};

export function Solutions({ t }: { t: Dict["solutions"] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  const item = t.items[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = document.documentElement.dir === "rtl";
    const n = t.items.length;
    const keys: Record<string, number> = {
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
    };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="solutions" className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-indigo py-20 text-on-indigo sm:rounded-[48px] sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 -top-48 mx-auto h-[520px] w-[820px] max-w-full rounded-full bg-accent/25 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Reveal className="max-w-[44rem]">
            <p className="inline-flex h-8 items-center rounded-full border border-white/15 bg-white/5 px-3.5 text-[13px] font-medium text-white/80">
              {t.eyebrow}
            </p>
            <h2 className="display mt-5 text-[2.1rem] leading-[1.25] font-semibold text-white sm:text-[2.9rem] sm:leading-[1.2]">
              {t.title}
            </h2>
            <p className="mt-5 max-w-[36rem] text-[1.06rem] leading-[1.85] text-white/70">{t.sub}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label={t.tablistLabel}
              onKeyDown={onKeyDown}
              className="-mx-5 mt-12 flex snap-x scroll-px-5 gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
            >
              {t.items.map((it, i) => {
                const Icon = icons[it.key as keyof typeof icons];
                const selected = i === active;
                return (
                  <button
                    key={it.key}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${it.key}`}
                    aria-selected={selected}
                    aria-controls={`panel-${it.key}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onPointerEnter={() => warm(it.image)}
                    onFocus={() => warm(it.image)}
                    className={`relative flex h-12 shrink-0 snap-start items-center gap-2.5 rounded-full ps-3 pe-5 text-[0.95rem] font-medium transition-[color,transform] duration-200 active:scale-[0.97] ${
                      selected ? "text-indigo" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="solution-tab"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.14 }}
                        aria-hidden
                      />
                    )}
                    {!selected && <span className="absolute inset-0 rounded-full border border-white/12" aria-hidden />}
                    <Icon size={19} weight={selected ? "fill" : "regular"} className="relative" aria-hidden />
                    <span className="relative" dir="auto">
                      {it.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div className="mt-10 sm:mt-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.key}
                id={`panel-${item.key}`}
                role="tabpanel"
                aria-labelledby={`tab-${item.key}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "translateY(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(4px)", transition: { duration: 0.14 } }}
                transition={{ duration: 0.42, ease: EASE }}
                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                <div className="relative lg:col-span-7">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[24px] bg-indigo-2 ring-1 ring-white/10 sm:rounded-[28px]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes={SIZES}
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-indigo/50 via-transparent to-transparent"
                    />
                  </div>
                  {/* Product event card riding the image edge */}
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px) scale(0.96)" }}
                    animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                    transition={reduce ? { duration: 0.2 } : { type: "spring", duration: 0.55, bounce: 0.16, delay: 0.2 }}
                    className="absolute -bottom-6 end-5 flex items-center gap-3 rounded-[18px] border border-line bg-surface py-3 ps-3 pe-5 text-ink shadow-[var(--shadow-float)] sm:end-8"
                    aria-hidden
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-accent">
                      <CheckCircle size={20} weight="fill" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[13px] font-semibold">{item.float.title}</span>
                      <span className="tabular mt-0.5 block text-[12px] text-muted">{item.float.body}</span>
                    </span>
                  </motion.div>
                </div>

                <div className="pt-4 lg:col-span-5 lg:pt-0">
                  <p className="text-[0.95rem] font-medium text-[#ff7fb3]">
                    <span dir="auto">{item.name}</span>
                    <span className="mx-2 text-white/30">/</span>
                    {item.sector}
                  </p>
                  <h3 className="display-tight mt-3 text-[1.7rem] leading-[1.35] font-semibold text-white sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1.03rem] leading-[1.85] text-white/70">{item.body}</p>
                  <ul className="mt-7 space-y-3.5">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[0.98rem] text-white/90">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                          <Check size={13} weight="bold" aria-hidden />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="btn mt-9 border border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
                  >
                    {t.cta}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
