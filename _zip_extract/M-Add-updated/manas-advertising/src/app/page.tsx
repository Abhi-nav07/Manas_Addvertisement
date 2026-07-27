import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import dynamic from "next/dynamic";

import { TrustSection } from "@/components/sections/TrustSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
const FeaturedPortfolio = dynamic(() => import("@/components/sections/FeaturedPortfolio").then(mod => mod.FeaturedPortfolio));
const BeforeAfterShowcase = dynamic(() => import("@/components/sections/BeforeAfterShowcase").then(mod => mod.BeforeAfterShowcase));
const ProcessTimeline = dynamic(() => import("@/components/sections/ProcessTimeline").then(mod => mod.ProcessTimeline));
const ClientLogos = dynamic(() => import("@/components/sections/ClientLogos").then(mod => mod.ClientLogos));
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(mod => mod.TestimonialsSection));
const CTASection = dynamic(() => import("@/components/sections/CTASection").then(mod => mod.CTASection));
const FAQPreview = dynamic(() => import("@/components/sections/FAQPreview").then(mod => mod.FAQPreview));
const ContactPreview = dynamic(() => import("@/components/sections/ContactPreview").then(mod => mod.ContactPreview));
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <TrustSection />
        <WhyChooseUs />
        <ServicesPreview />
        <FeaturedPortfolio />
        <BeforeAfterShowcase />
        <ProcessTimeline />
        <ClientLogos />
        <TestimonialsSection />
        <CTASection />
        <FAQPreview />
        <ContactPreview />
      </main>
      <Footer />
    </>
  );
}
