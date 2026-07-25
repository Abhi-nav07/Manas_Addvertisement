import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manas Advertising to discuss your next branding or campaign project.",
};

const details = [
  { icon: MapPin, label: "Bandra West, Mumbai, India" },
  { icon: Phone, label: "+91 22 1234 5678" },
  { icon: Mail, label: "hello@manasadvertising.in" },
  { icon: Clock, label: "Mon–Fri, 9:30am – 6:30pm IST" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Contact"
          title="Let's start a conversation"
          description="Tell us about your project and our team will follow up within one business day."
        />

        <section className="bg-white py-20">
          <Container className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.3fr]">
            <Reveal className="space-y-6">
              <h2 className="font-display text-xl font-semibold text-[var(--color-primary)]">
                Reach us directly
              </h2>
              <ul className="space-y-4">
                {details.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-50 text-[var(--color-primary)]">
                      <Icon size={16} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="overflow-hidden rounded-2xl border border-black/5">
                <div className="relative flex aspect-video items-center justify-center bg-[var(--color-primary)] text-white overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--color-accent)]/10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-20 blur-2xl" />
                  <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px]" />
                  <MapPin size={48} className="relative z-10 text-[var(--color-accent)] animate-bounce" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <ContactForm />
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
