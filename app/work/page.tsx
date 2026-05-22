import type { Metadata } from "next";
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

export default function WorkPage() {
  return <WorkIndexContent />;
}
