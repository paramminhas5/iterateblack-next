"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ContextualDiagram } from "@/components/site/three/ContextualDiagram";

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
      <section className="chapter container-edge" style={{ paddingTop: 180, paddingBottom: 80 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32, alignItems: "center", flexWrap: "wrap" }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Industries · where we operate</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "18ch" }}>
            <ScrambleHeadline as="span" text="Six sectors." triggerOnView accent={false} duration={550} />{" "}
            <span style={{ color: "var(--fg-muted)" }}>One operating model.</span>
          </h1>
          <p className="lead" style={{ maxWidth: "52ch", marginTop: 28 }}>
            One system per sector. A pricing engine for energy. A citation graph for healthcare. An itinerary copilot for travel. Same pod. Built on your stack. Transferred when you want it.
          </p>
        </Reveal>
      </section>

      <section className="hairline-top">
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
    </>
  );
}
