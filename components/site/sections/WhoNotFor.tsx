"use client";

import { Reveal } from "@/components/site/Reveal";

export function WhoNotFor() {
  return (
    <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
      <Reveal>
        <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
          <span className="tick" />
          <span className="eyebrow eyebrow-muted">A word on fit</span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h2 className="display display-md" style={{ marginBottom: 48, maxWidth: "20ch" }}>
          Iterate is not for everyone.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, maxWidth: 1100 }}>
        <Reveal delay={200}>
          <p className="lead">
            We're not the right fit if you need a 50-page strategy deck before any work begins. Or if success means impressions and follower counts. Or if you want a large team in daily meetings to feel like the budget is being spent.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <p className="lead">
            We work with a small number of clients — not because we can't scale, but because the work demands it. Every engagement gets the full pod, the full thinking, and the full system.
          </p>
          <p className="lead" style={{ marginTop: 24, color: "var(--fg)" }}>
            If you want infrastructure that compounds, we should talk.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
