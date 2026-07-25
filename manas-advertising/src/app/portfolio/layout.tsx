import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Manas Advertising's portfolio of brand identity, campaign, and digital projects.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
