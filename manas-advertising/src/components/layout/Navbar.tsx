"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <Link href="/" className="group flex items-center">
          <div className="relative h-10 w-32 md:h-12 md:w-36 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105">
            <Image 
              src="https://file.garden/amYCKVkR9Rqi4_W9/Logo" 
              alt="Manas Advertising Logo" 
              fill 
              className="object-contain"
              sizes="(max-width: 768px) 128px, 144px"
              priority
            />
          </div>
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
          className="-mr-2.5 flex h-11 w-11 items-center justify-center text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-primary)] rounded-full"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
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
            className="overflow-hidden border-t border-white/10 bg-[var(--color-primary)] md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {links.map((l, i) => {
                const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between border-b border-white/5 py-3.5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] rounded-sm",
                        isActive ? "text-white" : "text-white/70 hover:text-white"
                      )}
                    >
                      {l.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + links.length * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="pt-5"
              >
                <Link href="/contact" onClick={() => setOpen(false)}>
                  <Button className="w-full">Start a Project</Button>
                </Link>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
