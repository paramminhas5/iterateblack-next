import type { Metadata } from "next";
import { HowWeWorkContent } from "./HowWeWorkContent";

export const metadata: Metadata = {
  title: "How We Work — Iterate | The Pod Model, Iteration Process & Pricing",
  description:
    "Five people permanently assigned. AI agents built into the workflow. Weekly iteration cycles, not quarterly reviews. See how Iterate's pod model delivers what 30-person agencies can't.",
  openGraph: {
    title: "How We Work — Iterate | The Pod Model & Iteration Process",
    description:
      "Five people permanently assigned. AI agents built into the workflow. Weekly iteration cycles, not quarterly reviews.",
    url: "https://greattasteiterate.com/how-we-work",
  },
  alternates: { canonical: "https://greattasteiterate.com/how-we-work" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Iterate Engagements Work",
  description:
    "The three-iteration process for building compounding marketing infrastructure with Iterate.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Iteration 01 — Foundation",
      text: "Cloud ecosystem setup, data security, AI tooling baseline, reporting infrastructure, and skills transfer. Three weeks. Everything after this compounds because of it.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Iteration 02 — Full Pod Assigned",
      text: "The full five-person pod permanently assigned to your engagement. GEO, SEO, agentic systems, brand strategy, performance media — built as one integrated system with weekly iteration cycles.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Iteration 03+ — Agentic Systems",
      text: "Custom AI agents on your stack. Dynamic pricing, copilots, SDK integrations. Owned by your team, run with ours. Where the moat compounds.",
    },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <HowWeWorkContent />
    </>
  );
}
