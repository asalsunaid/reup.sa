import { partners, type Dict } from "@/lib/content";

function LogoSet({ hidden }: { hidden?: boolean }) {
  // Each set repeats the five logos twice so one set is always wider than the container.
  const items = [...partners, ...partners];
  return (
    <ul className="marquee-set flex shrink-0 items-center gap-16 pe-16" aria-hidden={hidden}>
      {items.map((p, i) => (
        <li key={`${p.name}-${i}`} className="flex h-12 w-[132px] items-center justify-center bg-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt={hidden || i >= partners.length ? "" : p.name}
            width={p.width}
            height={p.height}
            loading="lazy"
            data-opaque={p.opaque || undefined}
            className="partner-logo h-10 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}

export function Partners({ t }: { t: Dict["partners"] }) {
  return (
    <section aria-labelledby="partners-title" className="py-10 sm:py-14">
      <h2 id="partners-title" className="text-center text-sm font-medium text-subtle">
        {t.title}
      </h2>
      <div className="marquee mt-8 overflow-hidden" dir="ltr">
        <div className="marquee-track flex w-max">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
