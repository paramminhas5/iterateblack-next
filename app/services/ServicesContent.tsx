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


const pillars = [
  {
    num: "01",
    title: "B2B Core — SEO, SEM & Content Infrastructure",
    short: "Be the answer the agent picks — and the page the agent can parse.",
    body:
      "Technical SEO, programmatic content, schema, llms.txt, entity mapping, paid. One operating system across Google, Perplexity, ChatGPT, Gemini.",
    builtNotBought:
      "Our schema linter checks every page against the entity graph we've built for your category — generic SEO tools can't. Programmatic content is generated through a pipeline we own end-to-end: brief → draft → fact-check → schema → publish, with a human editor in the loop on every batch.",
    deliverables: [
      "Technical + on-page SEO",
      "Programmatic content + CMS architecture",
      "Schema, llms.txt, entity graph",
      "Paid acquisition (Google, Meta, LinkedIn)",
      "Attribution + dashboarding",
    ],
    proof: "Pickyourtrail · Noida International Airport",
    diagram: "citation",
  },
  {
    num: "02",
    title: "Brand Validation & GEO",
    short: "Quantify what was previously vibes.",
    body:
      "GEO, AI citation share, social mention, PR impact. Brand as a metric the CFO will defend.",
    builtNotBought:
      "We run weekly probes across ChatGPT, Perplexity, Gemini and Google AI Mode using your category prompt set — not a vendor's. The dashboard is yours, the data lives on your side, and every claim is reproducible.",
    deliverables: [
      "AI Citation Share tracking",
      "Brand impact scoring (8/10 vs 5/10 model)",
      "Social mention + sentiment system",
      "PR & editorial signal engineering",
      "Quarterly brand health reporting",
    ],
    proof: "BILLIONE · Rajasthan Tourism · Monkspaces",
    diagram: "signal",
  },
  {
    num: "03",
    title: "Agentic Systems & SDK Development",
    short: "Software that earns its retainer back in the first month.",
    body:
      "Custom agents, pricing engines, ChatGPT and Gemini SDKs — the same kind we run inside the pod. Your stack, your code, transferred on handover.",
    builtNotBought:
      "Agents we've shipped to production this year: dynamic EV pricing across 13,000 charge points (ChargeZone), an itinerary copilot that handles 70% of pre-sales (Pickyourtrail), an occupancy-routing agent for a 700-room portfolio (Monkspaces). None of them write blog posts.",
    deliverables: [
      "Custom AI agents (ops, sales, support)",
      "Dynamic pricing + revenue engines",
      "ChatGPT / Gemini SDK integrations",
      "Internal copilots wired into your stack",
      "Build → own → operate handover",
    ],
    proof: "ChargeZone · Coliwoo",
    diagram: "agent",
  },
];

const entryPoints = [
  ["Iteration 01 — Foundation", "Cloud ecosystem setup. Data security, AI tooling, reporting infrastructure, skills transfer. Three weeks. The foundation that makes everything after it compound."],
  ["Iterations 02+ — Full System", "The full pod, permanently assigned. GEO, SEO, agentic systems, brand strategy, performance media — built as one integrated system, not a menu of services. Monthly retainer."],
];

export function ServicesContent() {
  // Active stage index: 0..2 for pillars, 3 for convergence
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

  const ticks = [...pillars.map((p) => p.num), "↘"];
  const activeProof = active < pillars.length ? pillars[active].proof : "Three disciplines · one outcome";

  return (
    <>
      <section className="chapter container-edge" style={{ paddingTop: 180 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Services · the operating system</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "18ch" }}>
            <ScrambleHeadline as="span" text="Three disciplines." triggerOnView accent={false} duration={550} /><br />
            <span style={{ color: "var(--fg-muted)" }}>One compounding system.</span>
          </h1>
          <p className="lead" style={{ marginTop: 40, maxWidth: "48ch" }}>
            One team. One number. No handoffs between the brand team, the tech team, and the media team — because it's the same team.
          </p>
        </Reveal>
      </section>

      {/* ─── One rail. Sticky canvas cross-fades through 4 scenes as you scroll. ─── */}
      <section className="chapter srv-rail-section">
        <div className="srv-rail" ref={railRef}>
          {/* Left spine (desktop only) */}
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

          {/* Sticky right canvas — 4 stacked diagram layers, opacity-driven */}
          <aside className="srv-rail-canvas" aria-hidden>
            <div className="srv-scene" data-on={active === 0 ? "true" : undefined}><CitationPulse /></div>
            <div className="srv-scene" data-on={active === 1 ? "true" : undefined}><BrandSignalGraph /></div>
            <div className="srv-scene" data-on={active === 2 ? "true" : undefined}><AgentLoop /></div>
            <div className="srv-scene" data-on={active === 3 ? "true" : undefined}><ConvergenceNode /></div>
            <div className="srv-scene-caption mono" key={activeProof}>{activeProof}</div>
          </aside>

          {/* Copy column */}
          <div className="srv-rail-body">
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className="srv-stage"
                ref={(el) => { stageRefs.current[i] = el; }}
                data-stage={i}
              >
                {/* Mobile-only inline diagram, sits above copy */}
                <div className="srv-stage-mobile-diagram" aria-hidden>
                  {p.diagram === "citation" && <CitationPulse />}
                  {p.diagram === "signal" && <BrandSignalGraph />}
                  {p.diagram === "agent" && <AgentLoop />}
                </div>
                <Reveal>
                  <div className="srv-stage-head">
                    <span className="mono srv-stage-num">{p.num}</span>
                    <h2 className="display display-md srv-stage-title">{p.title}</h2>
                  </div>
                  <p className="lead srv-stage-short">{p.short}</p>
                  <p className="srv-stage-body">{p.body}</p>
                  <div className="srv-stage-bnb">
                    <span className="mono srv-stage-bnb-label">Client proof</span>
                    <p>{p.builtNotBought}</p>
                  </div>
                  <span className="mono srv-stage-del-label">Deliverables</span>
                  <ul className="srv-stage-del">
                    {p.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}

            {/* Convergence stage — the visual closer */}
            <div
              className="srv-stage srv-stage-converge"
              ref={(el) => { stageRefs.current[3] = el; }}
              data-stage={3}
            >
              <div className="srv-stage-mobile-diagram" aria-hidden>
                <ConvergenceNode />
              </div>
              <Reveal>
                <div className="srv-stage-head">
                  <span className="mono srv-stage-num">↘</span>
                  <h2 className="display display-md srv-stage-title">
                    Three disciplines.<br />
                    <span style={{ color: "var(--fg-muted)" }}>One pod. One outcome.</span>
                  </h2>
                </div>
                <p className="lead srv-stage-short">
                  Not three retainers. One operating system, deployed by one team, accountable to one number.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 56 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Entry points</span>
          </div>
        </Reveal>
        <div className="entry-points">
          {entryPoints.map(([head, body], i) => (
            <Reveal key={head} delay={i * 140} className="entry-card">
              <div className="mono" style={{ color: "var(--accent)", marginBottom: 14 }}>{head}</div>
              <p className="lead" style={{ color: "var(--fg)" }}>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <span className="tick tick-lg" />
            <div>
              <h2 className="display display-lg" style={{ marginBottom: 32, maxWidth: "18ch" }}>
                Tell us what winning looks like in your category.
              </h2>
              <Link href="/contact" className="btn-primary" data-cursor="hover">Start Iteration 01 →</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
