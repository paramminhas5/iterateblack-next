import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Iterate | Three Leaders, 80+ Specialists, One Network",
  description:
    "Founded in 2014 by Param Minhas. Three leaders across B2B, B2C, and AI engineering — plus a network of 80+ specialists in design, growth, performance, and engineering. No holding company. No account layers.",
  openGraph: {
    title: "About — Iterate | Three Leaders, 80+ Specialists, One Network",
    description:
      "Founded in 2014 by Param Minhas. Three leaders plus 80+ specialists building AI marketing infrastructure.",
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
    jobTitle: "Founder — AI, Brand, Growth, Product",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["AI Marketing Infrastructure", "Brand Strategy", "Growth Systems", "Product Development"],
    sameAs: ["https://paramminhas.com"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arjun Mehta",
    jobTitle: "Head of B2B",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["Enterprise Infrastructure", "Operational AI", "B2B Go-to-Market", "Pricing Systems"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Priya Sharma",
    jobTitle: "Head of B2C",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["Consumer Brand", "Demand Systems", "AI Visibility", "Conversion Infrastructure"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rohan Kapoor",
    jobTitle: "Head of AI & Engineering",
    worksFor: { "@id": "https://greattasteiterate.com/#organization" },
    knowsAbout: ["AI Systems Architecture", "Agentic Infrastructure", "SDK Development", "Dynamic Pricing"],
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
