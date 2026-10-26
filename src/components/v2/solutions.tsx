"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import Image from "next/image";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Buildings, FirstAidKit, Wallet, ChatsCircle, Receipt, Check, ArrowUpLeft, ArrowUpRight } from "@phosphor-icons/react";
import type { Dict, Locale } from "@/lib/content";

const icons = [Buildings, FirstAidKit, Wallet, ChatsCircle, Receipt];
const query = "(min-width: 1024px) and (min-height: 700px)";
const subscribe = (listener: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
const desktopSnapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

export function V2Solutions({ t, locale }: { t: Dict["solutions"]; locale: Locale }) {
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const desktop = useSyncExternalStore(subscribe, desktopSnapshot, serverSnapshot);
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;
  const ar = locale === "ar";
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 112px", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", value => {
    if (!pinned || stage.current?.querySelector('[role="tabpanel"]:focus-within')) return;
    const next = Math.min(t.items.length - 1, Math.floor(Math.max(0, value) * t.items.length));
    setInstant(false);
    setActive(previous => previous === next ? previous : next);
  });

  const select = (index: number, keyboard = false) => {
    setInstant(keyboard);
    setActive(index);
    if (!pinned || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    const travel = Math.max(0, rect.height - window.innerHeight + 112);
    const progress = (index + 0.12) / t.items.length;
    window.scrollTo({ top: window.scrollY + rect.top - 112 + travel * progress, behavior: "instant" });
  };
  const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (event.key === "ArrowRight") next = (active + (ar ? -1 : 1) + t.items.length) % t.items.length;
    else if (event.key === "ArrowLeft") next = (active + (ar ? 1 : -1) + t.items.length) % t.items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = t.items.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
    refs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={stage} className="v2-scrollSolutions" data-pinned={pinned} data-instant={instant}>
      <div className="v2-solutionsSticky">
        <div className="v2-solutionTabs" role="tablist" aria-label={t.tablistLabel} onKeyDown={keyDown}>
          {t.items.map((product, index) => {
            const Icon = icons[index];
            return <button key={product.key} ref={element => { refs.current[index] = element; }}
              id={`v2-tab-${product.key}`} role="tab" aria-selected={index === active}
              aria-controls={`v2-panel-${product.key}`} tabIndex={index === active ? 0 : -1}
              onClick={() => select(index)}>
              <Icon size={23} weight={index === active ? "fill" : "regular"} aria-hidden />
              <span dir="auto">{product.name}</span>
              <span className="v2-tabLine" aria-hidden />
            </button>;
          })}
        </div>
        <div className="v2-solutionScenes">
          {t.items.map((item, index) => {
            const Icon = icons[index];
            const selected = active === index;
            return <article key={item.key} id={`v2-panel-${item.key}`}
              role={pinned ? "tabpanel" : undefined} aria-labelledby={pinned ? `v2-tab-${item.key}` : `v2-title-${item.key}`}
              aria-hidden={pinned && !selected ? true : undefined} inert={pinned && !selected ? true : undefined}
              className="v2-solutionScene" data-active={selected}>
              <div className="v2-sceneCopy">
                <p className="v2-sceneProduct"><Icon size={23} aria-hidden /><span dir="auto">{item.name}</span><span>{item.sector}</span></p>
                <h3 id={`v2-title-${item.key}`}>{item.title}</h3>
                <p>{item.body}</p>
                <ul>{item.points.map(point => <li key={point}><Check size={16} weight="bold" aria-hidden />{point}</li>)}</ul>
                <a href="#contact" className="v2-textLink">{t.cta}<Arrow size={19} aria-hidden /></a>
              </div>
              <div className="v2-sceneMedia">
                <Image unoptimized src={item.image} alt={item.alt} fill sizes="(max-width: 1023px) 90vw, 48vw"
                  loading={index < 2 ? "eager" : "lazy"} />
                <div className="v2-sceneCaption"><Icon size={25} weight="duotone" aria-hidden /><span dir="auto">{item.name}</span><span>{item.sector}</span></div>
              </div>
            </article>;
          })}
        </div>
        <p className="v2-scrollHint" aria-hidden>{ar ? "منظومة واحدة. حلول تعمل معاً." : "One ecosystem. Connected solutions."}</p>
      </div>
    </div>
  );
}
