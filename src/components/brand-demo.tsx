"use client";

import { Check } from "@phosphor-icons/react";
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

/** Subdomain field and brand colours; the colour repaints the accent of the real dashboard screenshot. */
export function BrandDemo({ t }: { t: Dict["platform"]["brand"] }) {
  const [slug, setSlug] = useState("alreem");
  const [color, setColor] = useState(swatches[0].value);
  const inputId = useId();

  return (
    <div className="grid gap-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-center">
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
      {/* The real dashboard bleeding off the card's end and bottom edges. The chosen colour reaches only the accent pixels
          through the mask, and blend mode "color" keeps each pixel's own lightness, so pale tints stay pale and solid toggles
          stay solid. */}
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
    </div>
  );
}
