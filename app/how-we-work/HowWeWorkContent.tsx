"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";
import { ScrambleCycler } from "@/components/site/ScrambleCycler";
import { ScrambleNumber } from "@/components/site/ScrambleNumber";
import { SectionDiagram } from "@/components/site/SectionDiagram";
import { IterationSteps } from "@/components/site/sections/IterationSteps";

const podRoles = [
  {
    role: "Strategy",
    desc: "Narrative, category positioning, GTM architecture. The person who decides what we build and why.",
  },
  {
    role: "Build",
    desc: "Web, app, AI infrastructure. Ships production code. Owns the technical stack end-to-end.",
  },
  {
    role: "GEO",
    desc: "AI visibility, citation share engineering, SEO. Moves the metric that determines whether AI recommends you.",
  },
  {
    role: "Agents",
    desc: "Dynamic pricing, SDKs, internal copilots. Builds the software that replaces manual workflows.",
  },
  {
    role: "Account",
    desc: "One person. One thread back to you. No layers between you and the people doing the work.",
  },
];

const comparison: [string, string, string][] = [
  ["Team size", "20–30 people across departments", "5-person pod + custom AI agents"],
  ["Monthly investment", "$12K–$25K equivalent", "$4K–$6K"],
  ["Time to first result", "2–3 months (after onboarding)", "3 weeks"],
  ["Communication", "Weekly status calls, 3 layers deep", "Direct access to every person doing the work"],
  ["AI leverage", "Off-the-shelf tools, ad-hoc", "Custom agents built into the operating system"],
  ["Deliverable model", "Campaign → report → next campaign", "Infrastructure that compounds weekly"],
  ["What gets measured", "Impressions, clicks, reach", "AI Citation Share, revenue impact, system uptime"],
  ["Ownership", "Agency owns the platforms", "You own the code, data, and infrastructure"],
];

const weekStructure = [
  { day: "Monday", activity: "Sprint planning + priority alignment with your team" },
  { day: "Tuesday–Thursday", activity: "Build, ship, measure. Daily async updates." },
  { day: "Friday", activity: "Results review + next-week scope. No fluff, no slides." },
];

export function HowWeWorkContent() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="chapter container-edge" style={{ paddingTop: 180 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">How we work · the operating model</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "18ch" }}>
            <ScrambleCycler
              phrases={["One pod. Every discipline.", "Three weeks to first result.", "Infrastructure, not campaigns."]}
              scrambleMs={520}
              holdMs={1100}
            />
          </h1>
          <p className="lead" style={{ marginTop: 40, maxWidth: "52ch" }}>
            No account layers. No junior team padding hours. No handoffs between departments. One permanently-assigned pod runs every discipline as one integrated system — with custom AI agents handling the volume that used to require headcount.
          </p>
        </Reveal>
      </section>

      {/* ─── THE POD ─── */}
      <section className="chapter hairline-top pod-section" style={{ paddingBlock: 140 }}>
        <div className="pod-grid">
          <Reveal className="pod-copy">
            <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">01 · The pod model</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "18ch", marginBottom: 28 }}>
              Five permanent roles.{" "}
              <span style={{ color: "var(--fg-muted)" }}>Assigned to you. Not rotated.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "48ch" }}>
              Every engagement gets the same five people from day one to day three-hundred. They know your brand, your stack, your category, and your competitors. There's no onboarding tax every time a new person touches your account.
            </p>
            <p className="lead" style={{ maxWidth: "48ch", marginTop: 20, color: "var(--fg-muted)" }}>
              The cost compresses because the team is small and the tooling is ours. The quality doesn't compress because accountability has nowhere to hide.
            </p>
          </Reveal>
          <div className="pod-diagram">
            <SectionDiagram diagram="PodAgents" mode="inline" height="100%" />
          </div>
        </div>

        <div className="container-edge">
          <div className="pod-roles-grid">
            {podRoles.map((r) => (
              <Reveal key={r.role} className="pod-role-card">
                <div className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>{r.role}</div>
                <div className="pod-role-desc">{r.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WEEKLY RHYTHM ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">02 · What a week looks like</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "20ch", marginBottom: 48 }}>
            Weekly iteration cycles.{" "}
            <span style={{ color: "var(--fg-muted)" }}>Not quarterly reviews.</span>
          </h2>
        </Reveal>
        <div style={{ maxWidth: 720 }}>
          {weekStructure.map((w, i) => (
            <Reveal key={w.day} delay={i * 100} className="process-row" style={{ gridTemplateColumns: "160px 1fr" }}>
              <div className="process-num" style={{ fontSize: 13 }}>{w.day}</div>
              <p className="lead" style={{ fontSize: 16 }}>{w.activity}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <p className="lead" style={{ marginTop: 40, maxWidth: "48ch" }}>
            No monthly reports that arrive two weeks late. No quarterly business reviews that exist to justify the retainer. You see results weekly because the cycles are weekly.
          </p>
        </Reveal>
      </section>

      {/* ─── THE ITERATIONS ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">03 · The iteration model</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "20ch", marginBottom: 56 }}>
            Three phases.{" "}
            <span style={{ color: "var(--fg-muted)" }}>Each one compounds on the last.</span>
          </h2>
        </Reveal>
        <IterationSteps />
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">04 · The comparison most agencies avoid</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "18ch", marginBottom: 56 }}>
            <ScrambleHeadline as="span" text="Side by side." triggerOnView accent={false} duration={520} />{" "}
            <span style={{ color: "var(--fg-muted)" }}>No spin.</span>
          </h2>
        </Reveal>
        <Reveal>
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
      </section>

      {/* ─── NOT FOR EVERYONE ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 24 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">05 · A word on fit</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display display-md" style={{ marginBottom: 48, maxWidth: "20ch" }}>
            This model isn't for everyone.
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
              We work with a deliberately small number of clients — not because we can't scale, but because the work demands it. Every engagement gets the full pod, the full system, and the full accountability.
            </p>
            <p className="lead" style={{ marginTop: 24, color: "var(--fg)" }}>
              If you want infrastructure that compounds, we should talk.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <span className="tick tick-lg" />
            <div>
              <h2 className="display display-lg" style={{ marginBottom: 32, maxWidth: "18ch" }}>
                Tell us what winning looks like in your category.
              </h2>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary" data-cursor="hover">Start Iteration 01 →</Link>
                <Link href="/services" className="btn-ghost" data-cursor="hover">See all services →</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
