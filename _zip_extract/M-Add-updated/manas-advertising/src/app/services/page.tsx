import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Megaphone,
  MonitorSmartphone,
  Camera,
  Package,
  Compass,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { services } from "@/constants/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Manas Advertising's full range of services — brand identity, digital campaigns, web experience, content production, packaging, and strategy.",
};

const icons = {
  Sparkles,
  Megaphone,
  MonitorSmartphone,
  Camera,
  Package,
  Compass,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Services"
          title="Everything your brand needs, under one roof"
          description="Strategy, identity, campaigns, content, and web experience — connected as one system, not disjointed hand-offs."
        />

        <section className="bg-white py-24">
          <Container>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => {
                const Icon = icons[service.icon as keyof typeof icons];
                return (
                  <Reveal key={service.slug} delay={i * 0.06}>
                    <Link href={`/services/${service.slug}`}>
                      <Card className="group h-full">
                        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                          <Icon size={20} />
                        </div>
                        <h2 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                          {service.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                          {service.summary}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)]">
                          Learn more
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </Card>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
