import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services — Iterate | SEO, GEO & Agentic Systems for AI-Era Brands",
  description:
    "Three disciplines — B2B core SEO, generative engine optimisation, and agentic systems — run as one operating system by one permanently-assigned pod. One team. One number. No handoffs.",
  openGraph: {
    title: "Services — Iterate | SEO, GEO & Agentic Systems for AI-Era Brands",
    description:
      "Three disciplines — B2B core SEO, generative engine optimisation, and agentic systems — run as one operating system by one permanently-assigned pod. One team. One number. No handoffs.",
    url: "https://greattasteiterate.com/services",
  },
  alternates: { canonical: "https://greattasteiterate.com/services" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is generative engine optimisation (GEO)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generative engine optimisation (GEO) is the practice of engineering your brand's content, structured data, and citation authority so that AI systems — ChatGPT, Perplexity, Google AI Mode, Gemini — recommend your brand when a user asks a category question. Unlike traditional SEO which targets blue links, GEO targets the synthesised answer that appears before any links. Iterate runs weekly probes across all four major AI engines using your category's prompt set, tracks AI Citation Share as a KPI, and engineers the content and authority signals that move it.",
      },
    },
    {
      "@type": "Question",
      name: "How much does Iterate cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iterate runs at ₹3–5 lakh per month for a full five-person pod engagement (Iterations 02+). Iteration 01 — a cloud ecosystem setup, data infrastructure, AI tooling baseline, and skills foundation — runs ₹50,000–₹1,00,000 as a one-time engagement. Both are fixed-fee, not time-and-materials.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly does Iterate ship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our benchmark is three weeks to first result. ChargeZone's dynamic pricing engine across 13,000 EV charge points shipped in six weeks — two vendors had quoted six months. Pickyourtrail's itinerary copilot went live in eight weeks. Monkspaces' occupancy routing agent in five weeks. Speed is a function of team size and tooling, not urgency.",
      },
    },
    {
      "@type": "Question",
      name: "What is an agentic system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agentic system is software that uses AI to make decisions and take actions autonomously within a defined scope — a dynamic pricing engine that adjusts prices based on real-time demand signals, an itinerary copilot that stitches together supplier APIs and generates personalised travel plans, or an occupancy router that allocates rooms across a distributed property portfolio. Iterate builds, documents, and transfers these systems to your infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "Is Iterate right for my company?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iterate works with a small number of clients by design. Good fits: founders and operators with a clear commercial outcome to move, B2B and D2C companies with quantifiable goals, businesses that need to ship AI infrastructure in weeks rather than quarters, and briefs where speed and compounding matter more than coverage and reach. Poor fits: companies that measure success by impressions, those that want a large team in weekly status calls, or those that need a 50-page strategy deck before any work begins.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesContent />
    </>
  );
}
