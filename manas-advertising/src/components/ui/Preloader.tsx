"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { usePreloader } from "@/motion/provider";
import { CinematicEase } from "@/motion/presets";
import { useReducedMotion } from "framer-motion";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { setPreloaderFinished } = usePreloader();
  const reduceMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if we've already run the preloader this session
    const hasRun = sessionStorage.getItem("manas_preloader_played");
    
    if (hasRun || reduceMotion) {
      setPreloaderFinished(true);
      setShouldRender(false);
      return;
    }

    // We need to run it, so let's inform the context immediately 
    setPreloaderFinished(false);

    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("manas_preloader_played", "true");
          document.body.style.overflow = "";
          setPreloaderFinished(true);
          setShouldRender(false);
        }
      });

      tl.set(logoRef.current, { opacity: 0, y: 10, filter: "blur(10px)" })
        .set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })
        
        // 1. Reveal logo softly
        .to(logoRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out"
        })
        
        // 2. Draw progress line
        .to(lineRef.current, {
          scaleX: 1,
          duration: 1,
          ease: CinematicEase
        }, "-=0.4")
        
        // 3. Fade everything out smoothly
        .to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: 0.2
        });
        
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [setPreloaderFinished, reduceMotion]);

  if (!shouldRender) return null;

  return (
    <div 
      id="preloader"
      ref={containerRef} 
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--color-primary)]"
    >
      <div ref={logoRef} className="relative h-16 w-48 mb-8">
        <Image 
          src="https://file.garden/amYCKVkR9Rqi4_W9/Logo" 
          alt="Manas Advertising" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      <div className="h-[1px] w-48 bg-white/10 overflow-hidden relative">
        <div ref={lineRef} className="absolute inset-0 bg-[var(--color-accent)] origin-left" />
      </div>
    </div>
  );
}
