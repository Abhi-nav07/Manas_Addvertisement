"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function WebExperienceHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !container.current) return;
    
    const uiCards = container.current.querySelectorAll(".ui-card");
    const codeLines = container.current.querySelectorAll(".code-line");
    
    // Float UI cards
    gsap.to(uiCards, {
      y: (i) => (i % 2 === 0 ? "-=20" : "+=20"),
      rotation: (i) => (i % 2 === 0 ? 2 : -2),
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    // Stagger in code lines
    gsap.fromTo(codeLines, 
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 0.5,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      }
    );

    // Pulse code lines
    gsap.to(codeLines, {
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      },
      delay: 1.5
    });

  }, { scope: container, dependencies: [reduceMotion] });

  return (
    <div ref={container} className="relative flex h-full min-h-[400px] w-full items-center justify-center">
      {/* Abstract Code Window */}
      <div className="absolute left-1/2 top-1/2 h-64 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
        <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-white/5 px-4">
          <div className="h-2 w-2 rounded-full bg-red-400/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <div className="h-2 w-2 rounded-full bg-green-400/80" />
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={`code-${i}`} 
              className={`code-line h-2 origin-left rounded-full bg-[var(--color-accent)] ${
                i % 3 === 0 ? "w-3/4" : i % 2 === 0 ? "w-1/2" : "w-1/4"
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="ui-card absolute -left-10 top-20 h-24 w-40 rounded-lg border border-[var(--color-accent)]/30 bg-white/10 backdrop-blur-lg shadow-xl" />
      <div className="ui-card absolute -right-5 bottom-10 h-32 w-48 rounded-lg border border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl">
        <div className="mt-4 ml-4 h-4 w-1/2 rounded bg-white/20" />
        <div className="mt-2 ml-4 h-2 w-3/4 rounded bg-white/10" />
        <div className="mt-2 ml-4 h-2 w-3/4 rounded bg-white/10" />
      </div>
    </div>
  );
}
