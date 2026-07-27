export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  deliverables: string[];
};

export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type TrustStat = {
  stat: string;
  label: string;
};

export type WhyChooseUsItem = {
  title: string;
  description: string;
  icon: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
};
