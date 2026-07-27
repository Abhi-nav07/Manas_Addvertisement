"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Adjust intensity
}

export function ParallaxLayer({ children, className, speed = 1 }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !containerRef.current || !targetRef.current) return;

    gsap.fromTo(
      targetRef.current,
      { y: `${10 * speed}%` },
      {
        y: `-${10 * speed}%`,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef, dependencies: [reduceMotion, speed] });

  return (
    <div ref={containerRef} className={`overflow-hidden ${className || ""}`}>
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
