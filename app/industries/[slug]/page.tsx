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

  let industry: any = null;

  // Check Supabase first
  const { data: dbIndustry } = await supabase
    .from("industries")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  industry = dbIndustry;

  // Static fallback for industries not yet in Supabase
  if (!industry && slug === "tourism") {
    industry = {
      slug: "tourism",
      name: "Tourism & Destination",
      tagline: "AI visibility that puts your destination on the map",
      summary: "Tourism boards and destination brands need AI systems to recommend them when travellers ask 'where should I go?' — we build the citation authority and brand infrastructure that makes AI engines choose your destination first.",
      diagram_key: "RouteWeave",
      highlights: [
        { label: "AI engines monitored weekly", value: "4" },
        { label: "Citation authority programme duration", value: "6 months" },
        { label: "State-level brand programme", value: "Rajasthan" },
      ],
      needs: [
        "AI citation authority — be the destination AI recommends",
        "Brand infrastructure that scales across channels and languages",
        "Experience platform design for modern travellers",
        "Performance media driving qualified visitor intent",
        "Content infrastructure — editorial, video, social at scale",
      ],
      offerings: [
        "GEO programme: AI citation share across ChatGPT, Perplexity, Gemini, Google AI Mode",
        "Destination brand architecture and visual identity systems",
        "AI visibility infrastructure — schema, entity graphs, llms.txt",
        "Content production pipeline — editorial, video, social",
        "Performance media — intent-driven paid acquisition",
        "Measurement infrastructure — attribution, dashboarding, reporting",
      ],
      why_us: "We built the AI visibility programme for Rajasthan Tourism — a state-level authority brand that now appears across AI-generated travel recommendations.\n\nThe same operating model that works for a state tourism board works for a city, a resort group, or a destination experience company. The infrastructure is the same. The category prompts change.\n\nTravel is one of the highest-intent categories in AI search. When someone asks an AI 'where should I go for X,' the destination that's structured for that query wins. We build that structure.",
      related_case_slugs: ["rajasthan-tourism"],
    };
  }

  if (!industry && slug === "d2c") {
    industry = {
      slug: "d2c",
      name: "D2C & E-commerce",
      tagline: "Community-first brands that AI engines recommend",
      summary: "D2C brands win when they build community, not just conversion funnels. We build the brand infrastructure, community systems, and AI visibility that makes your brand the one people — and machines — talk about.",
      diagram_key: "CommunityLattice",
      highlights: [
        { label: "Community built for Solesearch", value: "350K+" },
        { label: "Brand activations delivered", value: "30+" },
        { label: "Full brand + web + design builds", value: "End-to-end" },
      ],
      needs: [
        "Community infrastructure that scales beyond social followers",
        "Brand identity that stands apart in crowded D2C categories",
        "AI visibility — be the brand AI recommends when someone asks 'best X'",
        "Conversion infrastructure that compounds with brand equity",
        "Content production at scale — editorial, social, video, campaign",
        "Performance media that doesn't cannibalise organic growth",
      ],
      offerings: [
        "Community architecture — platforms, activations, events, loyalty",
        "Brand strategy and visual identity systems",
        "Web design and e-commerce infrastructure",
        "AI visibility programme — GEO, citation authority, entity graphs",
        "Content and creative production at scale",
        "Performance media — paid social, search, retargeting",
        "Analytics and attribution infrastructure",
      ],
      why_us: "We built Solesearch from zero to a 350K+ community — not through ads, but through brand, design, community shows with the best sneaker and collectibles brands, and infrastructure that made the community self-sustaining.\n\nThe same model works for any D2C brand: build the community first, then the commerce follows. Most agencies start with the funnel. We start with the reason people gather.\n\nNow we add AI visibility on top — so when someone asks ChatGPT 'what's the best X,' your brand is the answer. Not because you bought the placement, but because you built the authority.",
      related_case_slugs: [],
    };
  }

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
