"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export function LivingCursor() {
  const reduceMotion = useReducedMotion();
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.8 });
  const cursorY = useSpring(-100, { stiffness: 150, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we are hovering a clickable element
      const isClickable = target.closest("a, button, input, textarea, [data-cursor='pointer']");
      setIsPointer(!!isClickable);

      // Check for specific text to display in the cursor (e.g. "View")
      const cursorData = target.closest("[data-cursor-text]");
      if (cursorData) {
        setCursorText(cursorData.getAttribute("data-cursor-text") || "");
      } else {
        setCursorText("");
      }
    };

    const handleMouseOut = () => {
      setIsPointer(false);
      setCursorText("");
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible, reduceMotion]);



  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:flex items-center justify-center rounded-full bg-white mix-blend-difference will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: cursorText ? 64 : isPointer ? 32 : 12,
        height: cursorText ? 64 : isPointer ? 32 : 12,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <motion.span 
        className="text-[10px] font-semibold tracking-wider text-black mix-blend-difference"
        animate={{ opacity: cursorText ? 1 : 0, scale: cursorText ? 1 : 0.5 }}
      >
        {cursorText}
      </motion.span>
    </motion.div>
  );
}
