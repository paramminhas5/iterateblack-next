"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { SectionDiagram } from "@/components/site/SectionDiagram";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";

const tenets = [
  {
    num: "01",
    title: "Iteration is the only honest deliverable.",
    body: "A launch is a hypothesis. The real result comes from what you do in weeks two through twenty — the compounding effect of testing, measuring, and adjusting faster than the category moves. We are accountable to that rate, not to a launch date.",
  },
  {
    num: "02",
    title: "AI compresses time. We give you the compressed result.",
    body: "ChargeZone's dynamic pricing engine: 6 weeks. Competing vendor quotes: 6 months, ₹40 lakh. Pickyourtrail's itinerary copilot: 8 weeks. Monkspaces' occupancy router: 5 weeks. These aren't outliers — they're what happens when a pod of five people uses AI as core infrastructure rather than a bolt-on tool.",
  },
  {
    num: "03",
    title: "You own the engine. Always.",
    body: "Every system we build is documented end-to-end, with handover to your team or to us on a retained basis — your choice. The code lives on your infrastructure. The data lives in your stack. No proprietary platforms, no dependency on our continued involvement to keep the lights on.",
  },
  {
    num: "04",
    title: "Brand is a measurable metric — not a vibe.",
    body: "We probe AI engines weekly with your category's prompt set. We track AI Citation Share: the percentage of relevant queries where your brand appears as a recommended answer. We track brand impact as an 8/10 vs 5/10 qualitative score with a reproducible methodology. If a CFO asks you to justify the brand budget, you should be able to answer in a single sentence.",
  },
  {
    num: "05",
    title: "Quiet over loud — always.",
    body: "We don't post case studies for social proof. We post them when clients give us permission and when the results are worth the reader's time. Our business grows through referrals and the work itself — which is the only proof that scales.",
  },
];

export function AboutContent() {
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

      {/* ── The short version ── */}
      <section className="chapter container-edge hairline-top about-short">
        <Reveal>
          <span className="mono">The short version</span>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead" style={{ fontSize: 22, lineHeight: 1.55, color: "var(--fg)" }}>
            Iterate is an AI-native marketing studio, operating since 2014. Clients come to us when the traditional agency model has already failed them once — when they need to show up first in AI-generated responses, ship agentic systems in weeks rather than quarters, and build marketing infrastructure that compounds rather than decays.
          </p>
          <p className="lead" style={{ marginTop: 28 }}>
            Eleven years of work across energy infrastructure, travel platforms, aviation, hospitality, D2C, and B2B SaaS. We don't take every brief — only the ones where the result, not the process, is what gets measured.
          </p>
        </Reveal>
      </section>

      {/* ── The model ── */}
      <section className="chapter hairline-top pod-section" style={{ paddingBlock: 140 }}>
        <div className="pod-grid">
          <Reveal className="pod-copy">
            <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">The model</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "18ch", marginBottom: 28 }}>
              Five people. Permanently assigned.{" "}
              <span style={{ color: "var(--fg-muted)" }}>Plus agents.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "48ch" }}>
              Strategy, build, GEO, agents, account. No junior team padding hours. No account layers between you and the people doing the work. One number per engagement.
            </p>
            <p className="lead" style={{ maxWidth: "48ch", marginTop: 20, color: "var(--fg-muted)" }}>
              The cost compresses because the team is small and the tooling is ours. The speed doesn't compress because accountability doesn't have anywhere to hide.
            </p>
            <ul className="pod-list">
              <li><span className="mono">Strategy</span> Narrative, category positioning, GTM</li>
              <li><span className="mono">Build</span> Web, app, AI infrastructure</li>
              <li><span className="mono">GEO</span> AI visibility, citation share engineering</li>
              <li><span className="mono">Agents</span> Dynamic pricing, SDKs, internal copilots</li>
              <li><span className="mono">Account</span> One person. One thread back to you.</li>
            </ul>
          </Reveal>
          <div className="pod-diagram">
            <SectionDiagram diagram="PodAgents" mode="inline" height="100%" />
          </div>
        </div>
      </section>

      {/* ── Tenets ── */}
      <section className="chapter hairline-top">
        <div className="container-edge">
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 56 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">How we operate</span>
            </div>
          </Reveal>
        </div>
        <div className="container-edge">
          {tenets.map((t) => (
            <Reveal key={t.num} className="process-row">
              <div className="process-num">{t.num}</div>
              <div>
                <h3
                  className="display"
                  style={{ fontSize: "clamp(26px,3.2vw,44px)", fontWeight: 200, marginBottom: 14 }}
                >
                  {t.title}
                </h3>
                <p className="lead">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The thesis ── */}
      <section
        className="chapter container-edge hairline-top thesis-section"
        style={{ background: "var(--bg-deep)" }}
      >
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">The thesis · May 2026</span>
          </div>
          <h2 className="display display-lg" style={{ maxWidth: "20ch", marginBottom: 40 }}>
            <ScrambleHeadline
              as="span"
              text="Right now, an AI is deciding which brand to recommend in your category."
              triggerOnView
              accent={false}
              duration={900}
            />
          </h2>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: 22 }}>
            That AI doesn't read your ads, your Instagram presence, or your agency's monthly report. It reads your structured data, your citation authority — the frequency with which other authoritative sources mention you — and the clarity of your entity definition across the web.
          </p>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: 22, color: "var(--fg-muted)" }}>
            The brand that built those signals first is the one it defaults to. Not because it's better. Because it was ready. And once an AI has a default answer for a category, dislodging it requires sustained infrastructure — not a campaign.
          </p>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: 36, color: "var(--fg)" }}>
            By May 2026, 18.57% of commercial queries trigger an AI Overview before a single blue link. 90% of B2B buying will flow through AI-agent intermediaries by 2028 (Gartner). The gap between brands that are structured for this and those that aren't is already compounding weekly. The question is which side of it you're on.
          </p>
          <div style={{ marginBottom: 40, height: 320 }}>
            <SectionDiagram diagram="CompoundCurve" mode="inline" height="100%" />
          </div>
          <Link href="/contact" className="btn-primary" data-cursor="hover">
            Start Iteration 01 →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
