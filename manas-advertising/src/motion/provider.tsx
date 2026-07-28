"use client";

import { useEffect, ReactNode, createContext, useState, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PreloaderContextType {
  preloaderFinished: boolean;
  setPreloaderFinished: (finished: boolean) => void;
  lenisInstance: Lenis | null;
}

const PreloaderContext = createContext<PreloaderContextType>({
  preloaderFinished: false,
  setPreloaderFinished: () => {},
  lenisInstance: null,
});

export const usePreloader = () => useContext(PreloaderContext);

export function MotionProvider({ children }: { children: ReactNode }) {
  // Default to false. The Preloader will set this to true if it skips or finishes.
  // This completely solves the race condition where Hero starts animating before the Preloader takes control.
  const [preloaderFinished, setPreloaderFinished] = useState(false); 
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease out for cinematic feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <PreloaderContext.Provider value={{ preloaderFinished, setPreloaderFinished, lenisInstance }}>
      {children}
    </PreloaderContext.Provider>
  );
}
