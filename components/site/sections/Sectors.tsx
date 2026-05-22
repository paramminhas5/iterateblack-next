"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";
import { ContextualDiagram } from "@/components/site/three/ContextualDiagram";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";

const BUILT: Record<string, string> = {
  aviation: "eMAP airside operations platform — BILLIONE, PMO-acknowledged",
  energy: "Dynamic pricing engine across 13,000 EV charge points — ChargeZone",
  travel: "Itinerary copilot stitching 40+ supplier APIs — Pickyourtrail",
  hospitality: "Occupancy router across distributed properties — Monkspaces",
  healthcare: "Clinical citation graph + provider authority pipeline",
  "real-estate": "Community lattice CRM + buyer-intent scoring",
};

export function Sectors() {
  const { data: industries } = useQuery({
    queryKey: ["industries_panels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("slug,name,tagline,summary,diagram_key,sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const items = industries ?? [];

  return (
    <section className="chapter container-edge hairline-top sectors-section">
      <Reveal>
        <div style={{ display: "flex", gap: 18, marginBottom: 24, justifyContent: "space-between", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 18 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">05 · Industries we operate in</span>
          </div>
          <Link href="/industries" className="btn-ghost" data-cursor="hover">All industries →</Link>
        </div>
        <h2 className="display display-md" style={{ maxWidth: "20ch", marginBottom: 24 }}>
          Six sectors. <span style={{ color: "var(--fg-muted)" }}>One operating model — and one named thing we shipped in each.</span>
        </h2>
      </Reveal>

      <div className="sector-stack">
        {items.map((s, i) => (
          <article key={s.slug} className="sector-panel">
            <div className="sector-panel-inner">
              <div className="sector-panel-copy">
                <span className="mono sector-panel-num">{`Industry ${String(i + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}</span>
                <h3 className="display sector-panel-title">
                  <ScrambleHeadline as="span" text={s.name} triggerOnView accent={false} duration={550} />
                </h3>
                <div className="industry-tag" style={{ marginTop: 8 }}>{s.tagline}</div>
                <p className="lead sector-panel-summary">{s.summary}</p>
                {BUILT[s.slug] && (
                  <p className="sector-panel-built">
                    <span className="mono" style={{ color: "var(--accent)", marginRight: 10 }}>BUILT</span>
                    {BUILT[s.slug]}
                  </p>
                )}
                <Link href={`/industries/${s.slug}`} className="btn-ghost" data-cursor="hover" style={{ marginTop: 28 }}>
                  Explore {s.name} →
                </Link>
              </div>
              <div className="sector-panel-diagram" aria-hidden>
                <ContextualDiagram name={(s as any).diagram_key} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
