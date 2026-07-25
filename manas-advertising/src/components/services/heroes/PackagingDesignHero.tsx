"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function PackagingDesignHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !container.current) return;
    
    const layers = container.current.querySelectorAll(".package-layer");
    
    gsap.fromTo(layers, 
      { y: 100, opacity: 0, rotationX: 60, rotationZ: -45 },
      {
        y: (i) => i * -40,
        opacity: 1,
        rotationX: 60,
        rotationZ: -45,
        duration: 2,
        ease: "power3.out",
        stagger: 0.2
      }
    );

    gsap.to(layers, {
      y: (i) => i * -40 - 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.2,
        from: "start"
      },
      delay: 2
    });

  }, { scope: container, dependencies: [reduceMotion] });

  return (
    <div ref={container} className="relative flex h-full min-h-[400px] w-full items-center justify-center [perspective:1000px]">
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
        
        {/* Base shadow layer */}
        <div className="package-layer absolute h-64 w-48 bg-black/40 blur-xl" />
        
        {/* Cardboard layer */}
        <div className="package-layer absolute h-64 w-48 border border-white/5 bg-[#D2B48C]/20 backdrop-blur-sm" />
        
        {/* Label layer */}
        <div className="package-layer absolute h-64 w-48 border border-[var(--color-accent)]/30 bg-white/10 backdrop-blur-md">
          <div className="absolute left-1/2 top-10 h-16 w-16 -translate-x-1/2 rounded-full border border-[var(--color-accent)] opacity-50" />
          <div className="absolute bottom-10 left-8 right-8 space-y-2">
            <div className="h-2 w-full bg-white/20" />
            <div className="h-2 w-3/4 bg-white/20" />
          </div>
        </div>

        {/* Gloss overlay layer */}
        <div className="package-layer absolute h-64 w-48 bg-gradient-to-tr from-transparent via-white/20 to-transparent mix-blend-overlay" />
        
      </div>
    </div>
  );
}
