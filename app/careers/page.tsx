import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers — Iterate | Join the Network",
  description:
    "Join Iterate's network of 80+ specialists across design, engineering, growth, performance, and vertical expertise. Project-based, high-bar, AI-native work with the best clients.",
  openGraph: {
    title: "Careers — Iterate | Join the Network",
    description: "Join Iterate's network of 80+ specialists. Project-based, high-bar, AI-native work.",
    url: "https://greattasteiterate.com/careers",
  },
  alternates: { canonical: "https://greattasteiterate.com/careers" },
};

export default function CareersPage() {
  return <CareersContent />;
}
