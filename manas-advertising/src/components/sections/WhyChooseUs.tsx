import { Compass, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { whyChooseUs } from "@/constants/content";

const icons = { Compass, Users, TrendingUp, ShieldCheck };

export function WhyChooseUs() {
  return (
    <section className="bg-neutral-50 py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for brands that want to lead, not follow"
          description="A senior team, a proven process, and a genuine obsession with getting the details right."
          align="center"
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <Card className="h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/5 text-[var(--color-primary)]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--color-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
