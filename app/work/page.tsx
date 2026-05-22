"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ClientMark } from "@/components/site/ClientMark";

export default function WorkIndex() {
  const { data: works, isLoading } = useQuery({
    queryKey: ["case_studies_all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug,title,client,year,tags,summary")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <>
      <section className="chapter container-edge" style={{ paddingTop: "180px", paddingBottom: 80 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Work · 2014 — present</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "16ch" }}>
            <ScrambleHeadline as="span" text="Selected work." triggerOnView accent={false} duration={550} /><br />
            <span style={{ color: "var(--fg-muted)" }}>Built to compound.</span>
          </h1>
        </Reveal>
      </section>
      <section className="hairline-top">
        {isLoading && <div className="container-edge" style={{ padding: 60 }}><span className="mono">Loading…</span></div>}
        {(works ?? []).map((w, i) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className="work-row" data-cursor="view">
            <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="work-mark"><ClientMark slug={w.slug} /></span>
            <div>
              <div className="work-title">{w.title}</div>
              <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 8, maxWidth: 600 }}>{w.summary}</div>
            </div>
            <span className="work-tags">{(w.tags ?? []).slice(0, 2).join(" · ")}</span>
            <span className="work-year">{w.client} · {w.year}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
