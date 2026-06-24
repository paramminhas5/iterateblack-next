"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { SectionDiagram } from "@/components/site/SectionDiagram";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { NextItem } from "@/components/site/NextItem";
import { ScrambleNumber } from "@/components/site/ScrambleNumber";
import { ClientMark } from "@/components/site/ClientMark";

type Metric = { value: string; label: string };
type Block = { type: "h2" | "h3" | "p" | "quote"; text: string };

type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  summary: string;
  body: string;
  body_blocks: any;
  metrics: any;
  diagram_key: string;
  hero_image: string | null;
  sort_order: number;
};

type CaseNav = {
  slug: string;
  title: string;
  tags: string[];
  client: string;
  diagram_key: string;
  sort_order: number;
};

interface WorkDetailProps {
  slug: string;
  initialData: CaseStudy | null;
  allCases: CaseNav[];
}

export function WorkDetail({ slug, initialData, allCases }: WorkDetailProps) {
  if (!initialData) {
    return (
      <div className="container-edge" style={{ paddingTop: 200 }}>
        <span className="mono">Not found.</span>
      </div>
    );
  }

  const data = initialData;
  const metrics = (data.metrics ?? []) as unknown as Metric[];
  const diagramKey = data.diagram_key as string | undefined;
  const blocks = (data.body_blocks ?? []) as Block[];

  const idx = allCases.findIndex((c) => c.slug === slug);
  const next = allCases.length > 0 ? allCases[(idx + 1) % allCases.length] : null;

  return (
    <>
      {/* --- HERO: Client logo + name first, title second --- */}
      <section className="case-hero case-hero-bg">
        <SectionDiagram diagram={diagramKey} mode="hero-bg" />
        <div className="container-edge case-hero-inner">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Work", to: "/work" },
              { label: data.client },
            ]}
          />
          <Reveal>
            <div className="case-client-mark-hero" aria-label={data.client}>
              <ClientMark slug={slug} />
            </div>
            <div className="case-client-name-hero">{data.client}</div>
            <h1 className="case-project-title">{data.title}</h1>
            <p className="case-summary-line">{data.summary}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
              <span className="mono" style={{ color: "var(--fg-dim)", fontSize: 11, alignSelf: "center" }}>
                {data.year}
              </span>
              {(data.tags ?? []).map((t: string) => (
                <span key={t} className="sector-pill">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- METRICS --- */}
      {metrics.length > 0 && (
        <section className="hairline-top hairline-bottom" style={{ background: "var(--bg-deep)" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length},1fr)` }}
            className="metrics-grid"
          >
            {metrics.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: "56px 32px",
                  borderRight: i < metrics.length - 1 ? "1px solid var(--hairline)" : "none",
                }}
              >
                <div
                  className="display"
                  style={{ fontSize: "clamp(36px,4.5vw,72px)", color: "var(--accent)", fontWeight: 200, lineHeight: 1 }}
                >
                  <ScrambleNumber value={m.value} />
                </div>
                <div className="mono" style={{ marginTop: 14 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- BODY: Full-width text statements, rail diagram --- */}
      <section className="chapter container-edge case-body-rail">
        <div className="case-body-copy">
          {blocks.map((b, i) => {
            if (b.type === "h2")
              return (
                <Reveal key={i}>
                  <h2 className="case-statement-h2" style={{ marginTop: i === 0 ? 0 : 72, marginBottom: 20 }}>
                    {b.text}
                  </h2>
                </Reveal>
              );
            if (b.type === "h3")
              return (
                <Reveal key={i}>
                  <h3 className="case-h3 mono" style={{ marginTop: 32, marginBottom: 12, color: "var(--accent)" }}>
                    {b.text}
                  </h3>
                </Reveal>
              );
            if (b.type === "quote")
              return (
                <Reveal key={i}>
                  <blockquote className="case-quote">{b.text}</blockquote>
                </Reveal>
              );
            return (
              <Reveal key={i}>
                <p className="case-body-p">{b.text}</p>
              </Reveal>
            );
          })}
        </div>
        <aside className="case-body-rail-diagram" aria-hidden>
          <SectionDiagram diagram={diagramKey} mode="rail" />
        </aside>
      </section>

      {/* --- NEXT CASE --- */}
      {next && (
        <section className="hairline-top" style={{ background: "var(--bg-deep)" }}>
          <NextItem
            href={`/work/${next.slug}`}
            label={`Case ${String(((idx + 1) % allCases.length) + 1).padStart(2, "0")} · ${next.client}`}
            title={next.title}
            diagram={next.diagram_key}
            kind="case"
          />
        </section>
      )}

      {/* --- FOOTER NAV --- */}
      <section
        className="chapter container-edge hairline-top"
        style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}
      >
        <Link href="/work" className="btn-ghost" data-cursor="hover">← All work</Link>
        <Link href="/contact" className="btn-primary" data-cursor="hover">Build something like this →</Link>
      </section>
    </>
  );
}
