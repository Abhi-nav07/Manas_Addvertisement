"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ParallaxLayer } from "@/motion/parallax";
import { AmbientParticles } from "@/motion/particles";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-transparent pt-20">
      
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
    </section>
  );
}
