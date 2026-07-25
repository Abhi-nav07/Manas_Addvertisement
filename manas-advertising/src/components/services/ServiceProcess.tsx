"use client";

import { useRef } from "react";
import { Service } from "@/types/content";
import { process } from "@/constants/content";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion, useScroll, useSpring } from "framer-motion";

export function ServiceProcess({ service }: { service: Service }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative bg-neutral-50 py-24 lg:py-32 overflow-hidden">
      <Container className="relative z-10">
        <Reveal className="mb-16 max-w-2xl text-center md:mx-auto">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            Our Process
          </span>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-[var(--color-primary)]">
            How we deliver <br /> {service.title}
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          {/* Animated Timeline Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-neutral-200 md:left-1/2 md:-ml-[1px]">
            <motion.div 
              className="absolute left-0 right-0 top-0 origin-top bg-[var(--color-accent)]"
              style={{ scaleY, bottom: 0 }}
            />
          </div>

          <div className="space-y-12">
            {process.map((step, idx) => (
              <Reveal key={step.title} delay={idx * 0.1}>
                <div className={`relative flex items-center justify-between md:justify-normal ${idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[var(--color-primary)] text-white shadow-xl md:left-1/2 md:-ml-7">
                    <span className="font-display text-lg font-bold">{idx + 1}</span>
                  </div>

                  {/* Content Card */}
                  <div className="ml-20 w-full md:ml-0 md:w-[calc(50%-3rem)]">
                    <div className="group rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-black/5">
                      <h3 className="font-display text-xl font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
