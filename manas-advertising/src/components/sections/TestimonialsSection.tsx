"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/constants/content";
import { CinematicEase } from "@/motion/presets";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = testimonials[index];
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      go(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, go]);

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;
    
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([headerRef.current, contentRef.current], { opacity: 0, y: 40 });

      // The Trust Scene Orchestration
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
          .to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2
          }, "-=0.8");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section 
      ref={sectionRef}
      className="bg-[var(--color-primary)] py-24 relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container className="relative z-10">
        <div ref={headerRef} style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
          <SectionHeading
            eyebrow="Client Voices"
            title="What our clients say"
            align="center"
            light
            className="mb-14"
          />
        </div>

        <div ref={contentRef} className="relative mx-auto max-w-2xl text-center" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
          <Quote className="mx-auto mb-6 text-[var(--color-accent)]" size={32} />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 1.02 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Approximates CinematicEase (power4.out)
            >
              <p className="font-display text-xl font-medium leading-relaxed text-white md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 text-sm text-white/60">
                <span className="font-semibold text-white">{t.name}</span>
                {" · "}
                {t.role}, {t.company}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  data-cursor="hover"
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-[var(--color-accent)]" : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              data-cursor="hover"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
