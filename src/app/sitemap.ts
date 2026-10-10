import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
