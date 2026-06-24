import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services — Iterate | AI-First Full-Service Marketing Agency",
  description:
    "Twelve disciplines — from GEO and agentic systems to SEO, paid media, brand, web, and creative — all AI-accelerated, run by one pod. Everything a top agency does, plus everything they can't.",
  openGraph: {
    title: "Services — Iterate | AI-First Full-Service Marketing Agency",
    description:
      "Twelve disciplines — from GEO and agentic systems to SEO, paid media, brand, web, and creative — all AI-accelerated, run by one pod.",
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
      name: "What services does Iterate offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iterate offers twelve AI-accelerated disciplines: Generative Engine Optimization (GEO), AI Visibility Architecture, Agentic Systems & SDK Development, AI Citation Authority Engineering, SEO & Content Infrastructure, Performance Media & Paid Acquisition, Brand Strategy & Identity, Web & Product Design, Content & Creative Production, Marketing Automation & CRM, Analytics & Dashboarding, and Social Media & Community. All services run through AI infrastructure built in-house.",
      },
    },
    {
      "@type": "Question",
      name: "What is generative engine optimisation (GEO)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generative engine optimisation (GEO) is the practice of engineering your brand's content, structured data, and citation authority so that AI systems — ChatGPT, Perplexity, Google AI Mode, Gemini — recommend your brand when a user asks a category question. Unlike traditional SEO which targets blue links, GEO targets the synthesised answer. Iterate runs weekly probes across all four major AI engines, tracks AI Citation Share as a KPI, and engineers the signals that move it.",
      },
    },
    {
      "@type": "Question",
      name: "How is Iterate different from a traditional marketing agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iterate runs every discipline through AI infrastructure built in-house. A five-person pod with custom AI agents replaces what traditional agencies staff with 20-30 people. The result: same deliverables, 70% less cost, shipped in weeks instead of months. There are no handoffs between teams because there is one team.",
      },
    },
    {
      "@type": "Question",
      name: "What is an agentic system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agentic system is software that uses AI to make decisions and take actions autonomously within a defined scope. Examples: a dynamic pricing engine adjusting prices based on real-time demand (ChargeZone), an itinerary copilot generating personalised travel plans from 40+ supplier APIs (Pickyourtrail), or an occupancy router allocating rooms across a distributed property portfolio (Monkspaces). Iterate builds, documents, and transfers these systems to your infrastructure.",
      },
    },
    {
      "@type": "Question",
      name: "Does Iterate handle traditional marketing like SEO and paid ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Iterate handles every traditional marketing discipline — SEO, paid acquisition, brand strategy, web design, content production, CRM, analytics, and social media. The difference is every service runs through AI tooling built in-house, which means 10x the output speed and a fraction of the cost of a traditional agency approach.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: { "@id": "https://greattasteiterate.com/#organization" },
  name: "AI-First Marketing Services",
  description: "Twelve AI-accelerated marketing disciplines from generative engine optimization to brand strategy, all run by a single integrated pod.",
  serviceType: "Marketing Agency",
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United States" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Iterate Service Catalogue",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generative Engine Optimization (GEO)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Visibility Architecture" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic Systems & SDK Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Citation Authority Engineering" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & Content Infrastructure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Performance Media & Paid Acquisition" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brand Strategy & Identity" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web & Product Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content & Creative Production" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Marketing Automation & CRM" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Analytics, Attribution & Dashboarding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media & Community" } },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicesContent />
    </>
  );
}
