"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import {
  CitationPulse,
  BrandSignalGraph,
  AgentLoop,
  ConvergenceNode,
} from "@/components/site/three/LineArt";

/* Minimal line-art SVG icons for Tier 2 service cards */
function ServiceIcon({ type }: { type: string }) {
  const props = { className: "service-card-icon", viewBox: "0 0 40 40", fill: "none", stroke: "currentColor", strokeWidth: 1.2 };
  switch (type) {
    case "graph": return <svg {...props}><circle cx="20" cy="20" r="4" /><circle cx="8" cy="10" r="2.5" /><circle cx="32" cy="10" r="2.5" /><circle cx="8" cy="30" r="2.5" /><circle cx="32" cy="30" r="2.5" /><line x1="16" y1="18" x2="10" y2="12" /><line x1="24" y1="18" x2="30" y2="12" /><line x1="16" y1="22" x2="10" y2="28" /><line x1="24" y1="22" x2="30" y2="28" /></svg>;
    case "signal": return <svg {...props}><rect x="4" y="28" width="4" height="8" /><rect x="12" y="22" width="4" height="14" /><rect x="20" y="16" width="4" height="20" /><rect x="28" y="10" width="4" height="26" /><path d="M4 8 L36 8" strokeDasharray="2 3" opacity="0.4" /></svg>;
    case "diamond": return <svg {...props}><path d="M20 4 L36 20 L20 36 L4 20 Z" /><path d="M20 12 L28 20 L20 28 L12 20 Z" opacity="0.5" /></svg>;
    case "grid": return <svg {...props}><rect x="4" y="4" width="14" height="14" /><rect x="22" y="4" width="14" height="14" /><rect x="4" y="22" width="14" height="14" /><rect x="22" y="22" width="14" height="14" /></svg>;
    case "play": return <svg {...props}><circle cx="20" cy="20" r="15" /><path d="M16 12 L30 20 L16 28 Z" /></svg>;
    case "flow": return <svg {...props}><circle cx="8" cy="20" r="4" /><circle cx="32" cy="12" r="4" /><circle cx="32" cy="28" r="4" /><path d="M12 20 C18 20 24 12 28 12" /><path d="M12 20 C18 20 24 28 28 28" /></svg>;
    case "chart": return <svg {...props}><polyline points="4,32 12,24 20,28 28,14 36,8" /><circle cx="12" cy="24" r="2" /><circle cx="20" cy="28" r="2" /><circle cx="28" cy="14" r="2" /><circle cx="36" cy="8" r="2" /></svg>;
    case "nodes": return <svg {...props}><circle cx="20" cy="20" r="4" /><circle cx="8" cy="8" r="3" /><circle cx="32" cy="8" r="3" /><circle cx="8" cy="32" r="3" /><circle cx="32" cy="32" r="3" /><line x1="17" y1="17" x2="10" y2="10" /><line x1="23" y1="17" x2="30" y2="10" /><line x1="17" y1="23" x2="10" y2="30" /><line x1="23" y1="23" x2="30" y2="30" /><line x1="8" y1="11" x2="8" y2="29" opacity="0.3" /><line x1="32" y1="11" x2="32" y2="29" opacity="0.3" /></svg>;
    default: return null;
  }
}

/* ────────────────────────────────────────────────────────────────────
   SERVICE CATALOGUE — AI-Native + AI-Accelerated Traditional
   ──────────────────────────────────────────────────────────────────── */

