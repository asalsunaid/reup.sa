"use client";

import { Buildings, CheckCircle, FirstAidKit, Receipt, Wallet } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { Dict } from "@/lib/content";
import { Reveal } from "./reveal";

type How = Dict["how"];
const EASE = [0.23, 1, 0.32, 1] as const;

export function HowItWorks({ t }: { t: How }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <section id="how" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <h2 className="display text-[2.1rem] leading-[1.25] font-semibold text-ink sm:text-[2.9rem] sm:leading-[1.2]">
              {t.title}
            </h2>
            <p className="mt-5 max-w-[30rem] text-[1.06rem] leading-[1.85] text-muted">{t.sub}</p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          {/* Progress rail, filled by scroll position through the steps */}
          <div aria-hidden className="absolute top-2 bottom-2 start-[11px] w-[2px] rounded-full bg-line sm:start-[19px]">
            <motion.div className="h-full w-full origin-top rounded-full bg-accent" style={{ scaleY: reduce ? 1 : progress }} />
          </div>
          <ol ref={listRef} className="space-y-6">
            {t.steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} einvoice={t.einvoice} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ step, index, einvoice }: { step: How["steps"][number]; index: number; einvoice: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { amount: 0.6, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  return (
    <li ref={ref} className="relative ps-9 sm:ps-14">
      <motion.span
        aria-hidden
        className="absolute top-7 start-px grid size-[22px] place-items-center rounded-full border-2 bg-bg sm:start-[9px]"
        animate={{
          borderColor: active ? "var(--accent)" : "var(--line-strong)",
          scale: active && !reduce ? 1 : 0.85,
        }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <motion.span
          className="size-2 rounded-full bg-accent"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </motion.span>

      {/* The active step is marked by its border and shadow, not by dimming the others, so all copy keeps full contrast */}
      <div
        data-active={active}
        className="rounded-[20px] border border-line bg-surface p-6 transition-[border-color,box-shadow] duration-300 data-[active=true]:border-line-strong data-[active=true]:shadow-[var(--shadow-card)] sm:p-8"
      >
        <h3 className="text-[1.3rem] font-semibold text-ink">{step.title}</h3>
        <p className="mt-2.5 max-w-[34rem] text-[1rem] leading-[1.8] text-muted">{step.body}</p>
        <div className="mt-6">
          {index === 0 && <ProvisionVisual chip={step.chip} active={active} />}
          {index === 1 && <ModulesVisual active={active} einvoice={einvoice} />}
          {index === 2 && <LiveVisual chip={step.chip} active={active} />}
        </div>
      </div>
    </li>
  );
}

function ProvisionVisual({ chip, active }: { chip: string; active: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-hidden>
      <span
        dir="ltr"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-bg px-4 font-mono text-[13px] text-ink"
      >
        <span className="text-subtle">https://</span>
        {chip}
      </span>
      <motion.span
        className="inline-flex size-10 items-center justify-center rounded-full bg-accent-soft text-accent"
        initial={false}
        animate={{ opacity: active ? 1 : 0.3, scale: active ? 1 : 0.9 }}
        transition={{ type: "spring", duration: 0.45, bounce: 0.25, delay: active ? 0.25 : 0 }}
      >
        <CheckCircle size={22} weight="fill" />
      </motion.span>
    </div>
  );
}

const modules = [
  { name: "PropUp", Icon: Buildings, on: true },
  { name: "MedUp", Icon: FirstAidKit, on: false },
  { name: "FiUp", Icon: Wallet, on: false },
  { name: "einvoice", Icon: Receipt, on: true },
];

function ModulesVisual({ active, einvoice }: { active: boolean; einvoice: string }) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5" aria-hidden>
      {modules.map((m, i) => {
        const on = m.on && active;
        return (
          <li
            key={m.name}
            className="flex items-center justify-between gap-2 rounded-[14px] border border-line bg-bg px-3.5 py-3"
          >
            <span className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink" dir="auto">
              <m.Icon size={18} className="text-muted" />
              {m.name === "einvoice" ? einvoice : m.name}
            </span>
            {/* Toggle switches flip on in sequence when this step becomes active */}
            <span
              className={`relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors duration-300 ${on ? "bg-accent" : "bg-surface-3"}`}
              style={{ transitionDelay: active ? `${i * 90 + 150}ms` : "0ms" }}
            >
              <span
                className={`absolute start-[3px] top-[3px] size-4 rounded-full bg-white shadow-sm transition-[translate] duration-300 ease-[var(--ease-out)] ${on ? "translate-x-4 rtl:-translate-x-4" : "translate-x-0"}`}
                style={{ transitionDelay: active ? `${i * 90 + 150}ms` : "0ms" }}
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function LiveVisual({ chip, active }: { chip: string; active: boolean }) {
  const bars = [38, 52, 46, 61, 58, 72, 69, 84];
  return (
    <div className="flex items-end justify-between gap-6 rounded-[16px] border border-line bg-bg p-4" aria-hidden>
      <span className="inline-flex h-8 items-center gap-2 rounded-full bg-accent-soft px-3 text-[13px] font-semibold text-accent">
        <span className="relative flex size-2">
          {active && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
          )}
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        {chip}
      </span>
      <span className="flex h-14 items-end gap-1.5" dir="ltr">
        {bars.map((b, i) => (
          <motion.span
            key={i}
            className="w-2.5 origin-bottom rounded-t-[4px] bg-accent"
            style={{ height: `${b}%`, opacity: 0.35 + i * 0.08 }}
            initial={false}
            animate={{ scaleY: active ? 1 : 0.25 }}
            transition={{ duration: 0.6, ease: EASE, delay: active ? i * 0.05 : 0 }}
          />
        ))}
      </span>
    </div>
  );
}
