"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { SectionDiagram } from "@/components/site/SectionDiagram";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";

const tenets = [
  { num: "01", title: "Iteration is the deliverable.", body: "Launches are checkpoints. The real work is what happens between weeks two and twenty — and it compounds." },
  { num: "02", title: "AI compresses time. We give you the result.", body: "We've shipped four agents into production: dynamic EV pricing, an itinerary copilot, an occupancy router, a content-fact-check pipeline. Each one delivered in weeks, not quarters. The point isn't that we use AI — it's that you get outcomes at a speed no traditional agency can match." },
  { num: "03", title: "Own the engine.", body: "Every system we build is documented, transferred and run by your team — or by us, on your terms. No lock-in dressed up as service." },
  { num: "04", title: "Brand is a metric.", body: "AI Citation Share, social mentions, sentiment, search-attached intent. We quantify what agencies have hidden inside vibes — using probes we run weekly on your category, not a vendor's." },
  { num: "05", title: "Quiet over loud.", body: "We don't post our work for clout. We let it work, and let the results post themselves." },
];

export default function About() {
  return (
    <>
      <section className="chapter container-edge" style={{ paddingTop: 180 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">About · est. 2014 · v2.6</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "20ch" }}>
            <ScrambleHeadline as="span" text="A studio for founders" triggerOnView accent={false} duration={650} /><br />
            <span style={{ color: "var(--fg-muted)" }}>who already know what good looks like.</span>
          </h1>
        </Reveal>
      </section>

      <section className="chapter container-edge hairline-top about-short">
        <Reveal>
          <span className="mono">The short version</span>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead" style={{ fontSize: 22, lineHeight: 1.55, color: "var(--fg)" }}>
            Iterate is an AI-native marketing studio. Clients come to us when they want to move faster than their category, show up first when AI picks a winner, and build infrastructure that keeps compounding long after the engagement ends.
          </p>
          <p className="lead" style={{ marginTop: 28 }}>
            Eleven years of work across tourism boards, hospitality platforms, D2C brands, B2B funds, and category-defining companies you've used today without realising it. We don't take every brief — only the ones where the result, not the process, is what gets remembered.
          </p>
        </Reveal>
      </section>

      <section className="chapter hairline-top pod-section" style={{ paddingBlock: 140 }}>
        <div className="pod-grid">
          <Reveal className="pod-copy">
            <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">The model</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "16ch", marginBottom: 28 }}>
              Five people, permanently assigned. <span style={{ color: "var(--fg-muted)" }}>Plus agents.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "48ch" }}>
              Strategy, build, GEO, agents, account. The cost compresses. The speed doesn't.
            </p>
            <p className="lead" style={{ maxWidth: "48ch", marginTop: 20, color: "var(--fg-muted)" }}>
              We don't sell AI. We use it to deliver, and we engineer for it on your behalf — two sides of the same bet.
            </p>
            <ul className="pod-list">
              <li><span className="mono">Strategy</span> Narrative, category, GTM</li>
              <li><span className="mono">Build</span> Web, app, infrastructure</li>
              <li><span className="mono">GEO</span> AI visibility & citation share</li>
              <li><span className="mono">Agents</span> Dynamic pricing, SDKs, copilots</li>
              <li><span className="mono">Account</span> The single thread back to you</li>
            </ul>
          </Reveal>
          <div className="pod-diagram">
            <SectionDiagram diagram="PodAgents" mode="inline" height="100%" />
          </div>
        </div>
      </section>

      <section className="chapter hairline-top">
        <div className="container-edge">
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 56 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">Tenets</span>
            </div>
          </Reveal>
        </div>
        <div className="container-edge">
          {tenets.map((t) => (
            <Reveal key={t.num} className="process-row">
              <div className="process-num">{t.num}</div>
              <div>
                <h3 className="display" style={{ fontSize: "clamp(26px,3.2vw,44px)", fontWeight: 200, marginBottom: 14 }}>{t.title}</h3>
                <p className="lead">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="chapter container-edge hairline-top thesis-section" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Thesis</span>
          </div>
          <h2 className="display display-lg" style={{ maxWidth: "18ch", marginBottom: 40 }}>
            <ScrambleHeadline as="span" text="Right now, an AI is deciding which brand to recommend in your category." triggerOnView accent={false} duration={900} />
          </h2>
          <p className="lead" style={{ maxWidth: "58ch", marginBottom: 36 }}>
            It isn't reading your ads. It's reading your structure, your citations and your authority signals. Every week, the model retrains on whoever showed up — and the brand that built those signals first is the one it chooses by default. The gap compounds weekly, in your favour or against you.
          </p>
          <div style={{ marginBottom: 36, height: 320 }}>
            <SectionDiagram diagram="CompoundCurve" mode="inline" height="100%" />
          </div>
          <Link href="/contact" className="btn-primary" data-cursor="hover">Start Iteration 01 →</Link>
        </Reveal>
      </section>
    </>
  );
}
