import type { Metadata } from "next";
import { createServerClient } from "@/integrations/supabase/server";
import { WorkIndexContent } from "./WorkIndex";

export const metadata: Metadata = {
  title: "Work — Iterate | Seven Engagements, Zero Campaigns",
  description:
    "Case studies from ChargeZone, Pickyourtrail, Monkspaces, BILLIONE, Rajasthan Tourism, Coliwoo, and Noida International Airport. Infrastructure that compounds, not campaigns that decay.",
  openGraph: {
    title: "Work — Iterate | Seven Engagements, Zero Campaigns",
    description:
      "Case studies from ChargeZone, Pickyourtrail, Monkspaces, BILLIONE, Rajasthan Tourism, Coliwoo, and Noida International Airport. Infrastructure that compounds, not campaigns that decay.",
    url: "https://greattasteiterate.com/work",
  },
  alternates: { canonical: "https://greattasteiterate.com/work" },
};

export default async function WorkPage() {
  const supabase = createServerClient();

  const { data: works } = await supabase
    .from("case_studies")
    .select("slug,title,client,year,tags,summary")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return <WorkIndexContent works={works ?? []} />;
}
