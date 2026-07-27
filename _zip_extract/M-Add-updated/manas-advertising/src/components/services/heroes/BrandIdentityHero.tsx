"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function BrandIdentityHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !container.current) return;
    
    const elements = container.current.children;
    
    gsap.set(elements, { 
      opacity: 0, 
      scale: 0.8,
      rotation: (i) => i * 45
    });

    gsap.to(elements, {
      opacity: 1,
      scale: 1,
      rotation: (i) => i * 45 + (i % 2 === 0 ? 360 : -360),
      duration: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "center"
      }
    });
  }, { scope: container, dependencies: [reduceMotion] });

  return (
    <div ref={container} className="relative flex h-full min-h-[400px] w-full items-center justify-center">
      {/* Abstract Logo Construction */}
      <div className="absolute h-40 w-40 rounded-full border-2 border-[var(--color-accent)] mix-blend-screen opacity-50 blur-[2px]" />
      <div className="absolute h-48 w-48 rounded-full border border-white/20 mix-blend-screen" />
      <div className="absolute h-32 w-32 rounded-lg border-2 border-[var(--color-accent)] mix-blend-screen opacity-70" />
      <div className="absolute h-56 w-56 rounded-full border border-[var(--color-accent)]/30 border-dashed mix-blend-screen" />
      
      {/* Typography representation */}
      <div className="absolute font-display text-[8rem] font-bold text-white/5 mix-blend-overlay">
        A
      </div>
    </div>
  );
}
