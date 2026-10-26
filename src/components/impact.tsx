import type { Dict, Locale } from "@/lib/content";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

export function Impact({ t, locale }: { t: Dict["impact"]; locale: Locale }) {
  const [open, close] = locale === "ar" ? ["«", "»"] : ["“", "”"];
  return (
    <section aria-labelledby="impact-title" className="pt-24 sm:pt-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <h2
            id="impact-title"
            className="display text-[2.1rem] leading-[1.25] font-semibold text-ink sm:text-[2.9rem] sm:leading-[1.2]"
          >
            {t.title}
          </h2>
        </Reveal>

        <dl className="mt-12 grid grid-cols-1 border-y border-line sm:grid-cols-3">
          {t.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="flex flex-col gap-3 border-line py-8 sm:px-8 sm:py-10 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:border-s sm:first:ps-0"
            >
              <dt className="order-2 max-w-[16rem] text-[0.98rem] leading-[1.7] text-muted">{s.label}</dt>
              <dd className="order-1 text-[3.4rem] leading-none font-light text-ink sm:text-[4rem] lg:text-[4.75rem]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mx-auto mt-20 max-w-[52rem] text-center sm:mt-24">
          <figure>
            <blockquote className="text-[1.45rem] leading-[1.7] font-medium text-ink sm:text-[1.85rem] sm:leading-[1.65]">
              <span aria-hidden className="text-accent">
                {open}
              </span>
              {t.quote}
              <span aria-hidden className="text-accent">
                {close}
              </span>
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-indigo text-[15px] font-semibold text-on-indigo dark:bg-surface-3">
                {t.author.trim()[0]}
              </span>
              <span className="text-start leading-tight">
                <span className="block text-[0.98rem] font-semibold text-ink">{t.author}</span>
                <span className="mt-1 block text-[0.9rem] text-subtle">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
