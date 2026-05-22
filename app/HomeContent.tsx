"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ScarcityBar } from "@/components/site/sections/ScarcityBar";
import { ProofBar } from "@/components/site/sections/ProofBar";
import { ClientVoice } from "@/components/site/sections/ClientVoice";
import { Sectors } from "@/components/site/sections/Sectors";
import { WhoNotFor } from "@/components/site/sections/WhoNotFor";
import { IterationSteps } from "@/components/site/sections/IterationSteps";
import {
  HeroKnot,
  PodAgents,
  CompoundCurve,
  CitationPulse,
  RingTunnel,
} from "@/components/site/three/LineArt";
import { ScrambleNumber } from "@/components/site/ScrambleNumber";
import { ScrambleCycler } from "@/components/site/ScrambleCycler";
import { OutcomesTicker } from "@/components/site/sections/OutcomesTicker";

const problems = [
  {
    title: "The agency model is 20 years old.",
    body: "Built for big teams and slow cycles. Not for agents, three-week proofs, or daily markets.",
  },
  {
    title: "Your buyers switched channels.",
    body: "They used to Google it. Now they ask ChatGPT, Perplexity, Gemini. The results are curated. The brands in those results were engineered to be there.",
  },
  {
    title: "The gap compounds.",
    body: "Every week a competitor is cited and you're not, the model weights their authority higher. You can't outspend it back.",
  },
];

const pillars = [
  {
    num: "01",
    title: "AI Visibility Architecture",
    body: "Schema, structured data, llms.txt, knowledge-graph mapping. When an AI crawls you at 3am, it understands you well enough to recommend you.",
    proof: "Our schema linter audits 2,000 URLs in 90 seconds against the entity graph we've built for your category. Same audit at a legacy agency: 3 weeks, one analyst.",
  },
  {
    num: "02",
    title: "Generative Engine Optimization",
    body: "Answer-capsule content, citation authority, editorial signals across ChatGPT, Perplexity, Gemini, Google AI Mode. A system, not a campaign.",
    proof: "We probe all four engines weekly with your category prompt set — unattended. A research vendor charges ₹2L/month to run a slice of this quarterly.",
  },
  {
    num: "03",
    title: "Agentic Systems & SDK Development",
    body: "Custom agents, pricing engines, ChatGPT and Gemini SDKs. Your stack, your code, transferred on handover.",
    proof: "ChargeZone's pricing engine shipped in 6 weeks. Comparable vendor quote: 6 months, ₹40 lakh. Also in production: Pickyourtrail's itinerary copilot. Monkspaces' occupancy router.",
  },
];

const comparison: [string, string, string][] = [
  ["Monthly cost", "₹10–20 lakh", "₹3–5 lakh"],
  ["Time to first result", "2–3 months", "3 weeks"],
  ["Team size", "20–30 people", "5-person pod + AI agents"],
  ["AI leverage", "Ad-hoc tools", "Custom agents inside the pod"],
  ["Deliverable", "Campaign", "Infrastructure"],
  ["What's measured", "Impressions, clicks", "AI Citation Share, revenue"],
];

