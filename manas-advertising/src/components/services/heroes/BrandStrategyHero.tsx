"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function BrandStrategyHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !container.current) return;
    
    const rings = container.current.querySelectorAll(".strategy-ring");
    const node = container.current.querySelector(".strategy-node");
    
    gsap.to(rings, {
      rotation: (i) => (i % 2 === 0 ? 360 : -360),
      duration: (i) => 20 + i * 5,
      repeat: -1,
      ease: "linear"
    });

    gsap.to(node, {
      scale: 1.2,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container, dependencies: [reduceMotion] });

  return (
    <div ref={container} className="relative flex h-full min-h-[400px] w-full items-center justify-center">
      {/* Abstract Compass / Architecture Rings */}
      <div className="strategy-ring absolute h-[400px] w-[400px] rounded-full border border-white/5" />
      <div className="strategy-ring absolute h-[300px] w-[300px] rounded-full border border-[var(--color-accent)]/20 border-dashed" />
      <div className="strategy-ring absolute h-[200px] w-[200px] rounded-full border-2 border-white/10">
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-accent)]" />
      </div>
      
      {/* Center Node */}
      <div className="strategy-node absolute h-12 w-12 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-white blur-md" />
      <div className="absolute h-8 w-8 rounded-full bg-[var(--color-primary)]" />
      
      {/* Target Lines */}
      <div className="absolute h-[1px] w-[500px] bg-white/5" />
      <div className="absolute h-[500px] w-[1px] bg-white/5" />
    </div>
  );
}
