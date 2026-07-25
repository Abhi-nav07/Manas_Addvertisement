import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { portfolio } from "@/constants/content";

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = portfolio.find((p) => p.slug === params.slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = portfolio.find((p) => p.slug === params.slug);
  if (!item) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero eyebrow={item.category} title={item.title} description={item.summary} />

        <section className="bg-white py-20">
          <Container className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.2fr]">
            <Reveal className="space-y-6">
              <div className="rounded-2xl border border-black/5 bg-neutral-50 p-6">
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Client</dt>
                    <dd className="font-medium text-[var(--color-primary)]">{item.client}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Category</dt>
                    <dd>
                      <Badge>{item.category}</Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-500">Year</dt>
                    <dd className="font-medium text-[var(--color-primary)]">{item.year}</dd>
                  </div>
                </dl>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
              >
                <ArrowLeft size={16} />
                Back to portfolio
              </Link>
            </Reveal>

            <Reveal className="space-y-8">
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                  The Challenge
                </h2>
                <p className="mt-2 leading-relaxed text-neutral-500">{item.challenge}</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                  The Solution
                </h2>
                <p className="mt-2 leading-relaxed text-neutral-500">{item.solution}</p>
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                  The Result
                </h2>
                <p className="mt-2 leading-relaxed text-neutral-500">{item.result}</p>
              </div>
            </Reveal>
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
