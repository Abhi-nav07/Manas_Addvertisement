import { Container } from "./Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-transparent pb-20 pt-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--color-accent)]/15 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>
      <Container className="relative z-10">
        <Reveal className="max-w-2xl">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
            {eyebrow}
          </span>
          <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.1] text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
