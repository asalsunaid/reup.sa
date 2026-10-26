"use client";

import { Plus } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { contact, type Dict } from "@/lib/content";
import { Reveal } from "./reveal";

export function Faq({ t }: { t: Dict["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <p className="text-[0.95rem] font-medium text-accent">{t.eyebrow}</p>
          <h2 className="display mt-3 text-[2.1rem] leading-[1.25] font-semibold text-ink sm:text-[2.6rem] sm:leading-[1.2]">
            {t.title}
          </h2>
          <p className="mt-6 text-[1rem] text-muted">
            {t.more}{" "}
            <a
              href={`mailto:${contact.email}`}
              className="font-semibold text-ink underline decoration-line-strong decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-accent"
            >
              {t.moreLink}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-8">
          <ul className="divide-y divide-line border-y border-line">
            {t.items.map((item, i) => {
              const isOpen = open === i;
              const panelId = `${base}-panel-${i}`;
              const btnId = `${base}-btn-${i}`;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-start text-[1.08rem] font-semibold text-ink sm:text-[1.15rem]"
                    >
                      {item.q}
                      <span
                        className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-300 ease-[var(--ease-out)] ${
                          isOpen
                            ? "rotate-45 border-accent-fill bg-accent-fill text-on-accent"
                            : "border-line-strong text-ink group-hover:border-ink"
                        }`}
                        aria-hidden
                      >
                        <Plus size={15} weight="bold" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="accordion-panel"
                    data-open={isOpen}
                    inert={!isOpen}
                  >
                    <div>
                      <p className="max-w-[44rem] pb-7 text-[1rem] leading-[1.85] text-muted">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
