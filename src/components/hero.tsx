import type { Dict } from "@/lib/content";
import { ForwardArrow } from "./arrow";
import { TenantPreview } from "./tenant-preview";

function Words({ text, start, className = "" }: { text: string; start: number; className?: string }) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i}>
      <span className={`rise inline-block ${className}`} style={{ "--i": start + i } as React.CSSProperties}>
        {w}
      </span>
      {i < words.length - 1 && " "}
    </span>
  ));
}

export function Hero({ t, preview }: { t: Dict["hero"]; preview: Dict["preview"] }) {
  const aWords = t.titleA.split(" ").length;
  const bWords = t.titleB.split(" ").length;
  const after = aWords + bWords;

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Slow ambient glow behind the product; static under reduced motion */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow absolute -top-56 end-[-8%] h-[560px] w-[560px] rounded-full bg-accent/[0.07] blur-[110px] dark:bg-accent/[0.14]" />
        <div className="hero-glow-2 absolute top-48 end-[22%] h-[420px] w-[420px] rounded-full bg-[#5b49c9]/[0.07] blur-[110px] dark:bg-[#5b49c9]/[0.2]" />
      </div>

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-5 pt-32 pb-12 sm:gap-14 sm:px-8 sm:pb-20 lg:min-h-[min(100dvh,900px)] lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-16">
        <div className="lg:col-span-5">
          {/* Latin glyphs run wider than Arabic at the same size, so English steps down one notch to hold two lines */}
          <h1 className="display text-[2.7rem] leading-[1.18] font-semibold text-ink sm:text-[3.6rem] lg:text-[4.1rem] lg:leading-[1.14] lg:[&:lang(en)]:text-[3.7rem]">
            <span className="block">
              <Words text={t.titleA} start={0} />
            </span>
            <span className="block text-accent">
              <Words text={t.titleB} start={aWords} />
            </span>
          </h1>
          <p
            className="rise mt-6 max-w-[34rem] text-[1.075rem] leading-[1.85] text-muted sm:text-lg"
            style={{ "--i": after } as React.CSSProperties}
          >
            {t.sub}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--i": after + 1 } as React.CSSProperties}>
            <a href="#contact" className="btn btn-primary">
              {t.primary}
              <ForwardArrow />
            </a>
            <a href="#solutions" className="btn btn-ghost">
              {t.secondary}
            </a>
          </div>
        </div>

        <div className="rise-scale lg:col-span-7 lg:ps-6">
          <TenantPreview t={preview} />
        </div>
      </div>
    </section>
  );
}
