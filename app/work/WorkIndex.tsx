"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ClientMark } from "@/components/site/ClientMark";

export function WorkIndexContent() {
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
            <ScrambleHeadline as="span" text="Seven engagements." triggerOnView accent={false} duration={550} />
            <br />
            <span style={{ color: "var(--fg-muted)" }}>Zero campaigns.</span>
          </h1>
          <p className="lead" style={{ marginTop: 32, maxWidth: "52ch" }}>
            Every engagement below is a system that still runs. Not a campaign that ended. Not an awareness exercise. Infrastructure — built to compound long after the engagement closes.
          </p>
        </Reveal>
      </section>

      <section className="hairline-top">
        {isLoading && (
          <div className="container-edge" style={{ padding: 60 }}>
            <span className="mono">Loading…</span>
          </div>
        )}
        {(works ?? []).map((w, i) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className="work-row" data-cursor="view">
            <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
            {/* Logo + company name block — most prominent element in the row */}
            <span className="work-mark">
              <ClientMark slug={w.slug} />
            </span>
            <div className="work-copy-block">
              {/* Client name: the main identifiable element */}
              <div className="work-client-name">{w.client}</div>
              {/* Project title: the specific thing we did */}
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
