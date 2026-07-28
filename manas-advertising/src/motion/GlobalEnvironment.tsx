"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { AmbientMeshBackground } from "./background";

export function GlobalEnvironment() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  // Scene Director Color Grading
  useEffect(() => {
    if (reduceMotion) return;

    let hueRotate = "0deg";
    let themeClass = "theme-home";

    if (pathname.includes("/services")) {
      hueRotate = "20deg";
      themeClass = "theme-services";
    } else if (pathname.includes("/portfolio")) {
      hueRotate = "0deg"; 
      themeClass = "theme-portfolio";
    } else if (pathname.includes("/contact")) {
      hueRotate = "10deg"; 
      themeClass = "theme-contact";
    } else if (pathname.includes("/about")) {
      hueRotate = "-15deg"; 
      themeClass = "theme-about";
    }

    document.body.classList.remove(
      "theme-home",
      "theme-services",
      "theme-portfolio",
      "theme-contact",
      "theme-about"
    );
    document.body.classList.add(themeClass);

    if (containerRef.current) {
      containerRef.current.style.transition = "filter 2.5s cubic-bezier(0.83, 0, 0.17, 1)";
      containerRef.current.style.filter = `hue-rotate(${hueRotate}) blur(0px)`;
    }
  }, [pathname, reduceMotion]);

  // Layer 6: Cursor Lighting (follows mouse)
  useEffect(() => {
    if (reduceMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursorGlow = (e: MouseEvent) => {
      gsap.to(cursorGlowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursorGlow);
    return () => window.removeEventListener("mousemove", moveCursorGlow);
  }, [reduceMotion]);

  return (
    <>
      <div 
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-[-1] bg-[var(--color-primary)] overflow-hidden"
      >
        {/* Layer 1: Background Gradient & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[#050D1A]" />
        <AmbientMeshBackground className="opacity-80 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-primary)_100%)] opacity-60 mix-blend-multiply" />
        
        {/* Layer 2: Noise (Filmic Texture behind glows) */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
          <filter id="cinematicNoiseBg">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematicNoiseBg)" />
        </svg>

        {/* Layer 3: Glow Pulses (Ambient breathing) */}
        <div className="absolute top-1/4 left-1/4 h-[50vh] w-[50vh] rounded-full bg-[var(--color-accent)] opacity-[0.03] mix-blend-screen blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 h-[60vh] w-[60vh] rounded-full bg-[var(--color-accent)] opacity-[0.02] mix-blend-screen blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

        {/* Layer 4: Particles */}
        {/* Particles are currently injected per-scene (e.g. Hero) for better localized control, 
            but the global space is ready for them if needed. */}

        {/* Layer 5: Light Sweep */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />

        {/* Layer 6: Cursor Lighting */}
        <div 
          ref={cursorGlowRef}
          className="absolute left-0 top-0 hidden md:block h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-[0.08] mix-blend-screen blur-[80px] will-change-transform"
        />
      </div>

      {/* Top Level Global Noise (Optional slight pass over UI for complete filmic binding) */}
      <svg className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.02] mix-blend-overlay" style={{ pointerEvents: 'none' }}>
        <filter id="cinematicNoiseTop">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematicNoiseTop)" />
      </svg>
    </>
  );
}
