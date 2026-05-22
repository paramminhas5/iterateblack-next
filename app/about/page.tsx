import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Iterate — AI-Native Marketing Studio Est. 2014",
  description:
    "Eleven years of marketing infrastructure built for the age of AI. Five-person pod, zero account layers, one number — the compound rate of your category authority.",
  openGraph: {
    title: "About Iterate — AI-Native Marketing Studio Est. 2014",
    description:
      "Eleven years of marketing infrastructure built for the age of AI. Five-person pod, zero account layers, one number — the compound rate of your category authority.",
    url: "https://greattasteiterate.com/about",
  },
  alternates: { canonical: "https://greattasteiterate.com/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}
