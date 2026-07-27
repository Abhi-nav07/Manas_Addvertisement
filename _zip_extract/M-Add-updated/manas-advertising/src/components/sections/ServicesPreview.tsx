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
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/constants/content";

const icons = {
  Sparkles,
  Megaphone,
  MonitorSmartphone,
  Camera,
  Package,
  Compass,
};

export function ServicesPreview() {
  return (
    <section id="services" className="bg-white py-24">
      <Container>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Services built to move brands forward"
            description="From identity to campaigns, every service is designed to work together as one connected system."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
          >
            View all services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Reveal key={service.slug} delay={i * 0.06}>
                <Link href={`/services/${service.slug}`} data-cursor="hover">
                  <Card className="group h-full">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-primary)]/5 text-[var(--color-primary)] transition-all duration-500 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:-rotate-6 group-hover:scale-110">
                      <Icon size={24} className="transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[var(--color-primary)]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                      {service.summary}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
                      Learn more
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-500 group-hover:translate-x-2"
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
  );
}
