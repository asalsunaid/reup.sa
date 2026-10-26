"use client";

import {
  CalendarCheck,
  ChartLineUp,
  CheckCircle,
  CreditCard,
  GearSix,
  House,
  IdentificationCard,
  LockSimple,
  Receipt,
  Signature,
  Users,
  Wrench,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { Dict } from "@/lib/content";

type Preview = Dict["preview"];
type Tenant = Preview["tenants"][number];

const EASE = [0.23, 1, 0.32, 1] as const;
const CYCLE_MS = 5600;

const activityIcon = {
  contract: Signature,
  payment: CreditCard,
  ticket: Wrench,
  calendar: CalendarCheck,
  check: CheckCircle,
  invoice: Receipt,
  user: IdentificationCard,
} as const;

const navIcons = [House, Users, Receipt, ChartLineUp, GearSix];

export function TenantPreview({ t }: { t: Preview }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const tenant = t.tenants[index];
  // The progress bar's CSS animation is the timer: pausing it pauses the cycle exactly where it is.
  const running = inView && !hovering && !reduce;
  const next = () => setIndex((i) => (i + 1) % t.tenants.length);

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      role="group"
      aria-label={t.label}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-[24px] border border-line bg-surface shadow-[var(--shadow-card)]">
          {/* Address bar: the tenant's own subdomain is the point of the whole demo */}
          <div className="flex h-12 items-center border-b border-line bg-surface px-4">
            <div
              dir="ltr"
              className="mx-auto flex h-8 w-full max-w-[260px] items-center justify-center gap-1.5 overflow-hidden rounded-full bg-surface-2 px-3 font-mono text-[12px] text-muted"
            >
              <LockSimple size={12} weight="bold" aria-hidden className="shrink-0" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={tenant.domain}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(8px)", filter: "blur(3px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)", filter: "blur(3px)" }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="truncate"
                >
                  <span className="text-ink">{tenant.domain.split(".")[0]}</span>.reup.sa
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[56px_1fr]">
            <aside className="hidden flex-col items-center gap-1.5 border-e border-line py-4 sm:flex" aria-hidden>
              <div className="mb-2 grid size-9 place-items-center rounded-[11px] bg-accent-fill text-[15px] font-semibold text-on-accent">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={tenant.initial}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {tenant.initial}
                  </motion.span>
                </AnimatePresence>
              </div>
              {navIcons.map((Icon, i) => (
                <span
                  key={i}
                  className={`grid size-9 place-items-center rounded-[11px] ${i === 0 ? "bg-surface-2 text-ink" : "text-subtle"}`}
                >
                  <Icon size={17} weight={i === 0 ? "fill" : "regular"} />
                </span>
              ))}
            </aside>

            <div className="relative min-h-[318px] p-4 sm:min-h-[388px] sm:p-5">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={tenant.key}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transform: "translateY(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", transition: { duration: 0.18 } }}
                  transition={{ duration: 0.42, ease: EASE }}
                >
                  <TenantBody tenant={tenant} t={t} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Floating event toast, re-enters for each tenant */}
        <div className="pointer-events-none absolute -bottom-6 end-4 z-10 hidden sm:block lg:-end-8" aria-hidden>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={tenant.key}
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(14px) scale(0.96)" }}
              animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
              exit={
                reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(6px) scale(0.98)", transition: { duration: 0.16 } }
              }
              transition={reduce ? { duration: 0.2 } : { type: "spring", duration: 0.55, bounce: 0.18, delay: 0.55 }}
              className="flex items-center gap-3 rounded-[18px] border border-line bg-surface/90 py-3 ps-3 pe-5 shadow-[var(--shadow-float)] backdrop-blur-xl"
            >
              <span className="grid size-9 place-items-center rounded-full bg-accent-soft text-accent">
                <CheckCircle size={20} weight="fill" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-ink">{tenant.toast.title}</span>
                <span className="tabular mt-0.5 block text-[12px] text-muted">{tenant.toast.body}</span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tenant switcher */}
      <div
        className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-10 sm:justify-start"
        role="group"
        aria-label={t.switcher}
      >
        {t.tenants.map((tn, i) => {
          const active = i === index;
          return (
            <button
              key={tn.key}
              type="button"
              aria-pressed={active}
              onClick={() => setIndex(i)}
              className={`group relative flex h-10 items-center gap-2 overflow-hidden rounded-full border ps-1.5 pe-3.5 text-[13px] font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${
                active
                  ? "border-line-strong bg-surface text-ink shadow-[var(--shadow-sm)]"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <span
                className={`grid size-7 place-items-center rounded-full text-[12px] font-semibold transition-colors duration-200 ${
                  active ? "bg-accent-fill text-on-accent" : "bg-surface-2 text-muted"
                }`}
                aria-hidden
              >
                {tn.initial}
              </span>
              <span>{tn.product}</span>
              <span className="sr-only">, {tn.name}</span>
              {active && !reduce && (
                <span
                  key={`bar-${index}`}
                  className="absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full bg-accent/70 rtl:origin-right"
                  style={{
                    animation: `progress ${CYCLE_MS}ms linear forwards`,
                    animationPlayState: running ? "running" : "paused",
                  }}
                  onAnimationEnd={next}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TenantBody({ tenant, t }: { tenant: Tenant; t: Preview }) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] text-subtle">{t.greeting}</p>
          <p className="mt-0.5 text-[16px] font-semibold text-ink sm:text-[17px]">{tenant.name}</p>
        </div>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] font-medium text-accent">
          {tenant.product}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-2.5">
        {tenant.kpis.map((k, i) => (
          <div key={k.label} className="rounded-[14px] border border-line bg-bg/60 p-2.5 sm:p-3">
            <p className="truncate text-[10.5px] text-subtle sm:text-[11px]">{k.label}</p>
            <p className="tabular mt-1.5 text-[15px] font-semibold leading-none text-ink sm:text-[19px]">
              {k.value}
              {/* The second KPI is revenue for every tenant */}
              {i === 1 && <span className="ms-1 text-[10px] font-medium text-subtle sm:text-[11px]">{t.currency}</span>}
            </p>
            <p className="tabular mt-1.5 text-[10.5px] font-medium text-muted">
              <bdi dir="ltr">{k.delta}</bdi>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid grid-cols-1 gap-2.5 md:grid-cols-[1.25fr_1fr]">
        <div className="rounded-[14px] border border-line p-3">
          <p className="text-[11px] font-medium text-muted">{t.chartTitle}</p>
          <AreaChart series={tenant.series} />
        </div>
        {/* Phones get KPIs and the chart only, which keeps the hero preview under one screen tall */}
        <div className="hidden rounded-[14px] border border-line p-3 sm:block">
          <p className="text-[11px] font-medium text-muted">{t.activityTitle}</p>
          <ul className="mt-2 space-y-2">
            {tenant.activity.map((a, i) => {
              const Icon = activityIcon[a.kind as keyof typeof activityIcon];
              return (
                <li key={a.text} className={`flex items-center gap-2.5 ${i === 2 ? "hidden md:flex" : ""}`}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-surface-2 text-ink">
                    <Icon size={14} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-medium text-ink">{a.text}</span>
                    <span className="tabular block text-[10.5px] text-subtle">{a.meta}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function AreaChart({ series }: { series: number[] }) {
  const id = useId();
  const reduce = useReducedMotion();
  const w = 300;
  const h = 96;
  const max = Math.max(...series) * 1.12;
  const min = Math.min(...series) * 0.7;
  const pts = series.map((v, i) => [(i / (series.length - 1)) * w, h - ((v - min) / (max - min)) * h] as const);
  // Catmull-Rom to cubic Bezier for a smooth line through every data point
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;
  const last = pts[pts.length - 1];

  return (
    // Time runs left to right in both languages, like any financial chart.
    <svg viewBox={`0 0 ${w} ${h + 4}`} className="mt-2 h-[92px] w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--line)" strokeDasharray="3 4" />
      ))}
      <motion.path
        d={area}
        fill={`url(#fill-${id})`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
      />
      <motion.circle
        cx={last[0]}
        cy={last[1]}
        r="4"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="2"
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1.05 }}
      />
    </svg>
  );
}
