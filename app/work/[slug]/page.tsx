import type { Metadata } from "next";
import { createServerClient } from "@/integrations/supabase/server";
import { WorkDetail } from "./WorkDetail";
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
      .from("case_studies")
      .select("title,client,summary,tags")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (data) {
      const title = `${data.client} — ${data.title} | Iterate`;
      const desc =
        data.summary ??
        `How Iterate built compounding marketing infrastructure for ${data.client}.`;
      return {
        title,
        description: desc,
        openGraph: {
          title,
          description: desc,
          url: `https://greattasteiterate.com/work/${slug}`,
          type: "article",
        },
        alternates: { canonical: `https://greattasteiterate.com/work/${slug}` },
      };
    }
  } catch {
    // fallback
  }
  return {
    title: "Case Study — Iterate",
    alternates: { canonical: `https://greattasteiterate.com/work/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: caseStudy } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  const { data: allCases } = await supabase
    .from("case_studies")
    .select("slug,title,tags,client,diagram_key,sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://greattasteiterate.com" },
          { name: "Work", url: "https://greattasteiterate.com/work" },
          { name: caseStudy?.client ?? slug, url: `https://greattasteiterate.com/work/${slug}` },
        ]}
      />
      <WorkDetail
        slug={slug}
        initialData={caseStudy}
        allCases={allCases ?? []}
      />
    </>
  );
}
