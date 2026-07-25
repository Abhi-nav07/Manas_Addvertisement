"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {



  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)", scale: 1.02 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(4px)", scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  );
}
