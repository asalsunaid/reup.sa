import "../globals.css";
import { fontVars } from "@/lib/fonts";
import { buildMetadata } from "@/lib/metadata";
import { themeScript } from "@/lib/theme";

export const metadata = buildMetadata("en");
export { viewport } from "@/lib/metadata";

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
