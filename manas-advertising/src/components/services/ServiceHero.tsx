import { Service } from "@/types/content";
import { BrandIdentityHero } from "./heroes/BrandIdentityHero";
import { DigitalCampaignsHero } from "./heroes/DigitalCampaignsHero";
import { WebExperienceHero } from "./heroes/WebExperienceHero";
import { ContentProductionHero } from "./heroes/ContentProductionHero";
import { PackagingDesignHero } from "./heroes/PackagingDesignHero";
import { BrandStrategyHero } from "./heroes/BrandStrategyHero";
import { Container } from "@/components/layout/Container";
import { ParallaxLayer } from "@/motion/parallax";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceHero({ service }: { service: Service }) {
  const renderBespokeVisual = () => {
    switch (service.slug) {
      case "brand-identity":
        return <BrandIdentityHero />;
      case "digital-campaigns":
        return <DigitalCampaignsHero />;
      case "web-experience":
        return <WebExperienceHero />;
      case "content-production":
        return <ContentProductionHero />;
      case "packaging-design":
        return <PackagingDesignHero />;
      case "brand-strategy":
        return <BrandStrategyHero />;
      default:
        return null;
    }
  };

  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden bg-transparent pt-32 pb-20">
      <Container className="relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left: Text Content */}
        <Reveal className="max-w-2xl" delay={0.2}>
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Service
          </span>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.1] text-white">
            {service.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {service.summary}
          </p>
        </Reveal>

        {/* Right: Bespoke Motion Graphic */}
        <ParallaxLayer speed={0.05} className="relative h-full min-h-[400px] w-full">
          {renderBespokeVisual()}
        </ParallaxLayer>
      </Container>
      
      {/* Subtle fade to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
