import "./v2.css";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpLeft, ArrowUpRight, ArrowLeft, ArrowRight, ShieldCheck, Fingerprint, UsersThree, Plus, EnvelopeSimple, Phone, MapPin, SlidersHorizontal, RocketLaunch, UserPlus } from "@phosphor-icons/react/ssr";
import { contact, getDict, partners, type Locale } from "@/lib/content";
import { Logo } from "../logo";
import { Contact } from "../contact";
import { V2Header } from "./header";
import { V2Solutions } from "./solutions";
import { V2Workspace } from "./workspace";
import { V2Reveal } from "./reveal";
import { TenantPreview } from "../tenant-preview";


export function v2Metadata(locale: Locale): Metadata {
  return {
    title: locale === "ar" ? "REUP | أعمالك مترابطة. إمكاناتك أكبر." : "REUP | Connected business. Greater possibilities.",
    description: getDict(locale).meta.description,
    alternates: { canonical: locale === "ar" ? "/v2" : "/en/v2", languages: { ar: "/v2", en: "/en/v2" } },
    robots: { index: false, follow: true },
  };
}

export function V2Landing({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const t = getDict(locale);
  const Arrow = ar ? ArrowUpLeft : ArrowUpRight;
  const Forward = ar ? ArrowLeft : ArrowRight;
  const stepIcons = [UserPlus, SlidersHorizontal, RocketLaunch];
  return (
    <div className={"v2-page"}>
      <a className={"v2-skipLink"} href="#main">{ar ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <V2Header nav={t.nav} locale={locale} />
      <main id="main">
        <section id="top" className={"v2-hero"}>
          <div className={"v2-heroPhoto"}>
            <Image unoptimized src="https://reup.sa/images/solution-tasyil.png" alt={ar ? "إدارة الأعمال والحلول المالية" : "Business and financial services"}
              fill preload sizes="(max-width: 767px) 100vw, 75vw" />
          </div>
          <div className={"v2-heroScrim"} aria-hidden />
          <div className={"v2-heroCopy"}>
            <p className={"v2-heroEyebrow"}>{ar ? "حلول مترابطة لأعمال تنمو" : "Connected solutions for growing businesses"}</p>
            <h1>{ar ? "أعمالك مترابطة." : "Business, connected."}<span>{ar ? "إمكاناتك أكبر." : "Possibilities, expanded."}</span></h1>
            <p className={"v2-heroDescription"}>{ar ? "العقار والعيادات والتمويل والفوترة. حلول تعمل معاً، في مساحة تحمل هويتك وتواكب نموك." : "Property, healthcare, finance and invoicing. Connected solutions in a workspace that carries your brand and grows with you."}</p>
            <div className={"v2-heroActions"}>
              <a href="#contact" className={"v2-primaryButton"}>{t.nav.cta}<Arrow size={19} aria-hidden /></a>
              <a href="#solutions" className={"v2-secondaryButton"}>{t.hero.secondary}<Forward size={18} aria-hidden /></a>
            </div>
          </div>
        </section>

        <section className={"v2-partners"} aria-label={t.partners.title}>
          <p>{ar ? "شركاء في رحلة النمو" : "Partners in growth"}</p>
          <div className={"v2-partnerLogos"}>{partners.map(partner =>
            <Image unoptimized key={partner.name} src={partner.src} alt={partner.name} width={partner.width} height={partner.height}
              className="partner-logo" data-opaque={partner.opaque || undefined} />
          )}</div>
        </section>

        <section id="solutions" className="v2-solutionsSection">
          <V2Reveal className={"v2-sectionHeading"}>
            <h2>{ar ? "حلول متخصّصة. تعمل معاً." : "Specialized solutions. Better together."}</h2>
            <p>{ar ? "ابدأ بما تحتاجه اليوم، وأضف ما يدعم خطوتك القادمة." : "Start with what you need today. Add what supports your next move."}</p>
          </V2Reveal>
          <V2Solutions t={t.solutions} locale={locale} />
        </section>

        <section id="platform" className={"v2-platformSection"}>
          <div className={"v2-section"}>
            <V2Reveal className={"v2-sectionHeading"}>
              <h2>{ar ? "منشأتك في قلب المنظومة." : "Your business at the center."}</h2>
              <p>{ar ? "كل ما يخص أعمالك، في مساحة مستقلة ومترابطة." : "Everything your business needs, in one independent, connected space."}</p>
            </V2Reveal>
            <div className={"v2-platformGrid"}>
              <V2Reveal><V2Workspace locale={locale} /></V2Reveal>
              <V2Reveal delay={0.1} className={"v2-securityPanel"}>
                <div className={"v2-securityArt"} aria-hidden><div><ShieldCheck size={76} weight="light" /></div><Fingerprint size={30} /><UsersThree size={28} /></div>
                <h3>{ar ? "بياناتك تخصّك." : "Your data stays yours."}</h3>
                <p>{ar ? "عزل بين المنشآت، وصلاحيات واضحة لفريقك. امنح كل شخص الوصول الذي يحتاجه فقط." : "Isolated business data and clear team permissions. Give each person only the access they need."}</p>
                <div className={"v2-securityTags"}><span>{ar ? "مساحة مستقلة" : "Independent workspace"}</span><span>{ar ? "صلاحيات مرنة" : "Flexible permissions"}</span></div>
              </V2Reveal>
            </div>
          </div>
        </section>

        <section id="how" className="v2-howSection">
          <V2Reveal className={"v2-howHeading"}>
            <h2>{ar ? "أقرب إلى انطلاقتك القادمة." : "Closer to your next chapter."}</h2>
            <p>{ar ? "من إعداد مساحتك إلى تشغيل أعمالك، بخطوات واضحة." : "From setting up your space to running your business, with a clear path forward."}</p>
          </V2Reveal>
          <div className={"v2-steps"}>{t.how.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return <V2Reveal key={step.title} delay={index * 0.08} className={"v2-step"}>
              <Icon size={30} weight="light" aria-hidden />
              <h3>{step.title}</h3><p>{step.body}</p>
            </V2Reveal>;
          })}</div>
        </section>

        <section className="v2-dashboardSection">
          <V2Reveal className="v2-dashboardHeading">
            <p className="v2-eyebrow">{ar ? "لوحة التحكم" : "The dashboard"}</p>
            <h2>{ar ? "الصورة كاملة. والقرار بيدك." : "The full picture. Your next move."}</h2>
            <p>{ar ? "تابع أعمالك من مكان واحد. بدّل بين المساحات واكتشف كيف تتغيّر التجربة بحسب نشاطك." : "Your operations in one place. Switch workspaces and explore a view that adapts to your business."}</p>
          </V2Reveal>
          <V2Reveal className="v2-dashboardStage"><TenantPreview t={t.preview} /></V2Reveal>
        </section>

        <section className={"v2-storySection"}>
          <div className={"v2-storyImage"}><Image unoptimized src="https://reup.sa/images/impact-team.png"
            alt={ar ? "فريق أعمال يناقش خطط العمل" : "Business team planning together"} fill sizes="(max-width: 767px) 100vw, 45vw" /></div>
          <V2Reveal className={"v2-storyCopy"}>
            <p className={"v2-eyebrow"}>{ar ? "مساحة أكبر للنمو" : "Room to grow"}</p>
            <h2>{ar ? "ركّز على أعمالك. واترك التعقيد خلفك." : "Focus on your business. Leave complexity behind."}</h2>
            <p>{ar ? "عمليات أقل تشتّتاً، وفريق يعمل من مكان واحد. مع REUP، تصبح الصورة أوضح والخطوة التالية أسهل." : "Fewer disconnected processes. A team working in one place. With REUP, the picture gets clearer and the next step gets easier."}</p>
            <a href="#contact" className={"v2-textLink"}>{t.nav.cta}<Arrow size={19} aria-hidden /></a>
          </V2Reveal>
        </section>

        <section id="faq" className={"v2-faqSection"}>
          <V2Reveal className={"v2-sectionHeading"}><h2>{ar ? "أسئلتك، بإجابات واضحة." : "Your questions, answered."}</h2><p>{ar ? "تعرّف على REUP قبل خطوتك الأولى." : "Get to know REUP before your first step."}</p></V2Reveal>
          <div className={"v2-faqList"}>{t.faq.items.map(item =>
            <details key={item.q}><summary>{item.q}<Plus size={21} aria-hidden /></summary><p>{item.a}</p></details>
          )}</div>
        </section>

        <div className={"v2-contactWrap"}><Contact t={t.contact} locale={locale} /></div>
      </main>
      <footer className={"v2-footer"}>
        <div className={"v2-footerMain"}>
          <div className={"v2-footerBrand"}><a href="#top" aria-label={t.nav.home}><Logo height={29} unoptimized /></a><p>{t.footer.tagline}</p></div>
          <nav aria-label={ar ? "روابط المنصة" : "Platform links"}><h3>{ar ? "المنصة" : "Platform"}</h3>{t.nav.links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
          <div><h3>{ar ? "لنتواصل" : "Let's connect"}</h3><a href={`mailto:${contact.email}`}><EnvelopeSimple size={17} aria-hidden /><span>{contact.email}</span></a><a href={`tel:${contact.phone}`}><Phone size={17} aria-hidden /><span dir="ltr">{contact.phoneDisplay}</span></a><p className={"v2-footerAddress"}><MapPin size={18} aria-hidden />{t.contact.address}</p></div>
        </div>
        <div className={"v2-footerBottom"}><p><span dir="ltr">© 2026 REUP.</span> {t.footer.rights}</p><a href={ar ? "/en/v2" : "/v2"} lang={ar ? "en" : "ar"}>{t.nav.lang.label}<Arrow size={15} aria-hidden /></a></div>
      </footer>
    </div>
  );
}
