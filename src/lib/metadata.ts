import type { Metadata, Viewport } from "next";
import { getDict, type Locale } from "./content";

export const siteUrl = "https://reup.sa";

export function buildMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(siteUrl),
    title: t.title,
    description: t.description,
    icons: { icon: "https://reup.sa/favicon.svg" },
    alternates: {
      canonical: locale === "ar" ? "/" : "/en",
      languages: { ar: "/", en: "/en" },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      siteName: "REUP",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0920" },
  ],
};
