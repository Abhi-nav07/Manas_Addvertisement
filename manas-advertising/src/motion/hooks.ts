"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > previous && latest > 150) {
      setDirection("down");
    } else if (latest < previous) {
      setDirection("up");
    }
    
    setIsAtTop(latest <= 50);
  });

  return { direction, isAtTop };
}
