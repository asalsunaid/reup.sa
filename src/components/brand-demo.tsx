"use client";

import { Check, LockSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { useId, useState } from "react";
import type { Dict } from "@/lib/content";

// Tenant brand colors are customer content, so they intentionally sit outside the page's single accent.
const swatches = [
  { name: "Raspberry", value: "#d6005a" },
  { name: "Indigo", value: "#4c3bb5" },
  { name: "Emerald", value: "#0b7a5b" },
  { name: "Amber", value: "#a8620a" },
  { name: "Ocean", value: "#0b6fb8" },
];

const DASHBOARD = "/images/v3/dashboard-apps-2.webp";
// Alpha mask of the screenshot's raspberry pixels, built from the same image (logo, toggles, active tab and nav)
const ACCENT_MASK = "url(/images/v3/dashboard-accent-mask.png)";

const sanitize = (v: string) =>
  v
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+/, "")
    .slice(0, 18);

/** `preview` picks what the choices repaint: a mini storefront, or the real dashboard screenshot. */
export function BrandDemo({ t, preview = "store" }: { t: Dict["platform"]["brand"]; preview?: "store" | "dashboard" }) {
  const [slug, setSlug] = useState("alreem");
  const [color, setColor] = useState(swatches[0].value);
  const inputId = useId();
  const shown = slug || "yourbrand";

  return (
    <div
      className={
        preview === "dashboard"
          ? "grid gap-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-center"
          : "grid gap-5 sm:grid-cols-2 sm:items-end"
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor={inputId} className="text-[13px] font-medium text-ink">
            {t.inputLabel}
          </label>
          <div
            dir="ltr"
            className="flex h-11 items-center rounded-[12px] border border-line-strong bg-surface ps-3.5 pe-3 font-mono text-[14px] transition-[border-color,box-shadow] duration-200 focus-within:border-accent focus-within:shadow-[0_0_0_4px_var(--accent-soft)]"
          >
            <input
              id={inputId}
              value={slug}
              onChange={(e) => setSlug(sanitize(e.target.value))}
              spellCheck={false}
              autoComplete="off"
              className="w-full min-w-0 bg-transparent text-ink outline-none placeholder:text-subtle"
              placeholder="yourbrand"
              aria-describedby={`${inputId}-suffix`}
            />
            <span id={`${inputId}-suffix`} className="shrink-0 text-muted">
              .reup.sa
            </span>
          </div>
        </div>
        <fieldset>
          <legend className="text-[13px] font-medium text-ink">{t.colorsLabel}</legend>
          <div className="mt-2 flex gap-2">
            {swatches.map((s, i) => {
              const active = s.value === color;
              return (
                <label
                  key={s.value}
                  className="relative grid size-9 cursor-pointer place-items-center rounded-full transition-transform duration-150 active:scale-90 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
                  style={{ background: s.value }}
                >
                  <input
                    type="radio"
                    name="brand-color"
                    value={s.value}
                    checked={active}
                    onChange={() => setColor(s.value)}
                    className="sr-only"
                    aria-label={t.colorNames[i]}
                  />
                  <Check
                    size={15}
                    weight="bold"
                    className={`text-white transition-[opacity,transform] duration-200 ${active ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                    aria-hidden
                  />
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {preview === "dashboard" ? (
        /* The real dashboard bleeding off the card's end and bottom edges. The chosen colour reaches only
           the accent pixels through the mask, and blend mode "color" keeps each pixel's own lightness, so
           pale tints stay pale and solid toggles stay solid. */
        <div aria-hidden className="relative -me-6 -mb-6 h-[230px] overflow-hidden sm:-me-8 sm:-mb-8 sm:h-[270px]">
          <div className="absolute start-0 top-0 isolate w-[540px]">
            <Image src={DASHBOARD} alt="" width={2960} height={1698} sizes="540px" quality={90} className="block h-auto w-full" />
            <span
              className="absolute inset-0 transition-[background-color] duration-300 ease-[var(--ease-out)]"
              style={{
                background: color,
                mixBlendMode: "color",
                maskImage: ACCENT_MASK,
                WebkitMaskImage: ACCENT_MASK,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            />
          </div>
        </div>
      ) : (
        /* Live mini storefront reflecting the choices above */
        <div
          className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[var(--shadow-float)]"
          aria-hidden
          style={{ "--tenant": color } as React.CSSProperties}
        >
          <div
            dir="ltr"
            className="flex h-9 items-center gap-1.5 border-b border-line bg-surface-2/70 px-3 font-mono text-[11px] text-muted"
          >
            <LockSimple size={11} weight="bold" />
            <span className="truncate">
              <span className="text-ink">{shown}</span>.reup.sa
            </span>
          </div>
          <div className="p-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-[9px] bg-[var(--tenant)] text-[12px] font-semibold text-white uppercase transition-colors duration-300">
                  {shown[0]}
                </span>
                <span className="truncate text-[12.5px] font-semibold text-ink">{t.storeName}</span>
              </div>
              <span className="flex gap-2.5 text-[10.5px] text-subtle">
                {t.storeLines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </span>
            </div>
            <div className="mt-3 rounded-[12px] bg-[color-mix(in_oklab,var(--tenant)_11%,transparent)] p-3.5 transition-colors duration-300">
              <div className="h-2 w-24 rounded-full bg-[color-mix(in_oklab,var(--tenant)_45%,transparent)] transition-colors duration-300" />
              <div className="mt-2 h-2 w-16 rounded-full bg-[color-mix(in_oklab,var(--tenant)_25%,transparent)] transition-colors duration-300" />
              <span className="mt-3.5 inline-flex h-7 items-center rounded-full bg-[var(--tenant)] px-3 text-[11px] font-semibold text-white transition-colors duration-300">
                {t.storeCta}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
