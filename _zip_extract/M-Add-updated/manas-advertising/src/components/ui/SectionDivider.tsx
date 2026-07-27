"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="w-full flex justify-center bg-transparent py-4 relative z-20 -mt-16 mb-8 pointer-events-none">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: 80, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-[1px] bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent"
      />
    </div>
  );
}
