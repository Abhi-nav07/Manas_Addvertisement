import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { ImageReveal } from "@/components/ui/ImageReveal";

import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Manas Advertising — a premium advertising and branding studio based in Indore, India.",
};

const values = [
  { title: "Craft", description: "We sweat every detail, from kerning to color proofing." },
  { title: "Curiosity", description: "We dig deeper into your category before we design anything." },
  { title: "Candor", description: "We tell you what will work, not just what sounds good." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="About Us"
          title="A studio built on strategy, craft, and honesty"
          description="Manas Advertising has spent 12 years helping brands across India find their voice and grow with it."
        />

        <section className="bg-white py-24 relative">
          <Container className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-start">
            {/* Sticky Text Column */}
            <div className="md:sticky md:top-32">
              <Reveal>
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
                  Our Story
                </span>
                <h2 className="font-display text-3xl font-semibold text-[var(--color-primary)]">
                  Founded on a simple idea: great strategy deserves great craft
                </h2>
                <p className="mt-5 text-neutral-500 leading-relaxed">
                  Manas Advertising started in Indore with a small team convinced
                  that Indian brands deserved the same level of strategic and
                  creative rigor as any global agency. Over 12 years, that belief
                  has grown into a full-service studio spanning brand strategy,
                  identity, campaigns, content, and digital experience — all
                  built in-house, under one roof.
                </p>
                <p className="mt-4 text-neutral-500 leading-relaxed">
                  Today we work with founders and marketing teams across FMCG,
                  fintech, fitness, and D2C — helping them launch, reposition,
                  and grow with clarity and confidence.
                </p>
              </Reveal>
            </div>
            
            {/* Scrolling Visuals Column */}
            <div className="flex flex-col gap-10">
              <ImageReveal className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-xl">
                <video 
                  src="/videos/bg.mp4" 
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </ImageReveal>

              <Reveal className="grid grid-cols-1 gap-5">
                {values.map((v) => (
                  <Card key={v.title} hover={false} className="border border-black/5 bg-white shadow-lg transition-transform hover:-translate-y-1">
                    <h3 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-500">{v.description}</p>
                  </Card>
                ))}
              </Reveal>
            </div>
          </Container>
        </section>

        <WhyChooseUs />
        <ProcessTimeline />

        <section className="bg-white py-20">
          <Container>
            <SectionHeading
              eyebrow="Leadership"
              title="A senior team, invested in every project"
              align="center"
              className="mb-14"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Rohan Kapoor", "Aisha Fernandes", "Vikram Rao", "Neha Kulkarni"].map(
                (name, i) => (
                  <Reveal key={name} delay={i * 0.08}>
                    <Card hover={false} className="text-center">
                      <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-[var(--color-primary)]/10" />
                      <h3 className="font-display text-base font-semibold text-[var(--color-primary)]">
                        {name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
                        {["Founder & CEO", "Creative Director", "Head of Strategy", "Head of Production"][i]}
                      </p>
                    </Card>
                  </Reveal>
                )
              )}
            </div>
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
