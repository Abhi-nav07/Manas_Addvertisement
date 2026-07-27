"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ParallaxLayer } from "@/motion/parallax";
import { AmbientParticles } from "@/motion/particles";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent pt-20">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-primary)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[#050D1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(var(--color-accent-rgb),0.10),transparent)]" />
      </div>

      {/* Premium Oversized Brand Watermark */}
      <ParallaxLayer speed={0.8} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, x: 100 }}
          animate={{ opacity: 0.03, x: 0 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="absolute right-0 top-1/2 h-[50vh] w-[200vw] md:h-[90vh] md:w-[100vw] -translate-y-1/2 translate-x-[30%] md:translate-x-[25%]"
        >
          <Image 
            src="https://file.garden/amYCKVkR9Rqi4_W9/Logo" 
            alt="MANAS Watermark" 
            fill 
            className="object-contain mix-blend-screen"
            priority
            sizes="100vw"
          />
        </motion.div>
      </ParallaxLayer>

      <ParallaxLayer speed={1.2} className="absolute inset-0">
        <AmbientParticles count={30} />
      </ParallaxLayer>

      <Container className="relative z-10 pointer-events-none">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          className="max-w-3xl pointer-events-auto"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, filter: "blur(10px)" },
              show: { opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-white/70"
          >
            Advertising & Branding Studio · India
          </motion.span>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }
            }}
            className="font-display text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[1.05] text-white"
          >
            Ideas that make
            <br />
            brands <span className="text-[var(--color-accent)] drop-shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]">unforgettable.</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
            }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
          >
            Manas Advertising crafts bold brand identities and campaigns for
            businesses that refuse to blend in — strategy, design, and
            storytelling under one roof.
          </motion.p>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
            }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/portfolio">
              <Button variant="primary" className="group shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)]">
                View Our Work
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Start a Project</Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="mt-20 flex flex-wrap gap-x-14 gap-y-6 border-t border-white/10 pt-8 text-white/50 pointer-events-auto"
        >
          {[
            ["120+", "Brands Launched"],
            ["12", "Years of Craft"],
            ["40+", "Industry Awards"],
          ].map(([stat, label]) => (
            <div key={label} className="group cursor-default">
              <div className="text-2xl font-semibold text-white transition-all duration-300 group-hover:text-[var(--color-accent)] group-hover:scale-105 group-hover:-translate-y-1">{stat}</div>
              <div className="text-xs uppercase tracking-wide opacity-70 group-hover:opacity-100 transition-opacity duration-300">{label}</div>
            </div>
          ))}
        </motion.div>
      </Container>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
