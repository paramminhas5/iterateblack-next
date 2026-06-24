import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Iterate | Three Leaders, 80+ Specialists, One Network",
  description:
    "Founded in 2014 by Param Minhas. Three leaders across AI/Brand/Product, B2B, and B2C — plus a network of 80+ specialists in design, growth, performance, engineering, and more.",
  openGraph: {
    title: "About — Iterate | Three Leaders, 80+ Specialists, One Network",
    description: "Founded in 2014 by Param Minhas. Three leaders plus 80+ specialists building AI marketing infrastructure.",
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
    jobTitle: "Founder — AI, Brand, Product",
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
];

export default function AboutPage() {
  return (
    <>
      {teamSchema.map((person, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      ))}
      <AboutContent />
    </>
  );
}
