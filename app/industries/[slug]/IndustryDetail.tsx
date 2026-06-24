"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { SectionDiagram } from "@/components/site/SectionDiagram";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { NextItem } from "@/components/site/NextItem";
import { ScrambleNumber } from "@/components/site/ScrambleNumber";

type Highlight = { label: string; value: string };

type IndustryNav = {
  slug: string;
  name: string;
  diagram_key: string;
  sort_order: number;
};

type RelatedCase = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  summary: string;
  diagram_key: string;
};

interface IndustryDetailProps {
  slug: string;
  initialData: any | null;
  allIndustries: IndustryNav[];
  relatedCases: RelatedCase[];
}

export function IndustryDetail({ slug, initialData, allIndustries, relatedCases }: IndustryDetailProps) {
  if (!initialData) {
    return (
      <div className="container-edge" style={{ paddingTop: 200 }}>
        <span className="mono">Not found.</span>
      </div>
    );
  }

  const d = initialData;
  const highlights = (d.highlights ?? []) as Highlight[];
  const needs = (d.needs ?? []) as string[];
  const offerings = (d.offerings ?? []) as string[];
  const whyBlocks: string[] = (d.why_us ?? "")
    .split(/\n\s*\n/)
    .map((b: string) => b.trim())
    .filter(Boolean);

  const idx = allIndustries.findIndex((i) => i.slug === slug);
  const next = allIndustries.length > 0 ? allIndustries[(idx + 1) % allIndustries.length] : null;

  return (
    <>
      <section className="case-hero case-hero-bg">
        <SectionDiagram diagram={d.diagram_key} mode="hero-bg" />
        <div className="container-edge case-hero-inner">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Industries", to: "/industries" },
              { label: d.name },
            ]}
          />
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginTop: 28, marginBottom: 28, alignItems: "center", flexWrap: "wrap" }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">Industry · {d.name}</span>
            </div>
            <h1 className="display display-lg" style={{ maxWidth: "22ch", marginBottom: 28 }}>{d.tagline}</h1>
            <p className="lead" style={{ maxWidth: "60ch" }}>{d.summary}</p>
          </Reveal>
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="hairline-top hairline-bottom" style={{ background: "var(--bg-deep)" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${highlights.length},1fr)` }} className="metrics-grid">
            {highlights.map((h, i) => (
              <div key={i} style={{ padding: "56px 32px", borderRight: i < highlights.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                <div className="display" style={{ fontSize: "clamp(32px,4vw,64px)", color: "var(--accent)", fontWeight: 200, lineHeight: 1 }}>
                  <ScrambleNumber value={h.value} />
                </div>
                <div className="mono" style={{ marginTop: 14 }}>{h.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(needs.length > 0 || offerings.length > 0) && (
        <section className="chapter container-edge ind-twocol">
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">01 · What this industry needs</span>
            </div>
            <ul className="ind-list">
              {needs.map((n, i) => (
                <li key={i}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">02 · What we deliver</span>
            </div>
            <ul className="ind-list">
              {offerings.map((o, i) => (
                <li key={i}>
                  <span className="mono" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {whyBlocks.length > 0 && (
        <section className="chapter container-edge hairline-top case-body-rail">
          <div className="case-body-copy">
            <Reveal>
              <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
                <span className="tick" />
                <span className="eyebrow eyebrow-muted">03 · Why we're the right fit</span>
              </div>
            </Reveal>
            {whyBlocks.map((block, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="mono" style={{ color: "var(--accent)", marginBottom: 14, marginTop: i ? 36 : 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="lead" style={{ fontSize: 18 }}>{block}</p>
              </Reveal>
            ))}
          </div>
          <aside className="case-body-rail-diagram">
            <SectionDiagram diagram={d.diagram_key} mode="rail" />
          </aside>
        </section>
      )}

      {relatedCases.length > 0 && (
        <section className="hairline-top" style={{ background: "var(--bg-deep)" }}>
          <div className="container-edge" style={{ paddingTop: 100, paddingBottom: 32 }}>
            <Reveal>
              <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
                <span className="tick" />
                <span className="eyebrow eyebrow-muted">04 · Selected work in {d.name}</span>
              </div>
            </Reveal>
          </div>
          <div className="outcome-list">
            {relatedCases.map((c, i) => (
              <Link key={c.slug} href={`/work/${c.slug}`} className="outcome-row" data-cursor="view">
                <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="outcome-body">
                  <div className="outcome-client mono" style={{ color: "var(--accent)" }}>{c.client} · {c.year}</div>
                  <div className="work-title" style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}>{c.title}</div>
                  <p className="lead" style={{ fontSize: 15, marginTop: 8 }}>{c.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {next && (
        <section className="hairline-top">
          <NextItem
            href={`/industries/${next.slug}`}
            label={`Industry ${String(((idx + 1) % allIndustries.length) + 1).padStart(2, "0")}`}
            title={next.name}
            diagram={next.diagram_key}
            kind="industry"
          />
        </section>
      )}

      <section className="chapter container-edge hairline-top" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <Link href="/industries" className="btn-ghost" data-cursor="hover">← All industries</Link>
        <Link href="/contact" className="btn-primary" data-cursor="hover">Build for {d.name} →</Link>
      </section>
    </>
  );
}
