import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/constants/content";

export function FAQPreview() {
  return (
    <section className="bg-white py-24">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions, answered"
          align="center"
          className="mb-12"
        />
        <Accordion items={faqs.slice(0, 4)} />
        <Reveal className="mt-8 text-center">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)]"
          >
            View all FAQs
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
