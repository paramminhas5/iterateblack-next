import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: {
    default: "Hyperiterate — AI Marketing Infrastructure That Compounds",
    template: "%s | Hyperiterate",
  },
  description:
    "Hyperiterate is an AI-native marketing studio. We engineer AI citation authority, build agentic systems, and run compounding SEO infrastructure for founders who want to win the category — not the campaign.",
  metadataBase: new URL("https://greattasteiterate.com"),
  openGraph: {
    title: "Hyperiterate — AI Marketing Infrastructure That Compounds",
    description:
      "Hyperiterate is an AI-native marketing studio. We engineer AI citation authority, build agentic systems, and run compounding SEO infrastructure for founders who want to win the category — not the campaign.",
    type: "website",
    siteName: "Hyperiterate",
    locale: "en_IN",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/647220db-c64b-4f90-bf36-4335cd115712/id-preview-6e3f4585--a343ad1f-d814-4c62-b058-c505f15fb417.lovable.app-1779367094395.png",
        width: 1200,
        height: 630,
        alt: "Iterate — AI Marketing Infrastructure That Compounds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iterate — AI Marketing Infrastructure That Compounds",
    description:
      "Iterate is an AI-native marketing studio. We engineer AI citation authority, build agentic systems, and run compounding SEO infrastructure for founders who want to win the category — not the campaign.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/647220db-c64b-4f90-bf36-4335cd115712/id-preview-6e3f4585--a343ad1f-d814-4c62-b058-c505f15fb417.lovable.app-1779367094395.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://greattasteiterate.com" },
  authors: [{ name: "Iterate", url: "https://greattasteiterate.com" }],
  keywords: [
    "AI marketing agency",
    "AI-native marketing studio",
    "generative engine optimisation",
    "GEO agency",
    "AI citation share",
    "agentic systems marketing",
    "AI visibility strategy",
    "ChatGPT Perplexity marketing",
    "marketing infrastructure",
    "B2B SEO agency",
    "AI-first full-service agency",
    "brand strategy AI",
    "performance media AI",
    "dynamic pricing engine",
    "AI copilot development",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://greattasteiterate.com/#organization",
  name: "Hyperiterate",
  legalName: "Hyperiterate",
  alternateName: ["Hyperiterate Studio"],
  description:
    "AI-native marketing studio running twelve AI-accelerated disciplines — from generative engine optimisation and agentic systems to SEO, brand, paid media, and creative — as one integrated system.",
  url: "https://greattasteiterate.com",
  foundingDate: "2014",
  founder: {
    "@type": "Person",
    name: "Param Minhas",
    url: "https://paramminhas.com",
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United States" },
  ],
  knowsAbout: [
    "Generative Engine Optimisation",
    "AI Citation Authority",
    "Large Language Model Optimisation",
    "Agentic Systems Development",
    "B2B Search Engine Optimisation",
    "Brand Strategy",
    "AI Visibility Infrastructure",
    "ChatGPT SDK Integration",
    "Dynamic Pricing Engines",
    "Performance Media",
    "Web Design",
    "Content Production",
    "Marketing Automation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Iterate Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generative Engine Optimisation (GEO)" } },
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
  sameAs: [
    "https://linkedin.com/company/iterate-studio",
    "https://paramminhas.com",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Business Enquiry",
    email: "hello@greattasteiterate.com",
    availableLanguage: ["English", "Hindi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://greattasteiterate.com/#website",
  url: "https://greattasteiterate.com",
  name: "Hyperiterate",
  publisher: { "@id": "https://greattasteiterate.com/#organization" },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://greattasteiterate.com/work?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta name="theme-color" content="#06080c" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <QueryProvider>
          <SiteShell>{children}</SiteShell>
        </QueryProvider>
      </body>
    </html>
  );
}
