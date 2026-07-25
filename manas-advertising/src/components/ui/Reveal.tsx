"use client";

import { ReactNode } from "react";
import { SlideReveal } from "@/motion/reveal";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <SlideReveal className={className} delay={delay}>
      {children}
    </SlideReveal>
  );
}
