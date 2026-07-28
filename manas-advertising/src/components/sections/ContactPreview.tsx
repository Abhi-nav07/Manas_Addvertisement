"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CinematicEase } from "@/motion/presets";

const details = [
  { icon: MapPin, label: "1st Floor Nanaksar Kota Stone, In Front Of ICICI Bank, AB Road, Dewas Naka, Indore (M.P.)" },
  { icon: Phone, label: "+91 98272 06185", href: "tel:+919827206185" },
  { icon: Phone, label: "+91 74705 62475", href: "tel:+917470562475" },
  { icon: Mail, label: "enquiry@manasadvertising.in", href: "mailto:enquiry@manasadvertising.in" },
];

export function ContactPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const listItems = gsap.utils.toArray(".contact-item");
      const cta = document.querySelector(".contact-cta");

      gsap.set(headerRef.current, { opacity: 0, y: 40 });
      gsap.set(listItems, { opacity: 0, x: -20 });
      gsap.set(cta, { opacity: 0, y: 20 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });

      // The Conversion Scene Orchestration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: CinematicEase } });

          tl.to(glowRef.current, {
            opacity: 0.2,
            scale: 1,
            duration: 2,
            ease: "power2.out"
          })
          .to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2
          }, "-=1.5")
          .to(listItems, {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.1
          }, "-=0.8")
          .to(cta, {
            opacity: 1,
            y: 0,
            duration: 1
          }, "-=0.6");
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section id="contact" ref={sectionRef} className="bg-neutral-50 py-24 relative overflow-hidden">
      
      {/* Soft Glow Pulse (Ambient Conversion Lighting) */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vh] h-[60vh] bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] mix-blend-multiply blur-[40px] pointer-events-none"
        style={reduceMotion ? { opacity: 0.2 } : {}}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center">
          
          <div ref={headerRef} style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let's build something unforgettable together"
              description="Share a few details about your project and our team will follow up within one business day."
            />
          </div>

          <div ref={detailsRef} className="space-y-6">
            <ul className="space-y-4">
              {details.map(({ icon: Icon, label, href }, i) => (
                <li key={i} className="contact-item flex items-center gap-3 text-sm text-neutral-500" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
                  <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm">
                    <Icon size={16} />
                  </span>
                  {href ? (
                    <a href={href} className="hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="contact-cta" style={reduceMotion ? { opacity: 1 } : { opacity: 0 }}>
              <Link href="/contact">
                <Button variant="secondary" className="group shadow-lg hover:shadow-xl transition-shadow duration-300">
                  Go to Contact Page
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
