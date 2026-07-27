import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clientLogos } from "@/constants/content";

export function ClientLogos() {
  return (
    <section className="border-y border-black/5 bg-white py-14">
      <Container>
        <Reveal className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
          Trusted by ambitious brands
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clientLogos.map((name, i) => (
            <Reveal
              key={name}
              delay={i * 0.05}
              className="font-display text-lg font-semibold text-neutral-300 transition-colors hover:text-[var(--color-primary)]"
            >
              {name}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
