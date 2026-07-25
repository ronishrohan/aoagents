import { COMPANY } from "@superset/shared/constants";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";

import { CookieConsent } from "@/components/CookieConsent";
import {
  OrganizationJsonLd,
  SoftwareApplicationJsonLd,
  WebsiteJsonLd,
} from "@/components/JsonLd";

import { CTAButtons } from "./components/CTAButtons";
import { Footer } from "./components/Footer";
import { GitHubStarCounter } from "./components/GitHubStarCounter";
import { Header } from "./components/Header";
import "./globals.css";
import { Providers } from "./providers";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteDescription =
  "Mission control for a fleet of coding agents. 23 harnesses in isolated worktrees, with CI and review feedback routed back to the agent that owns the branch. Free and open source under Apache 2.0.";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.MARKETING_URL),
  title: {
    default: `${COMPANY.NAME}: Mission control for coding agents`,
    template: `%s | ${COMPANY.SHORT_NAME}`,
  },
  description: siteDescription,
  keywords: [
    "coding agents",
    "agent orchestration",
    "parallel execution",
    "developer tools",
    "AI coding",
    "git worktrees",
    "code automation",
    "Claude Code",
    "Cursor",
    "Codex",
    "agent fleet",
    "PR automation",
  ],
  authors: [{ name: `${COMPANY.NAME} Team` }],
  creator: COMPANY.NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.MARKETING_URL,
    siteName: COMPANY.NAME,
    title: `${COMPANY.NAME}: Stop babysitting agents. Start merging real work.`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${COMPANY.NAME}: Mission control for coding agents`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.NAME}: Stop babysitting agents. Start merging real work.`,
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@aoagents",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark overscroll-none ${ibmPlexMono.variable} ${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <OrganizationJsonLd />
        <SoftwareApplicationJsonLd />
        <WebsiteJsonLd />
      </head>
      <body className="overscroll-none font-sans antialiased">
        <Providers>
          <Header
            ctaButtons={<CTAButtons />}
            starCounter={<GitHubStarCounter />}
          />
          {children}
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
