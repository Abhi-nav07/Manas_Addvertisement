import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/constants/content";

export function ProcessTimeline() {
  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title="A clear, structured path from idea to launch"
          align="center"
          className="mb-16"
        />

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-black/10 md:block" />
          {process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className="relative">
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-display text-base font-semibold text-white md:mb-5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
