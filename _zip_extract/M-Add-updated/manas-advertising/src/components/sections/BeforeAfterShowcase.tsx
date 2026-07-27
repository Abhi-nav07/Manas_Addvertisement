"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { portfolio, portfolioImages } from "@/constants/content";

export function BeforeAfterShowcase() {
  const items = portfolio.filter((p) => p.beforeLabel && p.afterLabel);
  const [active, setActive] = useState(0);
  const [slider, setSlider] = useState(50);
  const item = items[active];

  if (!item) return null;

  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="Transformation"
          title="See the impact, side by side"
          description="Drag the slider to compare the before and after of select rebrand projects."
          align="center"
          className="mb-14"
        />

        <Reveal className="mx-auto max-w-3xl">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[var(--color-primary)] select-none">
            {/* After (base layer) */}
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-primary)] text-white/80">
              <Image src={portfolioImages[item.slug] || "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=1600&q=80"} alt="After" fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/40 to-[#132644]/40" />
              <span className="relative z-10 text-sm font-medium uppercase tracking-wide">
                {item.afterLabel}
              </span>
            </div>
            {/* Before (clipped overlay) */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden bg-neutral-900 text-white/70"
              style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
            >
              <Image src={portfolioImages[item.slug] || "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=1600&q=80"} alt="Before" fill className="object-cover grayscale sepia-[.3] opacity-60" sizes="100vw" />
              <div className="absolute inset-0 bg-black/40" />
              <span className="relative z-10 text-sm font-medium uppercase tracking-wide">
                {item.beforeLabel}
              </span>
            </div>
            {/* Handle Line & Handle Button */}
            <div
              className="absolute inset-y-0 w-0.5 bg-white/80 pointer-events-none"
              style={{ left: `${slider}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-xl transition-transform group-hover:scale-110 border border-black/5">
                <span className="text-xs font-bold">↔</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              aria-label="Drag to compare before and after"
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 z-10"
            />
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {items.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => {
                  setActive(i);
                  setSlider(50);
                }}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  active === i
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : "border-black/10 text-neutral-500 hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)]"
                }`}
              >
                {p.client}
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
