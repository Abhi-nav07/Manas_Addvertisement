"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function ImageReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {



  return (
    <motion.div
      className={className}
      initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  );
}
