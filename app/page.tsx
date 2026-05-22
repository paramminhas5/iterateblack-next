import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: "Iterate — AI Marketing Infrastructure That Compounds",
  description:
    "AI already has a favourite in your category. Iterate engineers AI citation authority, builds agentic systems, and runs compounding marketing infrastructure so that favourite is you.",
  alternates: { canonical: "https://greattasteiterate.com" },
};

export default function Home() {
  return <HomeContent />;
}
