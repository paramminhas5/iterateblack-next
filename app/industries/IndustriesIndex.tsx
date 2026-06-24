"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleCycler } from "@/components/site/ScrambleCycler";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ContextualDiagram } from "@/components/site/three/ContextualDiagram";

/* ────────────────────────────────────────────────────────────────────
   Static B2B / B2C structure — defines the segmentation, what we do
   best in each, and links to Supabase-driven detail pages.
   ──────────────────────────────────────────────────────────────────── */

const b2b = [
  {
    slug: "energy",
    title: "Energy & Infrastructure",
    what: "Dynamic pricing engines, fleet operations AI, demand forecasting",
    proof: "ChargeZone — pricing across 13,000 EV charge points, shipped in 6 weeks",
  },
  {
    slug: "aviation",
    title: "Aviation & Government",
    what: "Operations platforms, regulatory compliance systems, PMO-level infrastructure",
    proof: "BILLIONE / eMAP — airside operations platform, PMO-acknowledged",
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    what: "Clinical citation graphs, provider authority pipelines, patient acquisition AI",
    proof: "Citation authority programme — zero to first recommendation in category",
  },
  {
    slug: null,
    title: "SaaS & Technology",
    what: "GEO, AI visibility, demand generation, product-led growth infrastructure",
    proof: null,
  },
];

const b2c = [
  {
    slug: "travel",
    title: "Travel & Hospitality",
    what: "Itinerary copilots, occupancy routing, booking infrastructure, GEO",
    proof: "Pickyourtrail — copilot handles 70% of pre-sales. Monkspaces — occupancy router.",
  },
  {
    slug: "proptech",
    title: "Real Estate & Co-living",
    what: "Demand infrastructure, buyer-intent scoring, community CRM, AI visibility",
    proof: "Coliwoo — full demand infrastructure, brief to live in 18 days",
  },
  {
    slug: null,
    title: "Tourism & Destination",
    what: "Destination brand, AI citation authority, experience platform design",
    proof: "Rajasthan Tourism — state authority brand + AI visibility programme",
  },
  {
    slug: null,
    title: "D2C & E-commerce",
    what: "Community building, conversion infrastructure, performance creative, brand design",
    proof: "Solesearch — sneaker & collectibles marketplace, 350K+ community, 30+ brand shows",
  },
];

type Industry = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  diagram_key: string;
};

interface IndustriesIndexProps {
  industries: Industry[];
}

export function IndustriesIndex({ industries }: IndustriesIndexProps) {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="chapter container-edge" style={{ paddingTop: 180, paddingBottom: 80 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32, alignItems: "center", flexWrap: "wrap" }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Industries · where we operate</span>
          </div>
          <h1 className="display display-2xl hero-headline">
            <ScrambleCycler
              phrases={["Multiple sectors.", "One agnostic model.", "AI-accelerated."]}
              scrambleMs={520}
              holdMs={900}
            />
          </h1>
          <p className="lead" style={{ maxWidth: "52ch", marginTop: 28 }}>
            We build infrastructure for B2B companies that need operational AI and demand systems for B2C brands that need to own their category. Same pod. Same disciplines. Different problems worth solving.
          </p>
        </Reveal>
      </section>

      {/* ─── B2B SEGMENT ─── */}
      <section className="chapter container-edge hairline-top">
        <div className="ind-segment">
          <Reveal>
            <div className="ind-segment-header">
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">B2B · where we build infrastructure</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "22ch", marginBottom: 16 }}>
              Operational AI. Pricing engines.{" "}
              <span style={{ color: "var(--fg-muted)" }}>Systems that run without you.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "48ch", marginBottom: 48 }}>
              B2B clients come to us when they need AI infrastructure that operates at scale — dynamic pricing, demand forecasting, citation authority, and agent-intermediated buying systems.
            </p>
          </Reveal>

          <div className="ind-segment-grid">
            {b2b.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                {item.slug ? (
                  <Link href={`/industries/${item.slug}`} className="ind-segment-card" data-cursor="view">
                    <div className="ind-segment-card-title">{item.title}</div>
                    <div className="ind-segment-card-what">{item.what}</div>
                    {item.proof && (
                      <div className="ind-segment-card-proof">
                        <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginRight: 8 }}>PROOF</span>
                        {item.proof}
                      </div>
                    )}
                  </Link>
                ) : (
                  <Link href="/contact" className="ind-segment-card" data-cursor="hover">
                    <div className="ind-segment-card-title">{item.title}</div>
                    <div className="ind-segment-card-what">{item.what}</div>
                    {item.proof && (
                      <div className="ind-segment-card-proof">
                        <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginRight: 8 }}>PROOF</span>
                        {item.proof}
                      </div>
                    )}
                    <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginTop: 8 }}>TALK TO US →</span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── B2C SEGMENT ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <div className="ind-segment">
          <Reveal>
            <div className="ind-segment-header">
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">B2C · where we build demand</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "22ch", marginBottom: 16 }}>
              Demand systems. AI visibility.{" "}
              <span style={{ color: "var(--fg-muted)" }}>Brands people ask AI about.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "48ch", marginBottom: 48 }}>
              B2C clients come to us when they need to own their category in AI-generated responses — and build the demand infrastructure that converts that visibility into revenue.
            </p>
          </Reveal>

          <div className="ind-segment-grid">
            {b2c.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                {item.slug ? (
                  <Link href={`/industries/${item.slug}`} className="ind-segment-card" data-cursor="view">
                    <div className="ind-segment-card-title">{item.title}</div>
                    <div className="ind-segment-card-what">{item.what}</div>
                    {item.proof && (
                      <div className="ind-segment-card-proof">
                        <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginRight: 8 }}>PROOF</span>
                        {item.proof}
                      </div>
                    )}
                  </Link>
                ) : (
                  <Link href="/contact" className="ind-segment-card" data-cursor="hover">
                    <div className="ind-segment-card-title">{item.title}</div>
                    <div className="ind-segment-card-what">{item.what}</div>
                    {item.proof && (
                      <div className="ind-segment-card-proof">
                        <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginRight: 8 }}>PROOF</span>
                        {item.proof}
                      </div>
                    )}
                    <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginTop: 8 }}>TALK TO US →</span>
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUPABASE-DRIVEN DETAIL ROWS (if industries exist in DB) ─── */}
      {industries.length > 0 && (
        <section className="hairline-top">
          <div className="container-edge" style={{ paddingTop: 80, paddingBottom: 32 }}>
            <Reveal>
              <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
                <span className="tick" />
                <span className="eyebrow eyebrow-muted">Deep dives · detailed industry pages</span>
              </div>
            </Reveal>
          </div>
          {industries.map((ind, i) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className="industry-row" data-cursor="view">
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="industry-row-body">
                <div className="work-title">{ind.name}</div>
                <div className="industry-tag">{ind.tagline}</div>
                <p className="industry-summary">{ind.summary}</p>
              </div>
              <div className="industry-row-diagram" aria-hidden>
                <ContextualDiagram name={ind.diagram_key} />
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <span className="tick tick-lg" />
            <div>
              <h2 className="display display-lg" style={{ marginBottom: 32, maxWidth: "18ch" }}>
                Don't see your industry? We've likely built for it.
              </h2>
              <p className="lead" style={{ marginBottom: 36, maxWidth: "44ch" }}>
                The operating model is industry-agnostic. The AI infrastructure adapts. Tell us your category and we'll show you what's possible.
              </p>
              <Link href="/contact" className="btn-primary" data-cursor="hover">Start a conversation →</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
