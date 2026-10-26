import { contact, type Dict } from "@/lib/content";
import { Logo } from "./logo";

export function Footer({ t, nav, address }: { t: Dict["footer"]; nav: Dict["nav"]; address: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-8 gap-y-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <Logo height={22} />
          <p className="mt-5 max-w-[22rem] text-[0.98rem] leading-[1.8] text-muted">{t.tagline}</p>
          <a
            href={nav.lang.href}
            hrefLang={nav.lang.code}
            lang={nav.lang.code}
            className="mt-6 inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-[13.5px] font-medium text-ink transition-colors duration-200 hover:border-ink"
          >
            {nav.lang.label}
          </a>
        </div>

        {t.groups.map((g) => (
          <nav key={g.title} aria-label={g.title} className="md:col-span-2">
            <h2 className="text-[13.5px] font-semibold text-ink">{g.title}</h2>
            <ul className="mt-4 space-y-3">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[14.5px] text-muted transition-colors duration-200 hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 md:col-span-3">
          <h2 className="text-[13.5px] font-semibold text-ink">{t.contactTitle}</h2>
          <ul className="mt-4 space-y-3 text-[14.5px] text-muted">
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors duration-200 hover:text-ink">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phone}`} className="tabular transition-colors duration-200 hover:text-ink" dir="ltr">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="leading-[1.7]">{address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1240px] px-5 py-6 text-[13px] text-subtle sm:px-8">
          <span dir="ltr">© 2026 REUP.</span> {t.rights}
        </p>
      </div>
    </footer>
  );
}
