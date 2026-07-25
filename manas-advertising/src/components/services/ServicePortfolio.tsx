"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Service } from "@/types/content";
import { portfolio } from "@/constants/content";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/motion/parallax";

export function ServicePortfolio({ service }: { service: Service }) {
  // Filter portfolio by current service category
  const relatedWork = portfolio.filter((item) => item.category === service.title);

  if (relatedWork.length === 0) return null;

  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
              Featured Work
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-[var(--color-primary)]">
              {service.title} in action
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-accent)]"
          >
            View all cases
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 transition-colors group-hover:bg-[var(--color-accent)]/10">
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {relatedWork.map((project, idx) => (
            <Reveal key={project.slug} delay={idx * 0.1}>
              <Link href={`/portfolio/${project.slug}`} className="group block">
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
                  <ParallaxLayer speed={0.1} className="h-full w-full">
                    <Image
                      src={`https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop`}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </ParallaxLayer>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Hover content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span className="mb-2 inline-flex w-max rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-medium text-white">
                      View Case Study
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-accent)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-neutral-500">{project.client}</p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-neutral-400">
                    {project.year}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
