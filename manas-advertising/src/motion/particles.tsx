"use client";

import { useRef, memo, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";

interface ParticlesProps {
  className?: string;
  count?: number;
}

export const AmbientParticles = memo(function AmbientParticles({ className, count = 20 }: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion || !containerRef.current) return;

    const particles = containerRef.current.children;

    gsap.set(particles, {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      opacity: () => Math.random() * 0.3 + 0.1,
      scale: () => Math.random() * 1.5 + 0.5,
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(particles, {
      y: "-=100",
      x: "+=50",
      rotation: 360,
      duration: () => Math.random() * 10 + 20,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random",
      }
    });

    // Store timeline on the container so we can access it later
    tlRef.current = tl;

    // Subtly react to scroll using ScrollTrigger
    gsap.to(particles, {
      y: "+=200",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

  }, { scope: containerRef, dependencies: [reduceMotion] });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const tl = tlRef.current;
          if (tl) {
            if (entry.isIntersecting) {
              tl.play();
            } else {
              tl.pause();
            }
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);



  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className || ""}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40 blur-[1px]"
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
});
