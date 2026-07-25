"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function ContentProductionHero() {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !container.current) return;
    
    const frames = container.current.querySelectorAll(".photo-frame");
    
    gsap.set(frames, { 
      opacity: 0,
      z: -500,
      rotationY: () => Math.random() * 40 - 20,
      rotationX: () => Math.random() * 40 - 20
    });

    gsap.to(frames, {
      opacity: 0.8,
      z: 0,
      duration: 2,
      ease: "power3.out",
      stagger: 0.2
    });

    // Slow ambient float
    gsap.to(frames, {
      y: () => Math.random() * 40 - 20,
      x: () => Math.random() * 40 - 20,
      rotationY: () => Math.random() * 20 - 10,
      rotationX: () => Math.random() * 20 - 10,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      },
      delay: 2
    });

  }, { scope: container, dependencies: [reduceMotion] });

  return (
    <div ref={container} className="relative flex h-full min-h-[400px] w-full items-center justify-center [perspective:1000px]">
      <div className="photo-frame absolute h-40 w-56 -rotate-12 rounded bg-white/10 p-2 backdrop-blur-sm shadow-2xl">
        <div className="h-full w-full bg-black/40" />
      </div>
      
      <div className="photo-frame absolute h-64 w-48 rotate-6 rounded bg-white/20 p-2 backdrop-blur-md shadow-2xl z-10">
        <div className="h-full w-full bg-gradient-to-tr from-black/60 to-transparent" />
        {/* Rec indicator */}
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="text-[10px] font-bold text-white tracking-widest">REC</span>
        </div>
      </div>
      
      <div className="photo-frame absolute -bottom-10 right-10 h-32 w-40 rotate-12 rounded bg-white/5 p-2 backdrop-blur shadow-xl">
        <div className="h-full w-full bg-[var(--color-accent)]/20" />
      </div>
    </div>
  );
}
