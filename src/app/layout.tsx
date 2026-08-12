import type { Metadata, Viewport } from "next";
import { config } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,

  keywords: [
    "AI",
    "Cybersecurity",
    "Software Development",
    "IT Student",
    "Developer",
    "Portfolio",
    "@rootward3n",
  ],

  authors: [{ name: config.profile.name }],

  creator: "@rootward3n",
  publisher: config.profile.name,

  robots: "index, follow",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rootward3n.github.io/portfolio/",
    title: config.seo.title,
    description: config.seo.description,
    siteName: "rootward3n Portfolio",
    images: [
      {
        url: config.seo.ogImage,
        width: 1200,
        height: 630,
        alt: "rootward3n Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: config.seo.title,
    description: config.seo.description,
    images: [config.seo.ogImage],
    creator: "@rootward3n",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Portfolio demo metadata */}
        <meta name="application-name" content="rootward3n Portfolio" />
        <meta name="apple-mobile-web-app-title" content="rootward3n" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="format-detection" content="telephone=no" />
      </head>

      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="vignette-overlay" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
