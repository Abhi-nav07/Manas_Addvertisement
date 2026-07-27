"use client";

import { Service } from "@/types/content";
import { ServiceHero } from "./ServiceHero";
import { ServiceStory } from "./ServiceStory";
import { ServiceProcess } from "./ServiceProcess";
import { ServicePortfolio } from "./ServicePortfolio";
import { CTASection } from "@/components/sections/CTASection";

export function ServiceExperienceEngine({ service }: { service: Service }) {
  return (
    <div className="relative bg-white">
      <ServiceHero service={service} />
      <ServiceStory service={service} />
      <ServiceProcess service={service} />
      <ServicePortfolio service={service} />
      <CTASection />
    </div>
  );
}
