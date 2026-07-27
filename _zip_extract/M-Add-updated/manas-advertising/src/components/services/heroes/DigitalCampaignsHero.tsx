"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function DigitalCampaignsHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !container.current) return;
    
    const bars = container.current.querySelectorAll(".graph-bar");
    const dots = container.current.querySelectorAll(".graph-dot");
    
    // Animate bars
    gsap.fromTo(bars, 
      { scaleY: 0.1, opacity: 0 },
      {
        scaleY: () => Math.random() * 0.8 + 0.2,
        opacity: 0.8,
        duration: 2,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    // Make bars fluctuate
    gsap.to(bars, {
      scaleY: () => Math.random() * 0.8 + 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      },
      delay: 2
    });

    // Floating dots
    gsap.to(dots, {
      y: "-=30",
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3
    });

  }, { scope: container, dependencies: [reduceMotion] });

  return (
    <div ref={container} className="relative flex h-full min-h-[400px] w-full items-end justify-center gap-2 pb-10">
      {/* Abstract Bar Chart */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={`bar-${i}`} className="relative flex h-64 w-12 flex-col justify-end">
          <div className="graph-dot absolute -top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-accent)] blur-[2px]" />
          <div 
            className="graph-bar w-full origin-bottom rounded-t-sm bg-gradient-to-t from-[var(--color-accent)]/10 to-[var(--color-accent)]/60 backdrop-blur-sm"
            style={{ height: "100%" }}
          />
        </div>
      ))}
      
      {/* Grid Lines */}
      <div className="absolute inset-0 z-[-1] flex flex-col justify-between border-l border-b border-white/10 opacity-30">
        <div className="h-px w-full bg-white/10" />
        <div className="h-px w-full bg-white/10" />
        <div className="h-px w-full bg-white/10" />
        <div className="h-px w-full bg-white/10" />
      </div>
    </div>
  );
}
