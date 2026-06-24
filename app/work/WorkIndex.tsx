"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleCycler } from "@/components/site/ScrambleCycler";
import { ClientMark } from "@/components/site/ClientMark";

type Work = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  summary: string;
};

interface WorkIndexProps {
  works: Work[];
}

export function WorkIndexContent({ works }: WorkIndexProps) {
  return (
    <>
      <section className="chapter container-edge" style={{ paddingTop: "180px", paddingBottom: 80 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Work · 2014 — present</span>
          </div>
          <h1 className="display display-2xl hero-headline">
            <ScrambleCycler
              phrases={["Seven engagements.", "Zero campaigns.", "Infrastructure that compounds."]}
              scrambleMs={520}
              holdMs={900}
            />
          </h1>
          <p className="lead" style={{ marginTop: 32, maxWidth: "52ch" }}>
            Every engagement below is a system that still runs. Not a campaign that ended. Not an awareness exercise. Infrastructure — built to compound long after the engagement closes.
          </p>
        </Reveal>
      </section>

      <section className="hairline-top">
        {works.map((w, i) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className="work-row" data-cursor="view">
            <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="work-mark">
              <ClientMark slug={w.slug} />
            </span>
            <div className="work-copy-block">
              <div className="work-client-name">{w.client}</div>
              <div className="work-title-sub">{w.title}</div>
            </div>
            <span className="work-tags">{(w.tags ?? []).slice(0, 2).join(" · ")}</span>
            <span className="work-year">{w.year}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
