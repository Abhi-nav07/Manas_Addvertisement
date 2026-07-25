import type {
  Service,
  PortfolioItem,
  Testimonial,
  FAQItem,
  ProcessStep,
  WhyChooseUsItem,
  TrustStat,
} from "@/types/content";

export type { Service, PortfolioItem, Testimonial, FAQItem, ProcessStep, WhyChooseUsItem, TrustStat };


export const services: Service[] = [
  {
    slug: "brand-identity",
    title: "Brand Identity",
    summary: "Logos, visual systems, and brand guidelines that stick.",
    description:
      "We build complete brand identity systems — logo, color, typography, and voice — designed to work consistently across every touchpoint, from packaging to digital.",
    icon: "Sparkles",
    deliverables: ["Logo & Wordmark", "Brand Guidelines", "Color & Type System", "Stationery & Collateral"],
  },
  {
    slug: "digital-campaigns",
    title: "Digital Campaigns",
    summary: "Performance-driven campaigns across social and search.",
    description:
      "Full-funnel digital campaigns combining creative, targeting, and analytics to drive measurable growth across paid social, search, and display.",
    icon: "Megaphone",
    deliverables: ["Campaign Strategy", "Creative Assets", "Media Planning", "Performance Reporting"],
  },
  {
    slug: "web-experience",
    title: "Web Experience",
    summary: "Fast, beautiful websites built to convert.",
    description:
      "Custom-designed, high-performance websites and landing pages engineered for speed, accessibility, and conversion.",
    icon: "MonitorSmartphone",
    deliverables: ["UX/UI Design", "Frontend Development", "SEO Foundation", "Analytics Setup"],
  },
  {
    slug: "content-production",
    title: "Content Production",
    summary: "Photography, video, and copy that tells your story.",
    description:
      "In-house content production covering photography, video, and copywriting — everything needed to fuel campaigns across every channel.",
    icon: "Camera",
    deliverables: ["Photography", "Video Production", "Copywriting", "Social Content Kits"],
  },
  {
    slug: "packaging-design",
    title: "Packaging Design",
    summary: "Shelf-ready packaging that stands out.",
    description:
      "Packaging design that balances shelf standout with brand consistency and production practicality across retail and D2C formats.",
    icon: "Package",
    deliverables: ["Structural Concepts", "Print-Ready Artwork", "Retail Compliance", "Mockups"],
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy",
    summary: "Positioning and messaging grounded in research.",
    description:
      "Research-backed brand strategy — positioning, messaging architecture, and audience insight — that gives every creative decision a clear foundation.",
    icon: "Compass",
    deliverables: ["Market Research", "Positioning", "Messaging Framework", "Brand Architecture"],
  },
];


export const portfolio: PortfolioItem[] = [
  {
    slug: "saffron-spice-co",
    title: "Saffron Spice Co. Rebrand",
    client: "Saffron Spice Co.",
    category: "Brand Identity",
    year: "2025",
    summary: "A full rebrand for a heritage spice brand entering modern retail.",
    challenge: "Outdated visual identity failed to compete on modern retail shelves.",
    solution: "Modernized logo, warm premium color palette, and consistent packaging system.",
    result: "34% increase in shelf pickup rate within 3 months of relaunch.",
    beforeLabel: "Legacy packaging design",
    afterLabel: "Relaunched premium packaging",
  },
  {
    slug: "urbanhive-coworking",
    title: "UrbanHive Coworking Launch",
    client: "UrbanHive",
    category: "Digital Campaigns",
    year: "2025",
    summary: "Launch campaign for a new coworking chain across 3 cities.",
    challenge: "Zero brand awareness ahead of a multi-city launch.",
    solution: "Integrated paid social + search campaign with localized creative per city.",
    result: "112% of pre-launch membership target reached before opening day.",
  },
  {
    slug: "veloce-fitness",
    title: "Veloce Fitness App & Web",
    client: "Veloce",
    category: "Web Experience",
    year: "2024",
    summary: "Marketing site and booking experience for a boutique fitness studio.",
    challenge: "Slow legacy site with poor mobile conversion.",
    solution: "Rebuilt on a fast, accessible stack with streamlined booking flow.",
    result: "2.4x increase in online class bookings post-launch.",
  },
  {
    slug: "namaste-organics",
    title: "Namaste Organics Content Series",
    client: "Namaste Organics",
    category: "Content Production",
    year: "2024",
    summary: "Photography and video series for an organic foods D2C brand.",
    challenge: "Inconsistent visual content across channels hurt brand trust.",
    solution: "Produced a cohesive photography and video content library.",
    result: "48% increase in social engagement rate.",
  },
  {
    slug: "chai-culture",
    title: "Chai Culture Packaging",
    client: "Chai Culture",
    category: "Packaging Design",
    year: "2023",
    summary: "Retail packaging system for a specialty tea brand.",
    challenge: "Needed shelf standout across 12 SKUs without losing brand cohesion.",
    solution: "Modular packaging system with SKU-specific color coding.",
    result: "Expanded into 200+ new retail locations within 6 months.",
    beforeLabel: "Initial concept",
    afterLabel: "Final retail packaging",
  },
  {
    slug: "meridian-finance",
    title: "Meridian Finance Positioning",
    client: "Meridian",
    category: "Brand Strategy",
    year: "2023",
    summary: "Repositioning strategy for a fintech entering a crowded market.",
    challenge: "Messaging was generic and indistinguishable from competitors.",
    solution: "Developed sharp positioning and messaging architecture from research.",
    result: "Featured in 3 major industry publications post-relaunch.",
  },
];

