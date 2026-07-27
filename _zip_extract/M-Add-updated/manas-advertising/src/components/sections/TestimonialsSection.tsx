"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/constants/content";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = testimonials[index];

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

  return (
    <section 
      className="bg-[var(--color-primary)] py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        <SectionHeading
          eyebrow="Client Voices"
          title="What our clients say"
          align="center"
          light
          className="mb-14"
        />

        <Reveal className="relative mx-auto max-w-2xl text-center">
          <Quote className="mx-auto mb-6 text-[var(--color-accent)]" size={32} />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
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
        </Reveal>
      </Container>
    </section>
  );
}