export function HomeContent() {
  const { data: works } = useQuery({
    queryKey: ["case_studies_home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug,title,client,year,tags")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .limit(4);
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <>
      {/* ─── 01 HERO ─── */}
      <section className="hero-grid">
        <div className="hero-bg"><HeroKnot /></div>
        <div className="container-edge hero-inner">
          <div className="hero-left">
            <Reveal>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 40 }}>
                <span className="tick" />
                <span className="eyebrow">AI-native marketing studio · est. 2014</span>
              </div>
            </Reveal>
            <h1 className="display display-2xl hero-headline">
              <ScrambleCycler
                phrases={["We design.", "We build.", "We iterate."]}
                scrambleMs={520}
                holdMs={850}
              />
              <span style={{ display: "block", color: "var(--fg-muted)", marginTop: 8 }}>
                Until the machine chooses you first.
              </span>
            </h1>
            <Reveal delay={2800}>
              <p className="lead" style={{ marginTop: 36, marginBottom: 36, maxWidth: "44ch" }}>
                AI already has a favourite in your category. Six months from now, it should be you.
              </p>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary" data-cursor="hover">Start Iteration 01 →</Link>
                <Link href="/work" className="btn-ghost" data-cursor="hover">See the work →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 02 SCARCITY ─── */}
      <ScarcityBar />

      {/* ─── 02b OUTCOMES TICKER ─── */}
      <OutcomesTicker />

      {/* ─── 03 PROOF ─── */}
      <ProofBar />

      {/* ─── 04 THE PROBLEM ─── */}
      <section className="chapter container-edge problem-section">
        <div className="three-bg three-bg-right"><CompoundCurve /></div>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">01 · Why now</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "18ch", marginBottom: 80 }}>
            <ScrambleHeadline as="span" text="A machine is choosing" triggerOnView accent={false} duration={520} />{" "}
            <span style={{ color: "var(--fg-muted)" }}>your category. Right now.</span>
          </h2>
        </Reveal>
        <div className="problem-grid">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <h3 className="problem-title">{p.title}</h3>
              <p className="lead">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 05 NUMBERS ─── */}
      <section className="chapter container-edge hairline-bottom" style={{ paddingBlock: 120 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Numbers</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "22ch", marginBottom: 64 }}>
            <ScrambleHeadline as="span" text="What it actually looks like." triggerOnView accent={false} duration={650} />
          </h2>
        </Reveal>
        <div className="value-grid">
          <Reveal className="value-cell">
            <div className="mono" style={{ color: "var(--accent)", marginBottom: 14 }}>
              <ScrambleHeadline as="span" text="COST" triggerOnView accent={false} duration={420} />
            </div>
            <div className="display display-md" style={{ marginBottom: 18 }}>
              <ScrambleNumber value="₹3–5L" />{" "}
              <span style={{ color: "var(--fg-muted)", fontSize: "0.5em" }}>vs ₹15L+</span>
            </div>
            <p style={{ color: "var(--fg-muted)", fontSize: 15, lineHeight: 1.7 }}>
              No account layers. No junior team padding hours. Every rupee goes into the work — not the overhead of a team built to look big.
            </p>
          </Reveal>
          <Reveal delay={120} className="value-cell">
            <div className="mono" style={{ color: "var(--accent)", marginBottom: 14 }}>
              <ScrambleHeadline as="span" text="SPEED" triggerOnView accent={false} duration={420} />
            </div>
            <div className="display display-md" style={{ marginBottom: 18 }}>
              <ScrambleNumber value="6 weeks" />{" "}
              <span style={{ color: "var(--fg-muted)", fontSize: "0.5em" }}>vs 6 months</span>
            </div>
            <p style={{ color: "var(--fg-muted)", fontSize: 15, lineHeight: 1.7 }}>
              ChargeZone. Dynamic pricing across 13,000 EV charge points. Six weeks. Two vendors had quoted six months and ₹40 lakh. Neither of those numbers is a typo.
            </p>
          </Reveal>
          <Reveal delay={240} className="value-cell">
            <div className="mono" style={{ color: "var(--accent)", marginBottom: 14 }}>
              <ScrambleHeadline as="span" text="OUTCOME" triggerOnView accent={false} duration={420} />
            </div>
            <div className="display display-md" style={{ marginBottom: 18 }}>
              <ScrambleNumber value="#1" />{" "}
              <span style={{ color: "var(--fg-muted)", fontSize: "0.5em" }}>in category</span>
            </div>
            <p style={{ color: "var(--fg-muted)", fontSize: 15, lineHeight: 1.7 }}>
              Zero AI citations to first recommendation across ChatGPT, Perplexity, and Google AI Mode. Six months. The same brief sat with a traditional SEO agency for three years without moving.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── 06 WHAT WE DO ─── */}
      <section className="chapter container-edge what-section">
        <div className="three-bg three-bg-right three-bg-tall"><CitationPulse /></div>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">02 · Our work</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "22ch", marginBottom: 80 }}>
            How we get AI <span style={{ color: "var(--fg-muted)" }}>to choose you first.</span>
          </h2>
        </Reveal>
        <div className="pillars">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 120} className="pillar">
              <div className="mono" style={{ marginBottom: 16 }}>{p.num}</div>
              <h3 className="pillar-title">{p.title}</h3>
              <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 18 }}>{p.body}</p>
              <p style={{ fontSize: 13, color: "var(--fg)", lineHeight: 1.65, paddingTop: 14, borderTop: "1px solid var(--hairline)" }}>
                <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginRight: 8 }}>RESULT</span>
                {p.proof}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <Link href="/services" className="btn-ghost" data-cursor="hover" style={{ marginTop: 56, display: "inline-flex" }}>See how we work →</Link>
        </Reveal>
      </section>

      {/* ─── 07 THE MODEL ─── */}
      <section className="chapter container-edge hairline-top model-section" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">03 · The Iterate model</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "16ch", marginBottom: 80 }}>
            <ScrambleHeadline as="span" text="The comparison" triggerOnView accent={false} duration={520} />{" "}
            <span style={{ color: "var(--fg-muted)" }}>most agencies avoid.</span>
          </h2>
        </Reveal>
        <div className="model-grid">
          <div className="model-three"><PodAgents /></div>
          <Reveal className="model-table-wrap">
            <table className="model-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Traditional agency</th>
                  <th style={{ color: "var(--accent)" }}>Iterate</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row[0]}>
                    <td className="mono">{row[0]}</td>
                    <td style={{ color: "var(--fg-dim)" }}>{row[1]}</td>
                    <td>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
        <IterationSteps />
      </section>

      {/* ─── 08 SELECTED WORK ─── */}
      <section className="hairline-top" style={{ background: "var(--bg-deep)" }}>
        <div className="container-edge" style={{ paddingTop: 120, paddingBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">04 · Work that moved markets</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "14ch" }}>
              Seven engagements. <span style={{ color: "var(--fg-muted)" }}>Zero campaigns.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link href="/work" className="btn-ghost" data-cursor="hover">View all engagements →</Link>
          </Reveal>
        </div>
        <div>
          {(works ?? []).map((w, i) => (
            <Link key={w.slug} href={`/work/${w.slug}`} className="work-row" data-cursor="view">
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-title">{w.title}</span>
              <span className="work-tags">{(w.tags ?? []).slice(0, 2).join(" · ")}</span>
              <span className="work-year">{w.client} · {w.year}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 09 RECOGNITION ─── */}
      <section className="recognition container-edge hairline-bottom">
        <span className="mono" style={{ color: "var(--fg-dim)" }}>Recognition</span>
        <span className="recognition-text">
          <span style={{ color: "var(--accent)" }}>PMO acknowledgement</span> — BILLIONE / eMAP airside operations platform
        </span>
      </section>

      {/* ─── 10 CLIENT VOICE ─── */}
      <ClientVoice />

      {/* ─── 11 SECTORS ─── */}
      <Sectors />

      {/* ─── 12 THESIS ─── */}
      <section className="chapter container-edge thesis-section hairline-top" style={{ background: "var(--bg-deep)" }}>
        <div className="three-bg three-bg-full"><CitationPulse /></div>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 18 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">05 · What we know</span>
          </div>
          <h2 className="display display-lg" style={{ maxWidth: "16ch", marginBottom: 56 }}>
            <ScrambleHeadline as="span" text="The brands that win" triggerOnView accent={false} duration={620} />{" "}
            <span style={{ color: "var(--fg-muted)" }}>aren't louder. They're structured.</span>
          </h2>
          <div style={{ display: "grid", gap: 14, fontSize: 18, fontWeight: 300, color: "var(--fg-muted)", marginBottom: 48 }}>
            <span>AI doesn't read your ads. It reads your structure, your citations, the authority signals you've built over time.</span>
            <span>The brand that built those signals first is the one it defaults to. Not because it's better. Because it was ready.</span>
            <span style={{ color: "var(--fg)" }}>We've been engineering this infrastructure since 2014 — before most agencies knew what to call it.</span>
            <span style={{ color: "var(--fg)", marginTop: 18 }}>The gap compounds either way. The question is which side of it you're on.</span>
          </div>
          <Link href="/about" className="btn-ghost" data-cursor="hover">Read the full thesis →</Link>
        </Reveal>
      </section>

      {/* ─── 13 WHO WE'RE NOT FOR ─── */}
      <WhoNotFor />

      {/* ─── 14 CLOSING CTA ─── */}
      <section className="chapter chapter-tall container-edge cta-section">
        <div className="three-bg three-bg-full"><RingTunnel /></div>
        <Reveal>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", maxWidth: 1100, position: "relative", zIndex: 2 }}>
            <span className="tick tick-lg" />
            <div>
              <span className="mono" style={{ marginBottom: 24, display: "block" }}>06 · Start here</span>
              <h2 className="display display-xl" style={{ marginBottom: 32, maxWidth: "14ch" }}>
                The brief is free. The delay isn't.
              </h2>
              <p className="lead" style={{ marginBottom: 48, maxWidth: "44ch" }}>
                Thirty minutes. No deck. No proposal before work begins. You'll leave knowing exactly what Iteration 01 ships for your category — and what's happening to it while you're reading this.
              </p>
              <Link href="/contact" className="btn-primary" data-cursor="hover">Book the brief →</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
