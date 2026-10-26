import "./v3.css";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsLeftRight,
  Buildings,
  CalendarCheck,
  ChatsCircle,
  CheckCircle,
  EnvelopeSimple,
  FirstAidKit,
  MapPin,
  Phone,
  Plus,
  Receipt,
  RocketLaunch,
  Signature,
  Sparkle,
  TrendUp,
  Wallet,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { contact, getDict, partners, type Locale } from "@/lib/content";
import { Contact } from "../contact";
import { CountUp } from "../count-up";
import { Logo } from "../logo";
import { Reveal } from "../reveal";
import { getV3 } from "./content";
import { V3Header } from "./header";

export function v3Metadata(locale: Locale): Metadata {
  return {
    title: getV3(locale).meta.title,
    description: getDict(locale).meta.description,
    alternates: { canonical: locale === "ar" ? "/v3" : "/en/v3", languages: { ar: "/v3", en: "/en/v3" } },
    robots: { index: false, follow: true },
  };
}

const floatIcons = { contract: Signature, calendar: CalendarCheck, invoice: Receipt } as const;
const audienceIcons = { start: RocketLaunch, grow: TrendUp, move: ArrowsLeftRight } as const;
const productIcons = { propup: Buildings, medup: FirstAidKit, fiup: Wallet, cxup: ChatsCircle, einvoice: Receipt } as const;

function Badge({ children, tone = "dark" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <span className={`v3-badge ${tone === "light" ? "v3-badge-light" : ""}`}>
      <Sparkle size={13} weight="fill" aria-hidden />
      {children}
    </span>
  );
}

