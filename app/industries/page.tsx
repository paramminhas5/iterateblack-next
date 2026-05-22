"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ContextualDiagram } from "@/components/site/three/ContextualDiagram";

export default function IndustriesIndex() {
  const { data: industries, isLoading } = useQuery({
    queryKey: ["industries_index"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("industries")
        .select("slug,name,tagline,summary,diagram_key")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

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
        {isLoading && <div className="container-edge" style={{ padding: 60 }}><span className="mono">Loading…</span></div>}
        {(industries ?? []).map((ind, i) => (
          <Link key={ind.slug} href={`/industries/${ind.slug}`} className="industry-row" data-cursor="view">
            <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="industry-row-body">
              <div className="work-title">{ind.name}</div>
              <div className="industry-tag">{ind.tagline}</div>
              <p className="industry-summary">{ind.summary}</p>
            </div>
            <div className="industry-row-diagram" aria-hidden>
              <ContextualDiagram name={(ind as any).diagram_key} />
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
