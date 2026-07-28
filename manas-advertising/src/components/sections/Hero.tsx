"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ParallaxLayer } from "@/motion/parallax";
import { AmbientParticles } from "@/motion/particles";
import { CinematicEase } from "@/motion/presets";
import { usePreloader } from "@/motion/provider";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const containerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);
  
  const { preloaderFinished } = usePreloader();

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined" || !preloaderFinished) return;

    const ctx = gsap.context(() => {
      // 1. Opening Frame (Setup)
      gsap.set(lightingRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(watermarkRef.current, { opacity: 0, scale: 1.1, x: 100 });
      gsap.set(
        [badgeRef.current, descRef.current, ctaRef.current, statsRef.current, scrollHintRef.current],
        { opacity: 0, y: 30 }
      );
      gsap.set(".title-line", { yPercent: 120, opacity: 0, rotateZ: 2 });
      gsap.set(".particle-layer", { opacity: 0 });

      // The 7-Step Attention Scene Orchestration
      const tl = gsap.timeline({ defaults: { ease: CinematicEase }, delay: 0.2 });

      // 2. Lighting Reveal
      tl.to(lightingRef.current, {
        opacity: 0.15,
        scale: 1,
        duration: 2,
        ease: "power2.out"
      }, 0)
      
      // 3. Typography Reveal
      .to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, 0.6)
      .to(".title-line", {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 1.4,
        stagger: 0.15,
      }, 0.8)
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, 1.2)
      
      // 4. Depth Expansion (Watermark & Particles drop in, expanding the Z-axis)
      .to(watermarkRef.current, {
        opacity: 0.03,
        x: 0,
        scale: 1,
        duration: 3,
        ease: "power3.out"
      }, 1.0)
      .to(".particle-layer", {
        opacity: 1,
        duration: 2,
      }, 1.2)

      // 5. CTA Focus
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, 1.6)
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2
      }, 1.8)

      // 6. Scroll Invitation
      .to(scrollHintRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
      }, 2.4);

      // Continuous infinite animation for scroll hint
      gsap.to(".scroll-icon", {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 3.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, [reduceMotion, preloaderFinished]);

  return (
    <section ref={containerRef} className="relative flex min-h-screen items-center overflow-hidden bg-transparent pt-20">
      
      {/* Local Scene Lighting */}
      <div 
        ref={lightingRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_center,rgba(var(--color-accent-rgb),0.15)_0%,transparent_70%)] mix-blend-screen pointer-events-none z-0"
        style={reduceMotion ? { opacity: 0.15 } : { opacity: 0, scale: 0.8 }}
      />

      {/* Premium Oversized Brand Watermark */}
      <ParallaxLayer speed={0.8} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          ref={watermarkRef}
          className="absolute right-0 top-1/2 h-[50vh] w-[200vw] md:h-[90vh] md:w-[100vw] -translate-y-1/2 translate-x-[30%] md:translate-x-[25%]"
          style={reduceMotion ? { opacity: 0.03, transform: "translate(0%, -50%)" } : { opacity: 0, transform: "translate(0%, -50%) scale(1.1) translateX(100px)" }}
        >
          <Image 
            src="https://file.garden/amYCKVkR9Rqi4_W9/Logo" 
            alt="MANAS Watermark" 
            fill 
            className="object-contain mix-blend-screen"
            priority
            sizes="100vw"
          />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.2} className="absolute inset-0 particle-layer" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
        <AmbientParticles count={30} />
      </ParallaxLayer>

      <Container className="relative z-10 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <div className="overflow-hidden mb-6">
            <span
              ref={badgeRef}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70"
              style={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(30px)" }}
            >
              Advertising & Branding Studio · India
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[1.05] text-white flex flex-col gap-2">
            <div className="overflow-hidden py-1">
              <span className="block title-line origin-bottom-left" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
                Ideas that make
              </span>
            </div>
            <div className="overflow-hidden py-2">
              <span className="block title-line origin-bottom-left" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
                brands <span className="text-[var(--color-accent)] drop-shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]">unforgettable.</span>
              </span>
            </div>
          </h1>

          <p
            ref={descRef}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
            style={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(30px)" }}
          >
            Manas Advertising crafts bold brand identities and campaigns for
            businesses that refuse to blend in — strategy, design, and
            storytelling under one roof.
          </p>

          <div 
            ref={ctaRef}
            className="mt-10 flex flex-wrap gap-4"
            style={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(30px)" }}
          >
            <Link href="/portfolio">
              <Button variant="primary" className="group shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)]">
                View Our Work
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Start a Project</Button>
            </Link>
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-20 flex flex-wrap gap-x-14 gap-y-6 border-t border-white/10 pt-8 text-white/50 pointer-events-auto"
          style={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(30px)" }}
        >
          {[
            ["120+", "Brands Launched"],
            ["12", "Years of Craft"],
            ["40+", "Industry Awards"],
          ].map(([stat, label]) => (
            <div key={label} className="group cursor-default">
              <div className="text-2xl font-semibold text-white transition-all duration-300 group-hover:text-[var(--color-accent)] group-hover:scale-105 group-hover:-translate-y-1">{stat}</div>
              <div className="text-xs uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity duration-300">{label}</div>
            </div>
          ))}
        </div>
      </Container>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex"
        style={reduceMotion ? { opacity: 1 } : { opacity: 0, transform: "translateY(30px) translateX(-50%)" }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="scroll-icon">
          <ChevronDown size={16} />
        </div>
      </div>
    </section>
  );
}
