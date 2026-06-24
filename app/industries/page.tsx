import type { Metadata } from "next";
import { createServerClient } from "@/integrations/supabase/server";
import { IndustriesIndex } from "./IndustriesIndex";

export const metadata: Metadata = {
  title: "Industries — Iterate | Six Sectors, One Operating Model",
  description:
    "Energy, travel, hospitality, aviation, healthcare, and real estate. One system per sector — a pricing engine, a citation graph, an itinerary copilot. Same pod, built on your stack.",
  openGraph: {
    title: "Industries — Iterate | Six Sectors, One Operating Model",
    description:
      "Energy, travel, hospitality, aviation, healthcare, and real estate. One system per sector — a pricing engine, a citation graph, an itinerary copilot. Same pod, built on your stack.",
    url: "https://greattasteiterate.com/industries",
  },
  alternates: { canonical: "https://greattasteiterate.com/industries" },
};

export default async function IndustriesPage() {
  const supabase = createServerClient();

  const { data: industries } = await supabase
    .from("industries")
    .select("slug,name,tagline,summary,diagram_key")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return <IndustriesIndex industries={industries ?? []} />;
}
