import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Manas Advertising — open roles coming soon.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Careers"
          title="Join the studio"
          description="We're always on the lookout for curious, craft-obsessed people. Open roles will be listed here soon."
        />

        <section className="bg-white py-24">
          <Container className="max-w-xl text-center">
            <Reveal>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                <Mail size={26} />
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-[var(--color-primary)]">
                No open roles right now
              </h2>
              <p className="mt-3 text-neutral-500">
                We don&apos;t have any open positions at the moment, but we&apos;d love
                to hear from talented people anyway. Send us your portfolio and
                we&apos;ll reach out when something fits.
              </p>
              <a href="mailto:careers@manasadvertising.in" className="mt-8 inline-block">
                <Button variant="secondary">Email Your Portfolio</Button>
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
