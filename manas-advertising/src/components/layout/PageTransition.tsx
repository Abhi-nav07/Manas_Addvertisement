"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/motion/provider";

// Frozen router approach for smooth exit animations in Next.js App Router
function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { lenisInstance } = usePreloader();

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        exit={{ opacity: 0, filter: "blur(8px)", scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full transform-gpu"
        onAnimationComplete={() => {
          // Refresh scroll triggers after the new page has fully mounted and animated in
          ScrollTrigger.refresh();
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
