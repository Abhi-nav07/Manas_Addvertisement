"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ParallaxLayer } from "@/motion/parallax";
import { portfolio, portfolioImages } from "@/constants/content";
import { CinematicEase } from "@/motion/presets";

export function FeaturedPortfolio() {
  const featured = portfolio.slice(0, 3);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".portfolio-card");
      
      // Initial states
      gsap.set(headerRef.current, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.98 });

      // The Proof Scene Orchestration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: CinematicEase } });
          
          tl.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2
          })
          .to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            stagger: 0.15
          }, "-=0.8");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="work" ref={sectionRef} className="bg-neutral-50 py-24 relative overflow-hidden">
      <Container className="relative z-10">
        <div 
          ref={headerRef} 
          className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        >
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects we're proud to have shipped"
            description="A snapshot of recent brand identity, campaign, and web projects."
          />
          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
          >
            View full portfolio
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((item) => {
            const imageUrl = portfolioImages[item.slug] || "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&q=80";
            
            return (
              <div key={item.slug} className="portfolio-card" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
                <Link href={`/portfolio/${item.slug}`} className="group block" data-cursor="hover">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--color-primary)] transition-transform duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20">
                    
                    {/* Background Image with Zoom and Parallax */}
                    <div className="absolute -inset-[15%] pointer-events-none">
                      <ParallaxLayer speed={0.1} className="h-full w-full">
                        <Image 
                          src={imageUrl} 
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </ParallaxLayer>
                    </div>
                    
                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100 pointer-events-none" />
                    
                    {/* Content Reveal */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:translate-y-4 transition-transform duration-500 ease-out md:group-hover:translate-y-0">
                      <div className="overflow-hidden mb-4">
                        <Badge className="w-fit bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg md:translate-y-full transition-transform duration-500 ease-out md:group-hover:translate-y-0 delay-75">
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="overflow-hidden">
                        <h3 className="font-display text-2xl font-semibold text-white md:translate-y-full transition-transform duration-500 ease-out md:group-hover:translate-y-0 delay-100">
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="overflow-hidden mt-2">
                        <p className="text-sm text-white/70 md:translate-y-full transition-transform duration-500 ease-out md:group-hover:translate-y-0 delay-150">
                          {item.client} · {item.year}
                        </p>
                      </div>
                    </div>
                    
                    {/* Animated CTA Arrow */}
                    <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 md:-translate-y-4 md:translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 delay-75 max-md:hidden">
                      <ArrowUpRight size={20} className="transition-transform group-hover:scale-110" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
