"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { easing } from "./easing";
import { durations } from "./durations";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeReveal({ children, className, delay = 0, duration = durations.medium }: RevealProps) {

  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05, margin: "50px 0px 50px 0px" }}
      transition={{ duration, delay, ease: easing.easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function SlideReveal({ children, className, delay = 0, duration = durations.medium }: RevealProps) {


  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "50px 0px 50px 0px" }}
      transition={{ duration, delay, ease: easing.easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({ children, className, delay = 0, duration = durations.medium }: RevealProps) {


  return (
    <div className={`overflow-hidden ${className || ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.05, margin: "50px 0px 50px 0px" }}
        transition={{ duration, delay, ease: easing.luxury }}
      >
        {children}
      </motion.div>
    </div>
  );
}
