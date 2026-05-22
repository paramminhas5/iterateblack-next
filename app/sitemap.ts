import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://greattasteiterate.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    // Known case study slugs (extend as Supabase grows)
    { url: `${base}/work/chargezone`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work/pickyourtrail`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work/monkspaces`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work/billione-emap`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work/rajasthan-tourism`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work/coliwoo`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/work/noida-international-airport`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    // Industry pages
    { url: `${base}/industries/energy`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/industries/travel`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/industries/hospitality`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/industries/aviation`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/industries/healthcare`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/industries/real-estate`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
  ];

  return staticRoutes;
}
