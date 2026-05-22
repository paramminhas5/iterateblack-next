import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site/SiteShell";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Iterate — AI Marketing, Compounded",
  description:
    "An AI-native marketing studio. Strategy, creative, performance, and AI systems — built to compound, not decay.",
  metadataBase: new URL("https://greattasteiterate.com"),
  openGraph: {
    title: "Iterate — AI Marketing, Compounded",
    description:
      "An AI-native marketing studio. Strategy, creative, performance, and AI systems — built to compound, not decay.",
    type: "website",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/647220db-c64b-4f90-bf36-4335cd115712/id-preview-6e3f4585--a343ad1f-d814-4c62-b058-c505f15fb417.lovable.app-1779367094395.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iterate — AI Marketing, Compounded",
    description:
      "An AI-native marketing studio. Strategy, creative, performance, and AI systems — built to compound, not decay.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/647220db-c64b-4f90-bf36-4335cd115712/id-preview-6e3f4585--a343ad1f-d814-4c62-b058-c505f15fb417.lovable.app-1779367094395.png",
    ],
  },
  themeColor: "#06080c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Great Taste & Iterate",
              description: "AI-native marketing studio.",
              url: "https://greattasteiterate.com",
            }),
          }}
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
