"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ContextualFooter
 * Each page gets a different CTA because the visitor's mindset is different.
 * Work page: they've seen proof → invite the next brief.
 * Services: they understand the system → push to specifics.
 * About: they know who we are → lower the barrier to talk.
 * Industries: they're thinking about their vertical → hit the urgency.
 * Contact: they're already converting → skip the CTA strip entirely.
 * Home / default: the full thesis close.
 */

type ContextConfig = {
  heading: string;
  sub: string;
  cta: string;
  href: string;
};

function getContext(pathname: string): ContextConfig | null {
  // Contact page: no footer CTA, they're already there
  if (pathname === "/contact") return null;

  // Case study detail pages
  if (pathname.startsWith("/work/") && pathname !== "/work/") {
    return {
      heading: "The next case study can be yours.",
      sub: "You've seen what compound infrastructure looks like in production. The brief is free. The thirty minutes will tell you exactly what Iteration 01 ships for your category — and who your competitors are briefing right now.",
      cta: "Book the brief →",
      href: "/contact",
    };
  }

  // Work index
  if (pathname === "/work") {
    return {
      heading: "Seven engagements. Your category is still open.",
      sub: "We run a small number of clients by design. Two slots open for Q3 2026. If you're thinking about it, you're probably already late — but not too late.",
      cta: "Start Iteration 01 →",
      href: "/contact",
    };
  }

  // Services page
  if (pathname === "/services") {
    return {
      heading: "You understand the system. Tell us what winning looks like.",
      sub: "One 30-minute call. No deck required. You'll leave knowing exactly what three-discipline infrastructure looks like for your specific category — and what it costs to the rupee.",
      cta: "Book the brief →",
      href: "/contact",
    };
  }

  // About page
  if (pathname === "/about") {
    return {
      heading: "You know who we are. The next step costs nothing.",
      sub: "Thirty minutes. No obligation before Iteration 01 begins. We'll tell you where your category stands in every AI engine, and what it takes to become the default recommendation.",
      cta: "Start a conversation →",
      href: "/contact",
    };
  }

  // Industries pages
  if (pathname.startsWith("/industries")) {
    return {
      heading: "Your industry is moving. Your AI citation share isn't.",
      sub: "We've built production infrastructure for energy, travel, hospitality, aviation, and real estate. Each one followed the same three-discipline model. Each one moved the same metric: AI Citation Share, from zero to first.",
      cta: "See if there's a fit →",
      href: "/contact",
    };
  }

  // Home and everything else
  return {
    heading: "The brief is free. The delay isn't.",
    sub: "Thirty minutes. No deck. No proposal before work begins. You'll leave knowing exactly what Iteration 01 ships for your category — and what's compounding against you while you read this.",
    cta: "Book the brief →",
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
