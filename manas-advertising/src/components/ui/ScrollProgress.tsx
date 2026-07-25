"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();



  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[1000] h-[3px] origin-left bg-[var(--color-accent)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
