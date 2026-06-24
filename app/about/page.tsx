import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Iterate | The Team Behind AI-Native Marketing Infrastructure",
  description:
    "Founded in 2014 by Param Minhas. Four operators building AI marketing infrastructure for founders who already know what good looks like. No holding company. No account layers. Just the work.",
  openGraph: {
    title: "About — Iterate | The Team Behind AI-Native Marketing Infrastructure",
    description:
      "Founded in 2014 by Param Minhas. Four operators building AI marketing infrastructure for founders who already know what good looks like.",
    url: "https://greattasteiterate.com/about",
  },
  alternates: { canonical: "https://greattasteiterate.com/about" },
};

const teamSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Param Minhas",
    url: "https://paramminhas.com",
    jobTitle: "Founder & Director",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: [
      "AI Marketing Infrastructure",
      "Generative Engine Optimization",
      "Brand Strategy",
      "Agentic Systems",
    ],
    sameAs: ["https://paramminhas.com"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arjun Mehta",
    jobTitle: "Head of Strategy",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["Brand Positioning", "Category Design", "Go-to-Market Strategy"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rohan Kapoor",
    jobTitle: "Head of Engineering",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["AI Systems", "Agentic Infrastructure", "SDK Development", "Dynamic Pricing"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Priya Sharma",
    jobTitle: "Head of GEO & AI Visibility",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["Generative Engine Optimization", "AI Citation Engineering", "SEO"],
  },
];

export default function AboutPage() {
  return (
    <>
      {teamSchema.map((person, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      ))}
      <AboutContent />
    </>
  );
}