const aiNative = [
  {
    num: "01",
    title: "Generative Engine Optimization",
    short: "Engineer the probability that AI systems cite you as the answer.",
    body: "AI Citation Share tracking, answer-capsule content, editorial signal engineering across ChatGPT, Perplexity, Google AI Mode, and Gemini. We measure and move the metric that determines whether AI recommends you — or your competitor.",
    aiEdge: "Weekly automated probes across all four engines using your category prompt set. Dashboard is yours. Data lives on your side. Every claim reproducible.",
    proof: "Monkspaces — zero mentions to first recommendation in co-living category. Six months.",
    diagram: "citation",
  },
  {
    num: "02",
    title: "AI Visibility Architecture",
    short: "Make your brand machine-readable at 3am when no human is watching.",
    body: "Schema markup, llms.txt deployment, knowledge-graph mapping, entity definition, structured data across your entire digital presence. The infrastructure layer that makes every other service compound faster.",
    aiEdge: "Our schema linter audits 2,000 URLs in 90 seconds against the entity graph we build for your category. Same audit manually: three weeks, one analyst.",
    proof: "Deployed across every client engagement since 2023. Foundation of all GEO work.",
    diagram: "signal",
  },
  {
    num: "03",
    title: "Agentic Systems & SDK Development",
    short: "Software that replaces manual workflows and earns its cost back in month one.",
    body: "Custom AI agents, dynamic pricing engines, ChatGPT and Gemini SDK integrations, internal copilots. Your stack, your code, transferred on handover. These aren't experiments — they're production systems running today.",
    aiEdge: "We build what we use. Every agent we ship to clients runs the same architecture as the tools inside our own pod.",
    proof: "ChargeZone — dynamic pricing across 13,000 charge points, 6 weeks. Pickyourtrail — itinerary copilot, 70% of pre-sales.",
    diagram: "agent",
  },
  {
    num: "04",
    title: "AI Citation Authority Engineering",
    short: "Build the signal layer that makes AI engines default to your brand.",
    body: "Editorial placement engineering, citation-worthy content architecture, authority signal development, AI-optimized PR. Not traditional link building — structured authority that AI systems weight when choosing which brand to recommend.",
    aiEdge: "We track citation velocity weekly. When a competitor gets cited and you don't, the model weights shift. We reverse-engineer what triggers those shifts and build accordingly.",
    proof: "Rajasthan Tourism — AI citation authority across ChatGPT, Perplexity, Google AI Mode.",
    diagram: "convergence",
  },
];

const aiAccelerated = [
  {
    num: "05",
    title: "SEO & Content Infrastructure",
    short: "Technical SEO and programmatic content — AI builds the first draft, humans ship the final one.",
    body: "Technical audits, site architecture, programmatic content pipelines, CMS infrastructure, internal linking systems. AI generates at scale; our editors verify, fact-check, and ship.",
    aiEdge: "AI-powered content pipelines produce 10x the output of manual teams. Every piece passes through fact-check, schema injection, and entity alignment before publish.",
    icon: "graph",
  },
  {
    num: "06",
    title: "Performance Media & Paid Acquisition",
    short: "Google, Meta, LinkedIn — AI-optimized bidding, creative, and attribution.",
    body: "Paid search, social advertising, programmatic display, retargeting. AI handles bid optimization, creative testing at scale, and real-time budget reallocation across channels.",
    aiEdge: "AI creative generation produces 50+ ad variants per brief. Automated bid scripts react to conversion signals in real-time, not next-day.",
    icon: "signal",
  },
  {
    num: "07",
    title: "Brand Strategy & Identity",
    short: "Positioning, naming, and visual systems — researched by AI, decided by humans.",
    body: "Category positioning, brand architecture, naming, visual identity systems, brand guidelines. AI accelerates competitive research, naming exploration, and positioning validation — but the strategic decisions are human.",
    aiEdge: "AI-powered category analysis maps competitor positioning across 200+ signals in hours, not weeks. Naming exploration generates and tests thousands of options before shortlisting.",
    icon: "diamond",
  },
  {
    num: "08",
    title: "Web & Product Design",
    short: "Sites, apps, and landing systems — designed for conversion and AI crawlability.",
    body: "Marketing sites, product interfaces, landing page systems, conversion infrastructure. Every build is structured for both human visitors and AI crawlers from day one.",
    aiEdge: "AI-generated wireframes, copy variants, and component libraries accelerate design sprints. Every page ships with structured data baked in — not bolted on.",
    icon: "grid",
  },
  {
    num: "09",
    title: "Content & Creative Production",
    short: "Video, editorial, social — AI produces the volume, humans ensure the quality.",
    body: "Video production, editorial content, social creative, campaign assets. AI handles the production volume that previously required ten-person teams. Human creative directors maintain the bar.",
    aiEdge: "AI-assisted editing, scripting, and asset generation. A three-person creative team now outputs what ten did in 2022. Same quality. Ten times the volume.",
    icon: "play",
  },
  {
    num: "10",
    title: "Marketing Automation & CRM",
    short: "Pipelines, nurture sequences, and lead scoring — with AI enrichment at every stage.",
    body: "HubSpot, Salesforce, custom CRM pipelines. Nurture sequences, lead scoring, lifecycle automation. AI enriches every contact, scores intent in real-time, and triggers actions humans would miss.",
    aiEdge: "AI-powered lead scoring that updates in real-time based on intent signals. Automated pipeline management that knows when to push and when to wait.",
    icon: "flow",
  },
  {
    num: "11",
    title: "Analytics, Attribution & Dashboarding",
    short: "Measurement infrastructure that tells you what's working — before you have to ask.",
    body: "Custom dashboards, multi-touch attribution, real-time reporting infrastructure. Built for decision-makers who need clarity, not data analysts who need complexity.",
    aiEdge: "AI-generated insights surface anomalies, opportunities, and risks automatically. Weekly reporting that writes itself — humans validate and annotate.",
    icon: "chart",
  },
  {
    num: "12",
    title: "Social Media & Community",
    short: "Organic social and community — AI handles the cadence, humans handle the voice.",
    body: "Social strategy, content calendars, community management, reputation monitoring. AI maintains posting cadence and monitors sentiment; humans craft the voice and handle the conversations that matter.",
    aiEdge: "AI sentiment analysis across all channels in real-time. Automated content scheduling with AI-optimized timing. Human intervention only where it adds value.",
    icon: "nodes",
  },
];

