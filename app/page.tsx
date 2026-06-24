import type { Metadata } from "next";
import { createServerClient } from "@/integrations/supabase/server";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: "Iterate — AI Marketing Infrastructure That Compounds",
  description:
    "AI already has a favourite in your category. Iterate engineers AI citation authority, builds agentic systems, and runs compounding marketing infrastructure so that favourite is you.",
  alternates: { canonical: "https://greattasteiterate.com" },
};

export default async function Home() {
  const supabase = createServerClient();

  const [worksRes, industriesRes] = await Promise.all([
    supabase
      .from("case_studies")
      .select("slug,title,client,year,tags")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .limit(4),
    supabase
      .from("industries")
      .select("slug,name,tagline,summary,diagram_key,sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true }),
  ]);

  return (
    <HomeContent
      works={worksRes.data ?? []}
      industries={industriesRes.data ?? []}
    />
  );
}
