import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://manasadvertising.in";
  
  const routes = ["", "/about", "/services", "/portfolio", "/contact", "/careers", "/faq", "/gallery", "/testimonials"];
  
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
