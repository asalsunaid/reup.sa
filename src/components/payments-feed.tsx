"use client";

import { AppleLogo, CreditCard } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/content";

type Payments = Dict["platform"]["payments"];

function MethodMark({ method }: { method: string }) {
  if (method === "Apple Pay") return <AppleLogo size={17} weight="fill" />;
  if (method === "مدى" || method === "mada")
    return <span className="font-mono text-[10px] font-semibold tracking-tight">mada</span>;
  return <CreditCard size={17} />;
}

export function PaymentsFeed({ t }: { t: Payments }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  // Feed holds a rolling window of entries; each id is unique so AnimatePresence can track enter/exit.
  const [feed, setFeed] = useState(() => [2, 1, 0].map((n) => ({ id: n, item: t.items[n % t.items.length] })));

  useEffect(() => {
    if (!inView || reduce) return;
    const timer = setInterval(() => {
      setFeed((f) => {
        const id = f[0].id + 1;
        return [{ id, item: t.items[id % t.items.length] }, ...f].slice(0, 3);
      });
    }, 2600);
    return () => clearInterval(timer);
  }, [inView, reduce, t.items]);

  return (
    <div
      ref={ref}
      className="relative h-[212px] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
      aria-hidden
    >
      <ul className="flex flex-col gap-2.5">
        <AnimatePresence initial={false} mode="popLayout">
          {feed.map(({ id, item }, i) => (
            <motion.li
              key={id}
              layout={!reduce}
              initial={{ opacity: 0, transform: "translateY(-12px) scale(0.97)" }}
              animate={{ opacity: i === 0 ? 1 : 0.9 - i * 0.18, transform: "translateY(0px) scale(1)" }}
              exit={{ opacity: 0, transform: "translateY(10px) scale(0.97)", transition: { duration: 0.2 } }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-surface p-3 shadow-[var(--shadow-sm)]"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-surface-2 text-ink">
                <MethodMark method={item.method} />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-[13px] font-semibold text-ink">{t.received}</span>
                <span className="mt-0.5 block truncate text-[12px] text-subtle">
                  {item.method} <span dir="ltr">{item.detail}</span>
                </span>
              </span>
              <span className="tabular shrink-0 text-[14px] font-semibold text-ink">
                <span dir="ltr">+{item.amount}</span> <span className="text-[11px] font-medium text-subtle">{t.currency}</span>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
