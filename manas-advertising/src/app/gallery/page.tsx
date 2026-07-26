import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import Image from "next/image";
import { portfolio } from "@/constants/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual gallery of Manas Advertising's brand and campaign work.",
};

const galleryImages = [
  "https://images.unsplash.com/photo-1555529733-0e670560f7e1?w=1600&q=80",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1600&q=80",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80"
];

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
                    <Image src={galleryImages[i % galleryImages.length]} alt={item.client} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/50 to-[#1a3155]/50" />
                    <span className="relative z-10 text-xs font-medium uppercase tracking-wide">
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
