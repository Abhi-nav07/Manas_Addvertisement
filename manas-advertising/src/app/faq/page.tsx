import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { faqs } from "@/constants/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about working with Manas Advertising.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know before starting a project with us."
        />

        <section className="bg-white py-20">
          <Container className="max-w-3xl">
            <Accordion items={faqs} />
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
