"use client";

import { Quotes } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion, type PanInfo } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Locale } from "@/lib/content";
import type { V3Dict } from "./content";

const AUTOPLAY_MS = 5600;
// Front card and two peeking out below it. Any card further back waits faded out, lifted above the
// stack, so the card leaving the front slides off upward and a card brought back drops in from above.
const PLACES = [
  { y: 0, scale: 1, opacity: 1 },
  { y: 18, scale: 0.95, opacity: 1 },
  { y: 36, scale: 0.9, opacity: 1 },
  { y: -28, scale: 1, opacity: 0 },
];

/** Testimonials as a deck: the front card tucks behind the others, which rise to take its place. */
export function Testimonials({ t, locale }: { t: V3Dict["testimonials"]; locale: Locale }) {
  const items = t.items;
  const n = items.length;
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const rtl = locale === "ar";
  const [open, close] = rtl ? ["«", "»"] : ["“", "”"];

  const go = (step: number) => setIndex((i) => (i + step + n) % n);

  // Re-arms on every change, so a manual pick gets a full beat before the deck moves again
  useEffect(() => {
    if (reduce || hold || !inView) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, n, reduce, hold, inView]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const forward = rtl ? "ArrowLeft" : "ArrowRight";
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    if (e.key === forward) go(1);
    else if (e.key === back) go(-1);
    else return;
    e.preventDefault();
  };

  // Swiping against the reading direction advances, as in a native carousel; the other way goes back
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400;
    if (!swipe) return;
    const towardStart = rtl ? info.offset.x > 0 : info.offset.x < 0;
    go(towardStart ? 1 : -1);
  };

  return (
    <div
      ref={ref}
      className="v3-deck"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.label}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      onKeyDown={onKeyDown}
    >
      {/* Announce changes only while the visitor is driving the deck, never during autoplay */}
      <div className="v3-deckStage" aria-live={hold ? "polite" : "off"}>
        {items.map((item, i) => {
          const pos = (i - index + n) % n;
          const place = PLACES[Math.min(pos, PLACES.length - 1)];
          const front = pos === 0;
          return (
            <motion.figure
              key={item.name}
              className="v3-deckCard"
              data-pos={Math.min(pos, 3)}
              inert={!front}
              style={{ zIndex: n - pos, transformOrigin: "50% 100%" }}
              initial={false}
              // y and scale rather than a transform string, so they compose with the drag's x
              animate={{ y: place.y, scale: place.scale, opacity: place.opacity }}
              transition={
                reduce
                  ? { duration: 0, opacity: { duration: 0.2 } }
                  : { type: "spring", duration: 0.6, bounce: 0.12, opacity: { duration: 0.25 } }
              }
              drag={front && !reduce ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.18}
              onDragEnd={front ? onDragEnd : undefined}
            >
              <Quotes size={28} weight="fill" className="v3-deckMark" aria-hidden />
              <blockquote>
                <span aria-hidden>{open}</span>
                {item.quote}
                <span aria-hidden>{close}</span>
              </blockquote>
              <figcaption>
                <span className="v3-deckAvatar" aria-hidden>
                  {item.name.trim()[0]}
                </span>
                <span>
                  <b>{item.name}</b>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <div className="v3-deckDots">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-label={t.goTo.replace("{n}", String(i + 1)).replace("{total}", String(n))}
            aria-current={i === index || undefined}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
