import type { Metadata, Viewport } from "next";
import { Anek_Malayalam, Inter, Montserrat, Noto_Sans_Malayalam } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

// Malayalam faces are only fetched by pages that use them.
const mlHeading = Anek_Malayalam({
  variable: "--font-ml-heading",
  subsets: ["malayalam"],
  weight: ["700", "800"],
  preload: false,
});

const mlBody = Noto_Sans_Malayalam({
  variable: "--font-ml-body",
  subsets: ["malayalam"],
  preload: false,
});

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: productionUrl ? new URL(`https://${productionUrl}`) : undefined,
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mlHeading.variable} ${mlBody.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
