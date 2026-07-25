"use client";

import { useRef } from "react";
import { Service } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export function ServiceStory({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={containerRef} className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <Container className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr]">
        
        {/* Left: Sticky Context */}
        <div className="lg:sticky lg:top-32 lg:h-max">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-[var(--color-primary)]">
              The Engine <br /> Behind {service.title}
            </h2>
            <div className="mt-8 h-[1px] w-12 bg-[var(--color-accent)]" />
            <p className="mt-8 max-w-md text-lg leading-relaxed text-neutral-600">
              {service.description}
            </p>
          </Reveal>
        </div>

        {/* Right: Scrolling Deliverables / Solution */}
        <div className="space-y-8">
          <Reveal>
            <h3 className="mb-8 font-display text-2xl font-semibold text-[var(--color-primary)]">
              What&apos;s Included
            </h3>
          </Reveal>
          
          <div className="grid gap-6">
            {service.deliverables.map((deliverable, idx) => (
              <Reveal key={deliverable} delay={idx * 0.1}>
                <motion.div 
                  className="group relative overflow-hidden rounded-2xl border border-black/5 bg-neutral-50 p-8 transition-colors hover:bg-white hover:shadow-xl hover:shadow-black/5"
                  style={!reduceMotion ? { y: idx % 2 === 0 ? y1 : y2 } : undefined}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 transition-all duration-500 group-hover:from-[var(--color-accent)]/5 group-hover:to-transparent" />
                  
                  <div className="relative flex items-center gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-[var(--color-accent)]">
                      <Check size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-[var(--color-primary)]">
                        {deliverable}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
