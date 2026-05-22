import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Start a Project — Iterate | Book the 30-Minute Brief",
  description:
    "Tell us where you want to be the obvious choice. No deck, no proposal before work begins. Thirty minutes. We'll tell you exactly what Iteration 01 ships for your category.",
  openGraph: {
    title: "Start a Project — Iterate | Book the 30-Minute Brief",
    description:
      "Tell us where you want to be the obvious choice. No deck, no proposal before work begins. Thirty minutes. We'll tell you exactly what Iteration 01 ships for your category.",
    url: "https://greattasteiterate.com/contact",
  },
  alternates: { canonical: "https://greattasteiterate.com/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
