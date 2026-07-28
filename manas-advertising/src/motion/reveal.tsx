"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { CinematicEase } from "./presets";
import { usePreloader } from "./provider";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeReveal({ children, className, delay = 0, duration = 1.2 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { preloaderFinished } = usePreloader();

  useGSAP(() => {
    if (reduceMotion || !ref.current || !preloaderFinished) return;
    
    gsap.set(ref.current, { opacity: 0 });
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          duration,
          delay,
          ease: "power2.out"
        });
      }
    });
  }, { scope: ref, dependencies: [reduceMotion, delay, duration, preloaderFinished] });

  return (
    <div ref={ref} className={className} style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
      {children}
    </div>
  );
}

export function SlideReveal({ children, className, delay = 0, duration = 1.2 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { preloaderFinished } = usePreloader();

  useGSAP(() => {
    if (reduceMotion || !ref.current || !preloaderFinished) return;
    
    gsap.set(ref.current, { opacity: 0, y: 30 });
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: CinematicEase
        });
      }
    });
  }, { scope: ref, dependencies: [reduceMotion, delay, duration, preloaderFinished] });

  return (
    <div ref={ref} className={className} style={reduceMotion ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(30px)" }}>
      {children}
    </div>
  );
}

export function MaskReveal({ children, className, delay = 0, duration = 1.4 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { preloaderFinished } = usePreloader();

  useGSAP(() => {
    if (reduceMotion || !contentRef.current || !containerRef.current || !preloaderFinished) return;
    
    gsap.set(contentRef.current, { yPercent: 100 });
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(contentRef.current, {
          yPercent: 0,
          duration,
          delay,
          ease: CinematicEase
        });
      }
    });
  }, { scope: containerRef, dependencies: [reduceMotion, delay, duration, preloaderFinished] });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className || ""}`}>
      <div ref={contentRef} style={reduceMotion ? { transform: "none" } : { transform: "translateY(100%)" }}>
        {children}
      </div>
    </div>
  );
}
