"use client";

import { CalendarBlank, ChartBar, GearSix, Receipt } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Dict } from "@/lib/content";

const permissionIcons = [CalendarBlank, Receipt, ChartBar, GearSix];
// Owner sees everything, the accountant sees money, the front desk sees the calendar.
const initialMatrix = [
  [true, true, true, true],
  [false, true, true, false],
  [true, false, false, false],
];

/** Team roles with a permission strip; each permission is a toggle visitors can flip. */
export function RolesList({ t }: { t: Dict["platform"]["roles"] }) {
  const [matrix, setMatrix] = useState(initialMatrix);
  const reduce = useReducedMotion();

  const flip = (i: number, j: number) =>
    setMatrix((m) => m.map((row, r) => (r === i ? row.map((v, c) => (c === j ? !v : v)) : row)));

  return (
    <ul className="mt-auto space-y-2.5">
      {t.people.map((p, i) => (
        <li key={p.name} className="flex items-center gap-3 rounded-[14px] border border-line bg-bg/50 p-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo text-[13px] font-semibold text-on-indigo dark:bg-surface-3">
            {p.initial}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[13px] font-semibold text-ink">{p.name}</span>
            <span className="mt-0.5 block text-[12px] text-subtle">{p.role}</span>
          </span>
          <span className="flex gap-1">
            {permissionIcons.map((Icon, j) => {
              const on = matrix[i][j];
              const tile = `grid size-6 place-items-center rounded-[7px] transition-colors duration-200 ${
                on ? "bg-accent-soft text-accent" : "text-subtle/60"
              }`;
              return (
                <button
                  key={j}
                  type="button"
                  aria-pressed={on}
                  aria-label={`${p.name}: ${t.permissions[j]} ${on ? t.allowed : t.blocked}`}
                  title={t.permissions[j]}
                  onClick={() => flip(i, j)}
                  className={`${tile} cursor-pointer outline-offset-2 hover:bg-accent-soft/70 active:scale-90`}
                >
                  {/* Keyed on state so each flip replays a small pop */}
                  <motion.span
                    key={String(on)}
                    initial={reduce ? false : { scale: 0.6, opacity: 0.4 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.35, bounce: 0.4 }}
                    className="grid place-items-center"
                  >
                    <Icon size={13} weight={on ? "fill" : "regular"} aria-hidden />
                  </motion.span>
                </button>
              );
            })}
          </span>
        </li>
      ))}
    </ul>
  );
}
