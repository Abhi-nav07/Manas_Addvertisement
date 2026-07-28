import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { MotionProvider } from "@/motion/provider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GlobalEnvironment } from "@/motion/GlobalEnvironment";
import { LivingCursor } from "@/components/ui/LivingCursor";
import { Preloader } from "@/components/ui/Preloader";
import { PageTransition } from "@/components/layout/PageTransition";

const SITE_URL = "https://manasadvertising.in";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-family",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-family",
  display: "swap",
});

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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AdvertisingAgency",
              name: "Manas Advertising",
              url: SITE_URL,
              image: `${SITE_URL}/og-image.jpg`,
              telephone: ["+91 98272 06185", "+91 74705 62475"],
              email: "enquiry@manasadvertising.in",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "1st Floor Nanaksar Kota Stone, In Front Of ICICI Bank, AB Road, Dewas Naka",
                addressLocality: "Indore",
                addressRegion: "MP",
                addressCountry: "IN",
              },
              openingHours: "Mo-Fr 09:30-18:30",
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.location.pathname,c="theme-home";if(p.indexOf("/services")===0)c="theme-services";else if(p.indexOf("/portfolio")===0)c="theme-portfolio";else if(p.indexOf("/contact")===0)c="theme-contact";else if(p.indexOf("/about")===0)c="theme-about";document.documentElement.setAttribute("data-pretheme",c);}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(sessionStorage.getItem("manas_preloader_played")){document.documentElement.classList.add("preloader-done");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        <ErrorBoundary>
          <LivingCursor />
          <GlobalEnvironment />
          <ScrollProgress />
          <MotionProvider>
            <Preloader />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-[var(--color-primary)]"
            >
              Skip to content
            </a>
            <PageTransition>{children}</PageTransition>
            <ScrollToTop />
          </MotionProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
