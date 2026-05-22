import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: {
    default: "Iterate — AI Marketing Infrastructure That Compounds",
    template: "%s | Iterate",
  },
  description:
    "Iterate is an AI-native marketing studio. We engineer AI citation authority, build agentic systems, and run compounding SEO infrastructure for founders who want to win the category — not the campaign.",
  metadataBase: new URL("https://greattasteiterate.com"),
  openGraph: {
    title: "Iterate — AI Marketing Infrastructure That Compounds",
    description:
      "Iterate is an AI-native marketing studio. We engineer AI citation authority, build agentic systems, and run compounding SEO infrastructure for founders who want to win the category — not the campaign.",
    type: "website",
    siteName: "Iterate",
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
    "AI marketing studio India",
    "generative engine optimisation",
    "GEO agency",
    "AI citation share",
    "B2B SEO agency India",
    "agentic systems marketing",
    "AI visibility strategy",
    "ChatGPT Perplexity marketing",
    "marketing infrastructure",
    "AI-native agency",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://greattasteiterate.com/#organization",
  name: "Great Taste & Iterate",
  alternateName: ["Iterate", "Iterate Studio"],
  description:
    "AI-native marketing studio specialising in generative engine optimisation, AI citation authority, agentic systems development, and compounding B2B marketing infrastructure.",
  url: "https://greattasteiterate.com",
  foundingDate: "2014",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Singapore" },
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
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Iterate Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "B2B SEO & Content Infrastructure" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Generative Engine Optimisation (GEO)" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic Systems & SDK Development" } },
    ],
  },
  sameAs: [
    "https://linkedin.com/company/iterate-studio",
    "https://read.cv/iterate",
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
  name: "Iterate",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#06080c" />
        <meta name="color-scheme" content="dark" />
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
