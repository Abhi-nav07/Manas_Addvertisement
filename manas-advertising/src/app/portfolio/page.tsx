"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { portfolio } from "@/constants/content";
import { cn } from "@/lib/cn";

const categories = ["All", ...Array.from(new Set(portfolio.map((p) => p.category)))];

export default function PortfolioPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? portfolio : portfolio.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Portfolio"
          title="Work that speaks for itself"
          description="A selection of brand identity, campaign, and digital projects delivered for clients across India."
        />

        <section className="bg-white py-20">
          <Container>
            <div className="mb-12 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
                    active === cat
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-black/10 text-neutral-500 hover:border-[var(--color-primary)]/40"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filtered.map((item, i) => (
                <Reveal key={item.slug} delay={i * 0.05}>
                  <Link href={`/portfolio/${item.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-primary)]">
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <Badge className="mb-3 w-fit bg-white/10 text-white backdrop-blur-sm">
                          {item.category}
                        </Badge>
                        <h2 className="font-display text-xl font-semibold text-white">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-sm text-white/60">
                          {item.client} · {item.year}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="absolute right-5 top-5 text-white/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
