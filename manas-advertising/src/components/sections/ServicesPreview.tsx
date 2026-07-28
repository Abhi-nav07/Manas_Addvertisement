"use client";

import { useEffect, useRef } from "react";
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
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { services } from "@/constants/content";
import { CinematicEase } from "@/motion/presets";

const icons = {
  Sparkles,
  Megaphone,
  MonitorSmartphone,
  Camera,
  Package,
  Compass,
};

export function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card");
      
      // Initial states
      gsap.set(headerRef.current, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.98 });

      // The Discovery Scene Orchestration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: CinematicEase } });
          
          tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2
          })
          .to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.1
          }, "-=0.8");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="services" ref={sectionRef} className="bg-white py-24 relative overflow-hidden">
      <Container className="relative z-10">
        <div 
          ref={headerRef} 
          className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        >
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

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <div key={service.slug} className="service-card" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
                <Link href={`/services/${service.slug}`} data-cursor="hover">
                  <Card className="group h-full transition-shadow duration-500 hover:shadow-2xl hover:shadow-[var(--color-accent-rgb)]/10">
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
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
