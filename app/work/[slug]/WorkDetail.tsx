"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";
import { SectionDiagram } from "@/components/site/SectionDiagram";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { NextItem } from "@/components/site/NextItem";
import { ScrambleNumber } from "@/components/site/ScrambleNumber";
import { ClientMark } from "@/components/site/ClientMark";

type Metric = { value: string; label: string };
type Block = { type: "h2" | "h3" | "p" | "quote"; text: string };

export function WorkDetail({ slug }: { slug: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["case_study", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: all } = useQuery({
    queryKey: ["case_studies_nav"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug,title,tags,client,diagram_key,sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <div className="container-edge" style={{ paddingTop: 200 }}><span className="mono">Loading…</span></div>;
  if (error || !data) return <div className="container-edge" style={{ paddingTop: 200 }}><span className="mono">Not found.</span></div>;

  const metrics = (data.metrics ?? []) as unknown as Metric[];
  const diagramKey = (data as any).diagram_key as string | undefined;
  const blocks = ((data as any).body_blocks ?? []) as Block[];

  const idx = (all ?? []).findIndex((c) => c.slug === slug);
  const next = all && all.length > 0 ? all[(idx + 1) % all.length] : null;

  return (
    <>
      <section className="case-hero case-hero-bg">
        <SectionDiagram diagram={diagramKey} mode="hero-bg" />
        <div className="container-edge case-hero-inner">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Work", to: "/work" }, { label: data.client }]} />
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginTop: 28, marginBottom: 28, alignItems: "center", flexWrap: "wrap" }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">{(data.tags ?? [])[0] ?? "Engagement"} · {data.client} · {data.year}</span>
            </div>
            <div className="case-hero-mark" style={{ color: "var(--fg-muted)", marginBottom: 24 }}>
              <ClientMark slug={slug} />
            </div>
            <h1 className="display display-lg" style={{ maxWidth: "22ch", marginBottom: 28 }}>{data.title}</h1>
            <p className="lead" style={{ maxWidth: "58ch", marginBottom: 36 }}>{data.summary}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(data.tags ?? []).map((t: string) => (
                <span key={t} className="sector-pill">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {metrics.length > 0 && (
        <section className="hairline-top hairline-bottom" style={{ background: "var(--bg-deep)" }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${metrics.length},1fr)` }} className="metrics-grid">
            {metrics.map((m, i) => (
              <div key={i} style={{ padding: "56px 32px", borderRight: i < metrics.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                <div className="display" style={{ fontSize: "clamp(36px,4.5vw,72px)", color: "var(--accent)", fontWeight: 200, lineHeight: 1 }}><ScrambleNumber value={m.value} /></div>
                <div className="mono" style={{ marginTop: 14 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="chapter container-edge case-body-rail">
        <div className="case-body-copy">
          {blocks.map((b, i) => {
            if (b.type === "h2") return <Reveal key={i}><h2 className="display display-md case-h2" style={{ marginTop: i === 0 ? 0 : 64, marginBottom: 18 }}>{b.text}</h2></Reveal>;
            if (b.type === "h3") return <Reveal key={i}><h3 className="case-h3 mono" style={{ marginTop: 28, marginBottom: 12, color: "var(--accent)" }}>{b.text}</h3></Reveal>;
            if (b.type === "quote") return <Reveal key={i}><blockquote className="case-quote">{b.text}</blockquote></Reveal>;
            return <Reveal key={i}><p className="lead" style={{ fontSize: 18, lineHeight: 1.7, maxWidth: "62ch", color: "var(--fg)", marginBottom: 18 }}>{b.text}</p></Reveal>;
          })}
        </div>
        <aside className="case-body-rail-diagram">
          <SectionDiagram diagram={diagramKey} mode="rail" />
        </aside>
      </section>

      {next && (
        <section className="hairline-top" style={{ background: "var(--bg-deep)" }}>
          <NextItem
            href={`/work/${next.slug}`}
            label={`Case ${String(((idx + 1) % all!.length) + 1).padStart(2, "0")} · ${(next as any).client}`}
            title={next.title}
            diagram={(next as any).diagram_key}
            kind="case"
          />
        </section>
      )}

      <section className="chapter container-edge hairline-top" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
        <Link href="/work" className="btn-ghost" data-cursor="hover">← All work</Link>
        <Link href="/contact" className="btn-primary" data-cursor="hover">Build something like this →</Link>
      </section>
    </>
  );
}