export const clientLogos = [
  "Saffron Spice Co.",
  "UrbanHive",
  "Veloce",
  "Namaste Organics",
  "Chai Culture",
  "Meridian",
];


export const testimonials: Testimonial[] = [
  {
    name: "Ritika Malhotra",
    role: "Founder",
    company: "Saffron Spice Co.",
    quote:
      "Manas didn't just redesign our packaging — they understood exactly what our brand needed to compete on modern shelves.",
  },
  {
    name: "Arjun Sethi",
    role: "CEO",
    company: "UrbanHive",
    quote:
      "The launch campaign exceeded every target we set. Their team moved fast without ever cutting corners on quality.",
  },
  {
    name: "Priya Nambiar",
    role: "Marketing Head",
    company: "Veloce Fitness",
    quote:
      "Our new site finally reflects the quality of our studios. Booking conversions jumped almost immediately.",
  },
  {
    name: "Karan Bhatt",
    role: "Co-founder",
    company: "Namaste Organics",
    quote:
      "Working with Manas felt like having an in-house creative team that genuinely cared about our story.",
  },
];


export const faqs: FAQItem[] = [
  {
    question: "What industries do you typically work with?",
    answer:
      "We work across FMCG, food & beverage, fitness, fintech, and D2C brands, but our process adapts to any category that needs strong brand and creative work.",
  },
  {
    question: "How long does a typical branding project take?",
    answer:
      "A full brand identity project usually takes 6–10 weeks depending on scope, from discovery through final asset delivery.",
  },
  {
    question: "Do you work with startups or only established brands?",
    answer:
      "Both. We have dedicated engagement models for early-stage startups as well as established brands undergoing a refresh.",
  },
  {
    question: "Can you handle both strategy and execution?",
    answer:
      "Yes — our team covers strategy, design, content production, and campaign execution under one roof, so nothing gets lost in translation.",
  },
  {
    question: "What does the project process look like?",
    answer:
      "We follow a five-stage process: Discovery, Strategy, Design, Production, and Launch — with structured check-ins at every stage.",
  },
  {
    question: "Do you offer ongoing retainer support after launch?",
    answer:
      "Yes, many clients move into a monthly retainer for ongoing campaign management, content production, or design support after the initial project.",
  },
];


export const process: ProcessStep[] = [
  { title: "Discovery", description: "We dig into your business, audience, and competitive landscape." },
  { title: "Strategy", description: "We define positioning, messaging, and a clear creative direction." },
  { title: "Design", description: "Concepts come to life across identity, digital, and campaign assets." },
  { title: "Production", description: "We produce final assets — from packaging to full campaigns." },
  { title: "Launch", description: "We support rollout and measure results against clear success metrics." },
];

export const trustStats = [
  { stat: "120+", label: "Brands Launched" },
  { stat: "12", label: "Years of Craft" },
  { stat: "40+", label: "Industry Awards" },
  { stat: "98%", label: "Client Retention" },
];

export const whyChooseUs = [
  {
    title: "Strategy-First Approach",
    description: "Every creative decision is grounded in research and clear positioning, not guesswork.",
    icon: "Compass",
  },
  {
    title: "In-House Full Team",
    description: "Strategy, design, content, and campaign execution under one roof — no hand-offs lost in translation.",
    icon: "Users",
  },
  {
    title: "Proven Track Record",
    description: "120+ brands launched across FMCG, fintech, fitness, and D2C categories.",
    icon: "TrendingUp",
  },
  {
    title: "Transparent Process",
    description: "Clear milestones, timelines, and reporting at every stage of the engagement.",
    icon: "ShieldCheck",
  },
];
