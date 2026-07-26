import Link from "next/link";
import Image from "next/image";

import { Camera, Briefcase, MessageCircle, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { Reveal } from "../ui/Reveal";
import { MagneticHover } from "../ui/MagneticHover";
import dynamic from "next/dynamic";
const AmbientParticles = dynamic(() => import("@/motion/particles").then(mod => mod.AmbientParticles), { ssr: false });

const columns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Work / Portfolio", href: "/portfolio" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-primary)]/80 pt-32 text-white backdrop-blur-md">
      
      {/* Footer Closing Scene Environment */}
      <div className="absolute inset-0 z-0 opacity-40">
        <AmbientParticles count={20} />
      </div>
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/10 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Premium CTA Reveal */}
        <Reveal delay={0}>
          <div className="mb-24 text-center">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-tight tracking-tight text-white">
              Let&apos;s build something <br/>
              <span className="text-[var(--color-accent)] italic">extraordinary.</span>
            </h2>
            <div className="mt-10 flex justify-center">
              <MagneticHover strength={15}>
                <Link
                  href="/contact"
                  className="group flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-2xl transition-transform hover:scale-110 hover:bg-[var(--color-accent)] hover:text-white"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider">Start</span>
                  <ArrowUpRight size={24} className="mt-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </MagneticHover>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] border-t border-white/5 pt-16">
          <Reveal delay={0.1}>
            <div>
              <MagneticHover strength={5} className="block w-max">
                <Link href="/" className="group flex items-center">
                  <div className="relative h-12 w-36 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105">
                    <Image 
                      src="https://file.garden/amYCKVkR9Rqi4_W9/Logo" 
                      alt="Manas Advertising Logo" 
                      fill 
                      className="object-contain"
                      sizes="(max-width: 768px) 144px, 144px"
                    />
                  </div>
                </Link>
              </MagneticHover>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                A premium advertising and branding studio crafting bold identities
                and campaigns for brands that refuse to blend in.
              </p>
              <div className="mt-6 flex gap-4">
                {[
                  { Icon: Camera, label: "Visit our Instagram" },
                  { Icon: Briefcase, label: "Visit our LinkedIn" },
                  { Icon: MessageCircle, label: "Visit our Twitter" }
                ].map(({ Icon, label }, i) => (
                  <MagneticHover key={i} strength={8}>
                    <a
                      href="#"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
                    >
                      <Icon size={18} />
                    </a>
                  </MagneticHover>
                ))}
              </div>
            </div>
          </Reveal>

          {columns.map((col, idx) => (
            <Reveal key={col.title} delay={0.1 * (idx + 2)}>
              <nav aria-label={`${col.title} links`}>
                <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        data-cursor="pointer"
                        className="group inline-flex items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] rounded-sm"
                      >
                        <span className="relative overflow-hidden pb-1">
                          {l.label}
                          <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}

          <Reveal delay={0.4}>
            <div>
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">
                Contact
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3 group cursor-default">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[var(--color-accent)]/20">
                    <MapPin size={14} className="text-[var(--color-accent)]" />
                  </div>
                  <span className="transition-colors group-hover:text-white max-w-[200px]">1st Floor Nanaksar Kota Stone, In Front Of ICICI Bank, AB Road, Dewas Naka, Indore (M.P.)</span>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[var(--color-accent)]/20">
                    <Phone size={14} className="text-[var(--color-accent)]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <a href="tel:+919827206185" className="transition-colors group-hover:text-white" data-cursor="pointer">+91 98272 06185</a>
                    <a href="tel:+917470562475" className="transition-colors group-hover:text-white" data-cursor="pointer">+91 74705 62475</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[var(--color-accent)]/20">
                    <Mail size={14} className="text-[var(--color-accent)]" />
                  </div>
                  <a href="mailto:enquiry@manasadvertising.in" className="transition-colors group-hover:text-white break-all" data-cursor="pointer">
                    enquiry@manasadvertising.in
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-7 text-xs text-white/40 md:flex-row">
            <p>© {new Date().getFullYear()} Manas Advertising. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/faq" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm" data-cursor="pointer">Privacy Policy</Link>
              <Link href="/faq" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-sm" data-cursor="pointer">Terms of Service</Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
