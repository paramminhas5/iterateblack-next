import type { Metadata } from "next";
import { createServerClient } from "@/integrations/supabase/server";
import { IndustryDetail } from "./IndustryDetail";
import { BreadcrumbSchema } from "@/components/site/BreadcrumbSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("industries")
      .select("name,tagline,summary")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (data) {
      const title = `${data.name} — ${data.tagline} | Iterate`;
      const desc =
        data.summary ??
        `How Iterate builds compounding AI infrastructure for the ${data.name} sector.`;
      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          url: `https://greattasteiterate.com/industries/${slug}`,
        },
        alternates: { canonical: `https://greattasteiterate.com/industries/${slug}` },
      };
    }
  } catch {
    // fallback
  }
  return {
    title: "Industry — Iterate",
    alternates: { canonical: `https://greattasteiterate.com/industries/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: industry } = await supabase
    .from("industries")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  const { data: allIndustries } = await supabase
    .from("industries")
    .select("slug,name,diagram_key,sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const relatedSlugs = ((industry as any)?.related_case_slugs ?? []) as string[];

  let relatedCases: any[] = [];
  if (relatedSlugs.length > 0) {
    const { data } = await supabase
      .from("case_studies")
      .select("slug,title,client,year,tags,summary,diagram_key")
      .in("slug", relatedSlugs)
      .eq("published", true);
    relatedCases = data ?? [];
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://greattasteiterate.com" },
          { name: "Industries", url: "https://greattasteiterate.com/industries" },
          { name: industry?.name ?? slug, url: `https://greattasteiterate.com/industries/${slug}` },
        ]}
      />
      <IndustryDetail
        slug={slug}
        initialData={industry}
        allIndustries={allIndustries ?? []}
        relatedCases={relatedCases}
      />
    </>
  );
}
