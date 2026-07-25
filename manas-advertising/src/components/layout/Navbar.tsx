"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { MagneticHover } from "@/components/ui/MagneticHover";
import { cn } from "@/lib/cn";
import { useScrollDirection } from "@/motion/hooks";

const links = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { direction, isAtTop } = useScrollDirection();
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        !isAtTop
          ? "bg-[var(--color-primary)]/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.15)] py-0"
          : "bg-transparent py-2",
        direction === "down" && !isAtTop ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center text-lg font-semibold tracking-wide text-white">
          MANAS<span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-125">.</span>
        </Link>

        <nav className="hidden gap-9 md:flex">
          {links.map((l) => {
            const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <MagneticHover key={l.href} strength={10}>
                <Link
                  href={l.href}
                  data-cursor="pointer"
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-white py-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-primary)] rounded-sm",
                    isActive ? "text-white font-semibold" : "text-white/70"
                  )}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[var(--color-accent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </MagneticHover>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact">
            <Button variant="primary" className="!py-2.5 !px-6 text-xs">
              Start a Project
            </Button>
          </Link>
        </div>

        <button
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-primary)] rounded-sm"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[var(--color-primary)] md:hidden"
          >
            <Container className="flex flex-col gap-5 py-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-white/85"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full">Start a Project</Button>
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
