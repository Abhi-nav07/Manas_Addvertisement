"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/motion/parallax";
import { AmbientMeshBackground } from "@/motion/background";
import { AmbientParticles } from "@/motion/particles";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="bg-neutral-50 py-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-[var(--color-primary)] px-8 py-16 text-center md:px-16">
          <AmbientMeshBackground />
          <ParallaxLayer speed={0.4} className="absolute inset-0 pointer-events-none z-0">
            <AmbientParticles count={15} />
          </ParallaxLayer>
          <div className="relative z-10">
            <h2 className="mx-auto max-w-xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight text-white">
              Ready to make your brand unforgettable?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Tell us about your project and we&apos;ll get back to you within one business day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary" className="group">
                  Start a Project
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline">View Our Work</Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
