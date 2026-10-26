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
  TrendUp,
  Wallet,
} from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { contact, getDict, partners, type Locale } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { CountUp } from "../count-up";
import DotGrid from "../bits/DotGrid";
import { Logo } from "../logo";
import { PlatformGrid } from "../platform";
import { V3Contact } from "./contact";
import { getV3 } from "./content";
import { V3Header } from "./header";
import { SpotlightGroup, TiltScreen } from "./interactions";
import { ModulesVideo } from "./modules-video";
import { Testimonials } from "./testimonials";

export function v3Metadata(locale: Locale): Metadata {
  const title = getV3(locale).meta.title;
  // The root layout already sets the description, canonical URL and language alternates
  return { title, openGraph: { ...buildMetadata(locale).openGraph, title } };
}

const floatIcons = { contract: Signature, calendar: CalendarCheck, invoice: Receipt } as const;
const audienceIcons = { start: RocketLaunch, grow: TrendUp, move: ArrowsLeftRight } as const;
const productIcons = { propup: Buildings, medup: FirstAidKit, fiup: Wallet, cxup: ChatsCircle, einvoice: Receipt } as const;

export function V3Landing({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const t = getDict(locale);
  const v = getV3(locale);
  const Forward = ar ? ArrowLeft : ArrowRight;

  return (
    <div className="v3-page">
      <a className="v3-skip" href="#main">
        {ar ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>

      <V3Header nav={t.nav} v3={v} locale={locale} />

      <SpotlightGroup>
        <main id="main">
          {/* Hero: centred copy on the dark card, with the product rising out of its bottom edge */}
          <section id="top" className="v3-heroWrap">
            <div className="v3-hero">
              <div className="v3-heroDots" aria-hidden>
                <DotGrid
                  dotSize={3}
                  gap={22}
                  baseColor="#4b3fa0"
                  activeColor="#ff8fbd"
                  proximity={130}
                  glow={0.6}
                  swell={0.6}
                  fade={0.6}
                  opacity={0.9}
                  shockRadius={260}
                />
              </div>
              <div className="v3-heroCopy">
                <h1>
                  <span className="rise" style={{ "--i": 1 } as React.CSSProperties}>
                    {v.hero.titleA}
                  </span>{" "}
                  <span className="rise v3-heroAccent" style={{ "--i": 2 } as React.CSSProperties}>
                    {v.hero.titleB}
                  </span>
                </h1>
                <p className="rise" style={{ "--i": 3 } as React.CSSProperties}>
                  {v.hero.sub}
                </p>
                <div className="v3-actions v3-actions-center rise" style={{ "--i": 4 } as React.CSSProperties}>
                  <a href="#contact" className="v3-btn v3-btn-primary">
                    {v.cta}
                    <Forward size={18} weight="bold" aria-hidden />
                  </a>
                  <a href="#solutions" className="v3-btn v3-btn-glass">
                    {v.explore}
                  </a>
                </div>
              </div>

              <div className="v3-heroStage rise-scale">
                {/* Clips the screen at the card's bottom edge; the activity cards sit outside it and may overhang */}
                <div className="v3-heroScreen">
                  <Image
                    src={v.hero.image}
                    alt={v.hero.alt}
                    width={2960}
                    height={1698}
                    loading="eager"
                    fetchPriority="high"
                    quality={90}
                    sizes="(min-width: 1280px) 960px, 92vw"
                  />
                </div>
                {/* Live-feeling activity cards; decorative, so hidden from assistive tech */}
                <div className="v3-heroFloats" aria-hidden>
                  {v.hero.floats.map((f, i) => {
                    const Icon = floatIcons[f.kind as keyof typeof floatIcons];
                    return (
                      <div key={f.title} className="v3-floatCard" data-kind={f.kind} style={{ "--f": i } as React.CSSProperties}>
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
            <div className="marquee v3-marquee" dir="ltr">
              <div className="marquee-track flex w-max">
                {[false, true].map((hidden) => (
                  <ul key={String(hidden)} className="marquee-set v3-logoSet" aria-hidden={hidden || undefined}>
                    {[...partners, ...partners].map((p, i) => (
                      <li key={p.name + i}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.src}
                          alt={hidden || i >= partners.length ? "" : p.name}
                          width={p.width}
                          height={p.height}
                          loading="lazy"
                          data-opaque={p.opaque || undefined}
                          className="v3-logo"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </section>

          {/* Offer: the platform grid shared with v1, with live toggles and a pointer spotlight */}
          <section id="offer" className="v3-band v3-band-neutral">
            <div className="v3-container v3-bento">
              <div className="v3-head v3-head-center">
                <h2>{v.offer.title}</h2>
                <p>{v.offer.sub}</p>
              </div>
              <PlatformGrid t={{ ...t.platform, roles: { ...t.platform.roles, title: v.offer.rolesTitle } }} />
            </div>
          </section>

          {/* Audience: three paths, Zid's "new / existing / switching" pattern */}
          <section id="audience" className="v3-band">
            <div className="v3-container">
              <div className="v3-head v3-head-center">
                <h2>{v.audience.title}</h2>
                <p>{v.audience.sub}</p>
              </div>
              <div className="v3-audienceGrid">
                {v.audience.items.map((it) => {
                  const Icon = audienceIcons[it.icon as keyof typeof audienceIcons];
                  return (
                    <div key={it.title} className="v3-in spot-cell v3-lift v3-card v3-card-muted v3-audienceCard">
                      <span className="v3-iconTile">
                        <Icon size={24} weight="duotone" aria-hidden />
                      </span>
                      <h3>{it.title}</h3>
                      <p>{it.body}</p>
                      <a href={it.href} className="v3-btn v3-btn-outline">
                        {it.cta}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Solutions: tier-style cards with chip rows */}
          <section id="solutions" className="v3-band v3-band-neutral">
            <div className="v3-container">
              <div className="v3-head v3-head-center">
                <h2>{v.solutions.title}</h2>
                <p>{v.solutions.sub}</p>
              </div>
              <div className="v3-solutionGrid">
                {v.solutions.items.map((it) => {
                  const Icon = productIcons[it.key as keyof typeof productIcons];
                  return (
                    <div key={it.key} className="v3-in spot-cell v3-lift v3-card v3-solutionCard">
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
                    </div>
                  );
                })}
              </div>
              <p className="v3-footnote">{v.solutions.note}</p>
            </div>
          </section>

          {/* Numbers: Zid's calculator cards, filled with REUP's real figures */}
          <section className="v3-band">
            <div className="v3-container">
              <div className="v3-head v3-head-center">
                <h2>{v.numbers.title}</h2>
              </div>
              <div className="v3-numberGrid">
                {[t.impact.stats[1], t.impact.stats[0], t.impact.stats[2]].map((s) => (
                  <div key={s.label} className="v3-in spot-cell v3-lift v3-card v3-card-muted v3-numberCard">
                    <small>{s.label}</small>
                    <strong>
                      <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </strong>
                  </div>
                ))}
              </div>
              <Testimonials t={v.testimonials} locale={locale} />
            </div>
          </section>

          {/* Team split: image card with floating cards + copy card */}
          <section className="v3-band v3-band-neutral">
            <div className="v3-container v3-splitGrid">
              <div className="v3-in v3-splitMedia">
                <div className="v3-splitPhoto">
                  <Image src={v.team.image} alt={v.team.alt} fill sizes="(min-width: 1024px) 560px, 100vw" />
                </div>
                {v.team.floats.map((f, i) => (
                  <div
                    key={f.title}
                    className="v3-floatCard v3-splitFloat"
                    style={{ "--f": i } as React.CSSProperties}
                    aria-hidden
                  >
                    <span className="v3-floatIcon">
                      <CheckCircle size={18} weight="fill" />
                    </span>
                    <span>
                      <b dir="auto">{f.title}</b>
                      <small>{f.body}</small>
                    </span>
                  </div>
                ))}
              </div>
              <div className="v3-in spot-cell v3-card v3-splitCopy">
                <h2>{v.team.title}</h2>
                <p>{v.team.body}</p>
                <a href="#contact" className="v3-btn v3-btn-primary">
                  {v.cta}
                  <Forward size={18} weight="bold" aria-hidden />
                </a>
              </div>
            </div>
          </section>

          {/* Apps screen: a real capture of the dashboard, so visitors see modules being switched on */}
          <section id="apps" className="v3-band">
            <div className="v3-container">
              <div className="v3-head v3-head-center">
                <h2>{v.apps.title}</h2>
                <p>{v.apps.sub}</p>
              </div>
              <div className="v3-in v3-appStage">
                <TiltScreen className="v3-appTilt">
                  <ModulesVideo src={v.apps.video} poster={v.apps.image} label={v.apps.imageAlt} width={1920} height={1102} />
                </TiltScreen>
              </div>
            </div>
          </section>

          {/* FAQ: native disclosure, works without JS */}
          <section id="faq" className="v3-band v3-band-neutral">
            <div className="v3-container v3-faqWrap">
              <div className="v3-head v3-head-center">
                <h2>{v.faq.title}</h2>
              </div>
              <div className="v3-in v3-faq">
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
              </div>
            </div>
          </section>

          {/* Closing campaign card */}
          <section className="v3-band v3-band-neutral v3-band-flush">
            <div className="v3-container">
              <div className="spot-cell spot-dark v3-final">
                <Image src={v.final.image} alt="" fill sizes="(min-width: 1280px) 1200px, 100vw" className="v3-finalImage" />
                <div className="v3-finalScrim" aria-hidden />
                <div className="v3-in v3-finalCopy">
                  <h2>{v.final.title}</h2>
                  <p>{v.final.sub}</p>
                  <div className="v3-actions v3-actions-center">
                    <a href="#contact" className="v3-btn v3-btn-light">
                      {v.cta}
                      <Forward size={18} weight="bold" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <V3Contact t={t.contact} v={v} locale={locale} />
        </main>
      </SpotlightGroup>

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
          <nav aria-label={t.footer.solutionsTitle}>
            <h3>{t.footer.solutionsTitle}</h3>
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
          <a href={ar ? "/en" : "/"} lang={t.nav.lang.code} hrefLang={t.nav.lang.code}>
            {t.nav.lang.label}
          </a>
        </div>
      </footer>
    </div>
  );
}