export function ServicesContent() {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [railP, setRailP] = useState(0);

  useEffect(() => {
    const els = stageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: { idx: number; dist: number } | null = null;
        const vc = window.innerHeight / 2;
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const idx = els.indexOf(e.target as HTMLDivElement);
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - vc);
          if (best === null || dist < best.dist) best = { idx, dist };
        });
        if (best !== null) setActive((best as { idx: number; dist: number }).idx);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = vh + r.height;
        const traveled = vh - r.top;
        setRailP(Math.max(0, Math.min(1, traveled / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ticks = aiNative.map((p) => p.num);
  const diagrams = ["citation", "citation", "agent", "signal"];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="chapter container-edge" style={{ paddingTop: 180 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Services · the full system</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "20ch" }}>
            <ScrambleHeadline as="span" text="Every discipline." triggerOnView accent={false} duration={550} /><br />
            <span style={{ color: "var(--fg-muted)" }}>AI-accelerated.</span>
          </h1>
          <p className="lead" style={{ marginTop: 40, maxWidth: "52ch" }}>
            Everything a world-class agency does — plus everything they can't. Every service runs through AI infrastructure we built in-house. Same deliverables. Fraction of the time. No silos between teams because there's one team.
          </p>
        </Reveal>
      </section>

      {/* ─── AI-NATIVE SERVICES (scroll rail) ─── */}
      <section className="chapter srv-rail-section hairline-top">
        <div className="container-edge" style={{ marginBottom: 56 }}>
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">Tier 1 · AI-native — what we pioneered</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "22ch" }}>
              Services no traditional agency offers.{" "}
              <span style={{ color: "var(--fg-muted)" }}>Because they didn't build the infrastructure.</span>
            </h2>
          </Reveal>
        </div>

        <div className="srv-rail" ref={railRef}>
          <aside className="srv-rail-spine" aria-hidden>
            <span className="srv-spine-line">
              <span className="srv-spine-fill" style={{ height: `${railP * 100}%` }} />
            </span>
            {ticks.map((label, i) => (
              <span
                key={i}
                className="srv-spine-tick"
                data-active={active === i ? "true" : undefined}
                style={{ top: `${(i / (ticks.length - 1)) * 96 + 2}%` }}
              >
                <span className="mono">{label}</span>
              </span>
            ))}
          </aside>

          <aside className="srv-rail-canvas" aria-hidden data-scroll-progress={railP}>
            <div className="srv-scene" data-on={active === 0 ? "true" : undefined}><CitationPulse /></div>
            <div className="srv-scene" data-on={active === 1 ? "true" : undefined}><BrandSignalGraph /></div>
            <div className="srv-scene" data-on={active === 2 ? "true" : undefined}><AgentLoop /></div>
            <div className="srv-scene" data-on={active === 3 ? "true" : undefined}><ConvergenceNode /></div>
          </aside>

          <div className="srv-rail-body">
            {aiNative.map((p, i) => (
              <div
                key={p.num}
                className="srv-stage"
                ref={(el) => { stageRefs.current[i] = el; }}
                data-stage={i}
              >
                <div className="srv-stage-mobile-diagram" aria-hidden>
                  {p.diagram === "citation" && <CitationPulse />}
                  {p.diagram === "signal" && <BrandSignalGraph />}
                  {p.diagram === "agent" && <AgentLoop />}
                  {p.diagram === "convergence" && <ConvergenceNode />}
                </div>
                <Reveal>
                  <div className="srv-stage-head">
                    <span className="mono srv-stage-num">{p.num}</span>
                    <h3 className="display display-md srv-stage-title">{p.title}</h3>
                  </div>
                  <p className="lead srv-stage-short">{p.short}</p>
                  <p className="srv-stage-body">{p.body}</p>
                  <div className="srv-stage-bnb">
                    <span className="mono srv-stage-bnb-label">The AI edge</span>
                    <p>{p.aiEdge}</p>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg-muted)", borderTop: "1px solid var(--hairline)", paddingTop: 14, marginTop: 18 }}>
                    <span className="mono" style={{ color: "var(--accent)", marginRight: 8, fontSize: 10 }}>PROOF</span>
                    {p.proof}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI-ACCELERATED TRADITIONAL ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Tier 2 · AI-accelerated — traditional, reimagined</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "24ch", marginBottom: 24 }}>
            Every discipline you'd expect from a top agency.{" "}
            <span style={{ color: "var(--fg-muted)" }}>Done in a fraction of the time.</span>
          </h2>
          <p className="lead" style={{ marginBottom: 64, maxWidth: "52ch" }}>
            The same services — SEO, paid, brand, creative, web, analytics — but each one runs through AI tooling we built ourselves. The result: what takes a 30-person agency a quarter, we ship in weeks.
          </p>
        </Reveal>

        <div className="services-grid">
          {aiAccelerated.map((s, i) => (
            <Reveal key={s.num} delay={i * 60} className="service-card">
              <div className="service-card-head">
                <ServiceIcon type={s.icon} />
                <div className="mono" style={{ color: "var(--accent)" }}>{s.num}</div>
              </div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-short">{s.short}</p>
              <p className="service-card-body">{s.body}</p>
              <div className="service-card-edge">
                <span className="mono" style={{ color: "var(--accent)", fontSize: 10, marginRight: 8 }}>AI EDGE</span>
                {s.aiEdge}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CONVERGENCE ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">One system</span>
          </div>
          <h2 className="display display-lg" style={{ maxWidth: "18ch", marginBottom: 32 }}>
            Twelve disciplines.{" "}
            <span style={{ color: "var(--fg-muted)" }}>One pod. One operating system.</span>
          </h2>
          <p className="lead" style={{ maxWidth: "52ch", marginBottom: 48 }}>
            Not twelve retainers. Not twelve teams. One five-person pod with AI agents running every discipline as a single integrated system. The SEO informs the GEO. The brand informs the content. The agents automate what used to require headcount. Everything compounds because nothing is siloed.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Link href="/how-we-work" className="btn-ghost" data-cursor="hover">See how we work →</Link>
            <Link href="/contact" className="btn-primary" data-cursor="hover">Start Iteration 01 →</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
