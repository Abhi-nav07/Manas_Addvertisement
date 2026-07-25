import type { Metadata } from "next";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MotionProvider } from "@/motion/provider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GlobalEnvironment } from "@/motion/GlobalEnvironment";
import { LivingCursor } from "@/components/ui/LivingCursor";

const SITE_URL = "https://manasadvertising.in";

export const viewport: import("next").Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Manas Advertising — Ideas that make brands unforgettable",
    template: "%s | Manas Advertising",
  },
  description:
    "Manas Advertising is a premium advertising and branding studio crafting bold brand identities and campaigns for businesses that refuse to blend in.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Manas Advertising",
    title: "Manas Advertising — Ideas that make brands unforgettable",
    description:
      "Premium advertising and branding studio crafting bold brand identities and campaigns.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Advertising — Ideas that make brands unforgettable",
    description:
      "Premium advertising and branding studio crafting bold brand identities and campaigns.",
    images: ["/og-image.jpg"],
  },
};

import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <LivingCursor />
          <GlobalEnvironment />
          <ScrollProgress />
          <MotionProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[var(--color-primary)]"
            >
              Skip to content
            </a>
            {children}
            <ScrollToTop />
          </MotionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
