import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const details = [
  { icon: MapPin, label: "1st Floor Nanaksar Kota Stone, In Front Of ICICI Bank, AB Road, Dewas Naka, Indore (M.P.)" },
  { icon: Phone, label: "+91 98272 06185", href: "tel:+919827206185" },
  { icon: Phone, label: "+91 74705 62475", href: "tel:+917470562475" },
  { icon: Mail, label: "enquiry@manasadvertising.in", href: "mailto:enquiry@manasadvertising.in" },
];

export function ContactPreview() {
  return (
    <section id="contact" className="bg-neutral-50 py-24">
      <Container>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's build something unforgettable together"
            description="Share a few details about your project and our team will follow up within one business day."
          />
          <Reveal className="space-y-6">
            <ul className="space-y-4">
              {details.map(({ icon: Icon, label, href }, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-neutral-500">
                  <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-primary)] shadow-sm">
                    <Icon size={16} />
                  </span>
                  {href ? (
                    <a href={href} className="hover:text-[var(--color-accent)] transition-colors" data-cursor="pointer">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <Button variant="secondary" className="group">
                Go to Contact Page
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
