"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { portfolio } from "@/constants/content";

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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[#132644] text-white/80">
              <span className="text-sm font-medium uppercase tracking-wide">
                {item.afterLabel}
              </span>
            </div>
            {/* Before (clipped overlay) */}
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-900 text-white/70"
              style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}
            >
              <span className="text-sm font-medium uppercase tracking-wide">
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
