import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { CTASection } from "@/components/sections/CTASection";
import { testimonials } from "@/constants/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Hear what our clients have to say about working with Manas Advertising.",
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Testimonials"
          title="Trusted by founders and marketing teams"
          description="Real feedback from the brands we've partnered with."
        />

        <section className="bg-white py-20">
          <Container>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.06}>
                  <Card hover={false} className="h-full">
                    <Quote className="mb-4 text-[var(--color-accent)]" size={26} />
                    <p className="leading-relaxed text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-6 text-sm">
                      <span className="font-semibold text-[var(--color-primary)]">{t.name}</span>
                      <span className="text-neutral-500"> · {t.role}, {t.company}</span>
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <ClientLogos />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
