import { contact, getDict, type Locale } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";
import { Contact } from "./contact";
import { Faq } from "./faq";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Impact } from "./impact";
import { Partners } from "./partners";
import { Platform } from "./platform";
import { Solutions } from "./solutions";

export function Landing({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "REUP",
    url: siteUrl,
    logo: "https://reup.sa/images/REUP.png",
    email: contact.email,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khaleej Road, West Beach",
      addressLocality: "Dammam",
      postalCode: "32413",
      addressCountry: "SA",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:start-4"
      >
        {locale === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <Header t={t.nav} />
      <main id="main">
        <Hero t={t.hero} preview={t.preview} />
        <Partners t={t.partners} />
        <Platform t={t.platform} />
        <Solutions t={t.solutions} />
        <HowItWorks t={t.how} />
        <Impact t={t.impact} locale={locale} />
        <Faq t={t.faq} />
        <Contact t={t.contact} locale={locale} />
      </main>
      <Footer t={t.footer} nav={t.nav} address={t.contact.address} />
    </>
  );
}
