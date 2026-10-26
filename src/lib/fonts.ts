import { IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";

// IBM Plex is REUP's existing brand typeface; the Arabic cut carries matching Latin glyphs.
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  // Only used for small UI details (subdomains, invoice numbers), so it should not compete with the Arabic face for preload bandwidth.
  preload: false,
});

export const fontVars = `${plexArabic.variable} ${plexMono.variable}`;
