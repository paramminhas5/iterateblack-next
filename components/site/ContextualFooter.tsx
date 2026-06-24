"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ContextualFooter
 * Each page gets a different CTA because the visitor's mindset is different.
 */

type ContextConfig = {
  heading: string;
  sub: string;
  cta: string;
  href: string;
};

function getContext(pathname: string): ContextConfig | null {
  if (pathname === "/contact") return null;

  if (pathname.startsWith("/work/") && pathname !== "/work/") {
    return {
      heading: "The next case study should be yours.",
      sub: "You've seen what compound infrastructure looks like in production. Thirty minutes will tell you exactly what Iteration 01 ships for your category — and who else in your space is already building this.",
      cta: "Start the conversation →",
      href: "/contact",
    };
  }

  if (pathname === "/work") {
    return {
      heading: "Seven engagements. Your category is still open.",
      sub: "We run a deliberately small client roster. Two slots remain for Q3 2026. If you're evaluating this, your competitors likely are too.",
      cta: "Claim your slot →",
      href: "/contact",
    };
  }

  if (pathname === "/services") {
    return {
      heading: "You understand the system. Tell us what winning looks like.",
      sub: "One 30-minute call. No deck required. You'll leave knowing exactly what three-discipline infrastructure looks like for your category — and what it costs.",
      cta: "Begin →",
      href: "/contact",
    };
  }

  if (pathname === "/about") {
    return {
      heading: "You know who we are. The next step costs nothing.",
      sub: "Thirty minutes. No obligation. We'll show you where your category stands across every AI engine and what it takes to become the default answer.",
      cta: "Let's talk →",
      href: "/contact",
    };
  }

  if (pathname.startsWith("/industries")) {
    return {
      heading: "Your industry is moving. Your AI citation share isn't.",
      sub: "We've built production infrastructure across energy, travel, hospitality, aviation, and real estate. Each followed the same model. Each moved the same metric: from invisible to first.",
      cta: "See if there's a fit →",
      href: "/contact",
    };
  }

  // How We Work page
  if (pathname === "/how-we-work") {
    return {
      heading: "You've seen the model. Now tell us your category.",
      sub: "Thirty minutes. We'll map your category's AI landscape and show you exactly what Iteration 01 delivers — and how fast.",
      cta: "Start Iteration 01 →",
      href: "/contact",
    };
  }

  // Home and everything else
  return {
    heading: "The conversation is free. The delay compounds.",
    sub: "Thirty minutes. No deck. No proposal before work begins. You'll leave knowing exactly what Iteration 01 ships for your category — and what's compounding against you while you wait.",
    cta: "Start here →",
    href: "/contact",
  };
}

export function ContextualFooter() {
  const pathname = usePathname();
  const ctx = getContext(pathname);

  if (!ctx) return null;

  return (
    <div className="footer-context-strip">
      <div style={{ flex: "1 1 400px" }}>
        <div className="footer-context-heading">{ctx.heading}</div>
        <p className="footer-context-sub">{ctx.sub}</p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <Link href={ctx.href} className="btn-primary" data-cursor="hover">
          {ctx.cta}
        </Link>
      </div>
    </div>
  );
}
