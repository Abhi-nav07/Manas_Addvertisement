"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg border border-white/10 transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
