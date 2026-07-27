import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { trustStats } from "@/constants/content";

export function TrustSection() {
  return (
    <section className="border-b border-black/5 bg-white py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {trustStats.map((s, i) => {
            // Extract number from stat string (e.g. "120+" -> 120, "12" -> 12, "40+" -> 40)
            const num = parseInt(s.stat.replace(/\D/g, ''));
            const suffix = s.stat.replace(/[0-9]/g, '');
            
            return (
              <Reveal key={s.label} delay={i * 0.08} className="text-center group">
                <div className="font-display text-4xl font-semibold text-[var(--color-primary)] md:text-5xl transition-transform duration-500 group-hover:scale-110">
                  <AnimatedCounter value={num} duration={2} />{suffix}
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-neutral-500 font-medium">
                  {s.label}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
