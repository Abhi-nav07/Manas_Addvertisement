"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

export function AmbientMeshBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !containerRef.current) return;
    
    const blobs = containerRef.current.children;
    
    gsap.to(blobs[0], {
      x: "15%",
      y: "10%",
      rotation: 15,
      scale: 1.1,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(blobs[1], {
      x: "-10%",
      y: "-20%",
      rotation: -10,
      scale: 1.2,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2
    });
  }, { scope: containerRef, dependencies: [reduceMotion] });

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ""}`}>
      <div 
        className="absolute -top-[30%] -left-[10%] h-[80%] w-[80%] rounded-full bg-[var(--color-accent)] mix-blend-screen opacity-20 blur-[140px]" 
        style={{ willChange: "transform" }}
      />
      <div 
        className="absolute -bottom-[20%] -right-[10%] h-[80%] w-[80%] rounded-full bg-blue-500/20 mix-blend-screen opacity-30 blur-[140px]" 
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
