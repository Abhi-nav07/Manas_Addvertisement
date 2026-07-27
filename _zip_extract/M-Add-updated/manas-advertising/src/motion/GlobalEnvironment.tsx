"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { AmbientMeshBackground } from "./background";

export function GlobalEnvironment() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // We want the background to feel alive and continuously shifting,
  // but we can gently tint it based on the current route to give each
  // section a distinct but connected flavor.
  useEffect(() => {
    let hueRotate = "0deg";
    let themeClass = "theme-home";

    if (pathname.includes("/services")) {
      hueRotate = "20deg";
      themeClass = "theme-services";
    } else if (pathname.includes("/portfolio")) {
      hueRotate = "0deg"; // Restrained portfolio
      themeClass = "theme-portfolio";
    } else if (pathname.includes("/contact")) {
      hueRotate = "10deg"; // Soft ice blue ambiance
      themeClass = "theme-contact";
    } else if (pathname.includes("/about")) {
      hueRotate = "-15deg"; // Emerald/teal vibes
      themeClass = "theme-about";
    }

    // Apply the cinematic color grading class to the global body
    document.body.classList.remove(
      "theme-home",
      "theme-services",
      "theme-portfolio",
      "theme-contact",
      "theme-about"
    );
    document.body.classList.add(themeClass);

    if (reduceMotion) return;

    if (containerRef.current) {
      containerRef.current.style.transition = "filter 2.5s ease-in-out";
      containerRef.current.style.filter = `hue-rotate(${hueRotate}) blur(0px)`;
    }
  }, [pathname, reduceMotion]);



  return (
    <div 
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[-1] bg-[var(--color-primary)] overflow-hidden"
    >
      {/* We reuse the mesh background but put it fixed globally */}
      <AmbientMeshBackground className="opacity-80 mix-blend-screen" />
      
      {/* Global subtle vignette overlay to pull focus to the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-primary)_100%)] opacity-60 mix-blend-multiply" />
    </div>
  );
}
