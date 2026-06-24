import type { Metadata } from "next";
import { createServerClient } from "@/integrations/supabase/server";
import { IndustriesIndex } from "./IndustriesIndex";

export const metadata: Metadata = {
  title: "Industries — Iterate | B2B Infrastructure & B2C Demand Systems",
  description:
    "Eight sectors across B2B and B2C. Energy, aviation, healthcare, SaaS, travel, hospitality, real estate, and D2C. One operating model — AI-accelerated infrastructure built for each vertical.",
  openGraph: {
    title: "Industries — Iterate | B2B Infrastructure & B2C Demand Systems",
    description:
      "Eight sectors across B2B and B2C. One operating model — AI-accelerated infrastructure built for each vertical.",
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