export function V3Landing({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const t = getDict(locale);
  const v = getV3(locale);
  const Forward = ar ? ArrowLeft : ArrowRight;
  const [open, close] = ar ? ["«", "»"] : ["“", "”"];

  return (
    <div className="v3-page">
      <a className="v3-skip" href="#main">
        {ar ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>

      <p className="v3-announce">
        <Sparkle size={14} weight="fill" aria-hidden />
        <span>{v.announce.text}</span>
        <a href="#contact">{v.announce.link}</a>
      </p>

      <V3Header nav={t.nav} v3={v} locale={locale} />

      <main id="main">
        {/* Hero: inset dark card over photography, like Zid's campaign hero */}
        <section id="top" className="v3-heroWrap">
          <div className="v3-hero">
            <Image src={v.hero.image} alt={v.hero.alt} fill preload sizes="100vw" className="v3-heroImage" />
            <div className="v3-heroScrim" aria-hidden />
            <div className="v3-heroInner">
              <div className="v3-heroCopy">
                <span className="rise" style={{ "--i": 0 } as React.CSSProperties}>
                  <Badge tone="light">{v.hero.badge}</Badge>
                </span>
                <h1>
                  <span className="rise" style={{ "--i": 1 } as React.CSSProperties}>
                    {v.hero.titleA}
                  </span>
                  <span className="rise v3-heroAccent" style={{ "--i": 2 } as React.CSSProperties}>
                    {v.hero.titleB}
                  </span>
                </h1>
                <p className="rise" style={{ "--i": 3 } as React.CSSProperties}>
                  {v.hero.sub}
                </p>
                <div className="v3-actions rise" style={{ "--i": 4 } as React.CSSProperties}>
                  <a href="#contact" className="v3-btn v3-btn-primary">
                    {v.cta}
                    <Forward size={18} weight="bold" aria-hidden />
                  </a>
                  <a href="#solutions" className="v3-btn v3-btn-glass">
                    {v.explore}
                  </a>
                </div>
              </div>

              {/* Live-feeling activity cards; decorative, so hidden from assistive tech */}
              <div className="v3-heroFloats" aria-hidden>
                <div className="v3-domainPill">
                  <span className="v3-livePing" />
                  <span dir="ltr">{v.offer.space.domain}</span>
                </div>
                {v.hero.floats.map((f, i) => {
                  const Icon = floatIcons[f.kind as keyof typeof floatIcons];
                  return (
                    <div key={f.title} className="v3-floatCard" style={{ "--f": i } as React.CSSProperties}>
                      <span className="v3-floatIcon">
                        <Icon size={18} weight="bold" />
                      </span>
                      <span>
                        <b>{f.title}</b>
                        <small dir="auto">{f.body}</small>
                      </span>
                      <CheckCircle size={18} weight="fill" className="v3-floatCheck" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="v3-partners" aria-label={v.partners}>
          <p>{v.partners}</p>
          <div className="v3-partnerRow">
            {partners.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={p.name}
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                loading="lazy"
                data-opaque={p.opaque || undefined}
                className="partner-logo"
              />
            ))}
          </div>
        </section>

        {/* Offer: two cards, one with a highlight block, one with inner cards */}
        <section id="offer" className="v3-band v3-band-neutral">
          <div className="v3-container">
            <Reveal className="v3-head">
              <h2>{v.offer.title}</h2>
              <p>{v.offer.sub}</p>
            </Reveal>
            <div className="v3-offerGrid">
              <Reveal className="v3-card v3-offerCard">
                <span className="v3-chip v3-chip-ink">{v.offer.space.chip}</span>
                <h3>{v.offer.space.title}</h3>
                <p>{v.offer.space.body}</p>
                <div className="v3-highlight" dir="ltr">
                  <span>{v.offer.space.domain.split(".")[0]}</span>.reup.sa
                </div>
              </Reveal>
              <Reveal delay={0.08} className="v3-card v3-offerCard">
                <span className="v3-chip v3-chip-lilac">{v.offer.suite.chip}</span>
                <h3>{v.offer.suite.title}</h3>
                <div className="v3-innerGrid">
                  {v.offer.suite.items.map((it) => (
                    <div key={it.q} className="v3-inner">
                      <b>{it.q}</b>
                      <p>{it.a}</p>
                    </div>
                  ))}
                </div>
                <p className="v3-note">{v.offer.suite.note}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Audience: three paths, Zid's "new / existing / switching" pattern */}
        <section id="audience" className="v3-band">
          <div className="v3-container">
            <Reveal className="v3-head">
              <Badge>{v.audience.badge}</Badge>
              <h2>{v.audience.title}</h2>
              <p>{v.audience.sub}</p>
            </Reveal>
            <div className="v3-audienceGrid">
              {v.audience.items.map((it, i) => {
                const Icon = audienceIcons[it.icon as keyof typeof audienceIcons];
                return (
                  <Reveal key={it.title} delay={i * 0.07} className="v3-card v3-card-muted v3-audienceCard">
                    <span className="v3-iconTile">
                      <Icon size={24} weight="duotone" aria-hidden />
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.body}</p>
                    <a href={it.href} className="v3-btn v3-btn-outline">
                      {it.cta}
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Solutions: tier-style cards with chip rows */}
        <section id="solutions" className="v3-band v3-band-neutral">
          <div className="v3-container">
            <Reveal className="v3-head">
              <h2>{v.solutions.title}</h2>
              <p>{v.solutions.sub}</p>
            </Reveal>
            <div className="v3-solutionGrid">
              {v.solutions.items.map((it, i) => {
                const Icon = productIcons[it.key as keyof typeof productIcons];
                return (
                  <Reveal key={it.key} delay={(i % 3) * 0.06} className="v3-card v3-solutionCard">
                    <div className="v3-solutionHead">
                      <span className="v3-iconTile v3-iconTile-accent">
                        <Icon size={22} weight="duotone" aria-hidden />
                      </span>
                      <div>
                        <h3 dir="auto">{it.name}</h3>
                        <small>{it.sector}</small>
                      </div>
                    </div>
                    <ul>
                      {it.rows.map(([chip, text]) => (
                        <li key={chip}>
                          <span className="v3-rowChip" dir="auto">
                            {chip}
                          </span>
                          <Forward size={14} className="v3-rowArrow" aria-hidden />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                );
              })}
            </div>
            <p className="v3-footnote">{v.solutions.note}</p>
          </div>
        </section>

        {/* Dark promo band, the campaign moment of the page */}
        <section className="v3-band">
          <div className="v3-container">
            <Reveal className="v3-promo">
              <Badge tone="light">{v.promo.badge}</Badge>
              <h2>{v.promo.title}</h2>
              <p>{v.promo.sub}</p>
              <div className="v3-promoRow">
                <div>
                  <strong>{v.promo.big}</strong>
                  <span>{v.promo.bigNote}</span>
                </div>
                <a href="#contact" className="v3-btn v3-btn-primary">
                  {v.cta}
                  <Forward size={18} weight="bold" aria-hidden />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Numbers: Zid's calculator cards, filled with REUP's real figures */}
        <section className="v3-band v3-band-tight">
          <div className="v3-container">
            <Reveal className="v3-head">
              <h2>{v.numbers.title}</h2>
            </Reveal>
            <div className="v3-numberGrid">
              {t.impact.stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.06} className="v3-card v3-card-muted v3-numberCard">
                  <small>{s.label}</small>
                  <strong>
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </strong>
                </Reveal>
              ))}
            </div>
            <Reveal className="v3-quote">
              <p>
                <span aria-hidden>{open}</span>
                {v.numbers.quote}
                <span aria-hidden>{close}</span>
              </p>
              <span className="v3-quoteBy">
                <b>{t.impact.author}</b>
                {t.impact.role}
              </span>
            </Reveal>
          </div>
        </section>

        {/* Team split: image card with floating cards + copy card */}
        <section className="v3-band v3-band-neutral">
          <div className="v3-container v3-splitGrid">
            <Reveal className="v3-splitMedia">
              <div className="v3-splitPhoto">
                <Image src={v.team.image} alt={v.team.alt} fill sizes="(min-width: 1024px) 560px, 100vw" />
              </div>
              {v.team.floats.map((f, i) => (
                <div key={f.title} className="v3-floatCard v3-splitFloat" style={{ "--f": i } as React.CSSProperties} aria-hidden>
                  <span className="v3-floatIcon">
                    <CheckCircle size={18} weight="fill" />
                  </span>
                  <span>
                    <b dir="auto">{f.title}</b>
                    <small>{f.body}</small>
                  </span>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.08} className="v3-card v3-splitCopy">
              <Badge>{v.team.badge}</Badge>
              <h2>{v.team.title}</h2>
              <p>{v.team.body}</p>
              <a href="#contact" className="v3-btn v3-btn-primary">
                {v.cta}
                <Forward size={18} weight="bold" aria-hidden />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Details table */}
        <section className="v3-band">
          <div className="v3-container">
            <Reveal className="v3-details">
              <h2>{v.details.title}</h2>
              <dl>
                {v.details.rows.map(([k, val]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{val}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* FAQ: native disclosure, works without JS */}
        <section id="faq" className="v3-band v3-band-neutral">
          <div className="v3-container v3-faqWrap">
            <Reveal className="v3-head v3-head-center">
              <Badge>{v.faq.badge}</Badge>
              <h2>{v.faq.title}</h2>
            </Reveal>
            <Reveal className="v3-faq">
              {t.faq.items.map((item, i) => (
                <details key={item.q} name="v3-faq" open={i === 0}>
                  <summary>
                    {item.q}
                    <span className="v3-faqIcon" aria-hidden>
                      <Plus size={16} weight="bold" />
                    </span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Closing campaign card */}
        <section className="v3-band v3-band-neutral v3-band-flush">
          <div className="v3-container">
            <div className="v3-final">
              <Image src={v.final.image} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="v3-finalImage" />
              <div className="v3-finalScrim" aria-hidden />
              <Reveal className="v3-finalCopy">
                <h2>{v.final.title}</h2>
                <p>{v.final.sub}</p>
                <div className="v3-actions v3-actions-center">
                  <a href="#contact" className="v3-btn v3-btn-light">
                    {v.cta}
                  </a>
                  <a href="#solutions" className="v3-btn v3-btn-glass">
                    {v.explore}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="v3-contact">
          <Contact t={t.contact} locale={locale} />
        </div>
      </main>

      <footer className="v3-footer">
        <div className="v3-container v3-footerMain">
          <div className="v3-footerBrand">
            <a href="#top" aria-label={t.nav.home}>
              <Logo height={26} />
            </a>
            <p>{t.footer.tagline}</p>
          </div>
          <nav aria-label={v.footer.platform}>
            <h3>{v.footer.platform}</h3>
            {v.nav.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <nav aria-label={t.footer.groups[0].title}>
            <h3>{t.footer.groups[0].title}</h3>
            {v.solutions.items.map((s) => (
              <a key={s.key} href="#solutions" dir="auto">
                {s.name}
              </a>
            ))}
          </nav>
          <div>
            <h3>{v.footer.connect}</h3>
            <a href={`mailto:${contact.email}`}>
              <EnvelopeSimple size={17} aria-hidden />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone}`}>
              <Phone size={17} aria-hidden />
              <span dir="ltr">{contact.phoneDisplay}</span>
            </a>
            <p>
              <MapPin size={17} aria-hidden />
              {t.contact.address}
            </p>
          </div>
        </div>
        <div className="v3-container v3-footerBottom">
          <p>
            <span dir="ltr">© 2026 REUP.</span> {t.footer.rights}
          </p>
          <a href={ar ? "/en/v3" : "/v3"} lang={t.nav.lang.code} hrefLang={t.nav.lang.code}>
            {t.nav.lang.label}
          </a>
        </div>
      </footer>
    </div>
  );
}
