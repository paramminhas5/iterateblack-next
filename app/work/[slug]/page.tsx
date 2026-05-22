import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { WorkDetail } from "./WorkDetail";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const client = createClient(supabaseUrl, supabaseKey);
    const { data } = await client
      .from("case_studies")
      .select("title,client,summary,tags")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (data) {
      const title = `${data.client} — ${data.title} | Iterate`;
      const desc = data.summary ?? `How Iterate built compounding marketing infrastructure for ${data.client}.`;
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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WorkDetail slug={slug} />;
}
