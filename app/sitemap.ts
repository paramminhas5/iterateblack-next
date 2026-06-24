import { MetadataRoute } from "next";
import { createServerClient } from "@/integrations/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://greattasteiterate.com";
  const supabase = createServerClient();

  // Fetch published case studies
  const { data: cases } = await supabase
    .from("case_studies")
    .select("slug,updated_at")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  // Fetch published industries
  const { data: industries } = await supabase
    .from("industries")
    .select("slug,updated_at")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = (cases ?? []).map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = (industries ?? []).map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: i.updated_at ? new Date(i.updated_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...caseRoutes, ...industryRoutes];
}
