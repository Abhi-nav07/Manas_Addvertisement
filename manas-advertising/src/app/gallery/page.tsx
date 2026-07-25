import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { portfolio } from "@/constants/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual gallery of Manas Advertising's brand and campaign work.",
};

export default function GalleryPage() {
  const tiles = [...portfolio, ...portfolio].slice(0, 9);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Gallery"
          title="A visual look at our work"
          description="Snapshots from recent brand identity, packaging, and campaign projects."
        />

        <section className="bg-white py-20">
          <Container>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {tiles.map((item, i) => (
                <Reveal
                  key={`${item.slug}-${i}`}
                  delay={(i % 6) * 0.06}
                  className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
                >
                  <div
                    className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[#1a3155] p-6 text-center text-white/70 ${
                      i % 5 === 0 ? "aspect-square" : "aspect-square"
                    }`}
                  >
                    <span className="text-xs font-medium uppercase tracking-wide">
                      {item.client}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
