"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleHeadline } from "@/components/site/ScrambleHeadline";

const team = [
  {
    name: "Param Minhas",
    role: "Founder & Director",
    bio: "Built Iterate in 2014 when the gap between what agencies delivered and what operators needed became untenable. Eleven years of building marketing infrastructure across energy, aviation, travel, hospitality, and SaaS. Believes the best marketing is indistinguishable from product.",
    link: "https://paramminhas.com",
    linkLabel: "paramminhas.com",
  },
  {
    name: "Arjun Mehta",
    role: "Head of Strategy",
    bio: "Twelve years in brand and category strategy — from FMCG to B2B SaaS. Responsible for positioning, GTM architecture, and the narrative layer that makes everything else stick. Thinks in market gaps, not campaign briefs.",
    link: null,
    linkLabel: null,
  },
  {
    name: "Rohan Kapoor",
    role: "Head of Engineering",
    bio: "Full-stack engineer turned AI systems architect. Built the dynamic pricing engine for ChargeZone, the itinerary copilot for Pickyourtrail, and the occupancy router for Monkspaces. Owns every line of production code we ship.",
    link: null,
    linkLabel: null,
  },
  {
    name: "Priya Sharma",
    role: "Head of GEO & AI Visibility",
    bio: "Eight years in SEO, the last three pioneering generative engine optimization before the industry had a name for it. Runs the probe systems, citation tracking, and editorial signal engineering across every client engagement.",
    link: null,
    linkLabel: null,
  },
];

const tenets = [
  {
    num: "01",
    title: "Iteration is the only honest deliverable.",
    body: "A launch is a hypothesis. The real result comes from weeks two through twenty — the compounding effect of testing, measuring, and adjusting faster than the category moves.",
  },
  {
    num: "02",
    title: "AI compresses time. We deliver the compressed result.",
    body: "Six weeks for a pricing engine. Eight weeks for a copilot. Five weeks for an occupancy router. These aren't outliers — they're what happens when a pod uses AI as core infrastructure, not a bolt-on tool.",
  },
  {
    num: "03",
    title: "You own the engine. Always.",
    body: "Every system is documented end-to-end with handover to your team. The code lives on your infrastructure. The data lives in your stack. No dependency on our continued involvement to keep the lights on.",
  },
  {
    num: "04",
    title: "Brand is a measurable metric — not a vibe.",
    body: "We probe AI engines weekly with your category prompt set. We track AI Citation Share. If a CFO asks you to justify the brand budget, you should be able to answer in a single sentence.",
  },
  {
    num: "05",
    title: "Quiet over loud — always.",
    body: "We don't post case studies for social proof. We post them when the results are worth the reader's time. Our business grows through referrals and the work itself.",
  },
];

export function AboutContent() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="chapter container-edge" style={{ paddingTop: 180 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">About · est. 2014</span>
          </div>
          <h1 className="display display-xl" style={{ maxWidth: "20ch" }}>
            <ScrambleHeadline as="span" text="Built by operators." triggerOnView accent={false} duration={650} /><br />
            <span style={{ color: "var(--fg-muted)" }}>Not by a holding company.</span>
          </h1>
        </Reveal>
      </section>

      {/* ─── WHY WE EXIST ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">01 · Why Iterate exists</span>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, maxWidth: 1100 }}>
          <Reveal>
            <p className="lead" style={{ fontSize: 20, lineHeight: 1.55, color: "var(--fg)" }}>
              In 2014, the gap between what marketing agencies delivered and what founders actually needed was already obvious. Agencies sold campaigns. Founders needed infrastructure — systems that compound, code that runs, metrics that move revenue.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ fontSize: 18 }}>
              Then AI changed the landscape entirely. By 2024, buying decisions started flowing through AI intermediaries — ChatGPT, Perplexity, Gemini. The brands winning weren't the loudest. They were the most structured. The ones that built citation authority and entity clarity before anyone else thought to.
            </p>
            <p className="lead" style={{ marginTop: 24, color: "var(--fg)" }}>
              Iterate exists because no agency was building for this future. So we built the agency ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── THE THESIS ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">02 · The thesis</span>
          </div>
          <h2 className="display display-lg" style={{ maxWidth: "20ch", marginBottom: 40 }}>
            <ScrambleHeadline
              as="span"
              text="An AI is choosing your category winner. Right now."
              triggerOnView
              accent={false}
              duration={900}
            />
          </h2>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: 22 }}>
            That AI doesn't read your ads, your Instagram presence, or your agency's monthly report. It reads your structured data, your citation authority, and the clarity of your entity definition across the web.
          </p>
          <p className="lead" style={{ maxWidth: "60ch", marginBottom: 22, color: "var(--fg-muted)" }}>
            The brand that built those signals first is the one it defaults to. Not because it's better. Because it was ready. And once an AI has a default answer for a category, dislodging it requires sustained infrastructure — not a campaign.
          </p>
          <p className="lead" style={{ maxWidth: "60ch", color: "var(--fg)" }}>
            90% of B2B buying will flow through AI-agent intermediaries by 2028 (Gartner). The gap between brands structured for this and those that aren't compounds weekly. We built Iterate to put our clients on the right side of that gap.
          </p>
        </Reveal>
      </section>

      {/* ─── THE TEAM ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">03 · The team</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "20ch", marginBottom: 16 }}>
            Four people who run the studio.{" "}
            <span style={{ color: "var(--fg-muted)" }}>Plus the agents they built.</span>
          </h2>
          <p className="lead" style={{ maxWidth: "52ch" }}>
            No middle management. No account executives. No departments. Four operators who've each spent a decade building what most agencies outsource.
          </p>
        </Reveal>

        <div className="team-grid">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="team-card">
              <div className="team-card-role">{t.role}</div>
              <div className="team-card-name">{t.name}</div>
              <p className="team-card-bio">{t.bio}</p>
              {t.link && (
                <a href={t.link} target="_blank" rel="noopener noreferrer" className="team-card-link" data-cursor="hover">
                  {t.linkLabel} →
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── OPERATING TENETS ─── */}
      <section className="chapter hairline-top" style={{ background: "var(--bg-deep)" }}>
        <div className="container-edge">
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 56 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">04 · How we think</span>
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

      {/* ─── CTA ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <span className="tick tick-lg" />
            <div>
              <h2 className="display display-lg" style={{ marginBottom: 32, maxWidth: "18ch" }}>
                Now you know who we are. Let's talk about your category.
              </h2>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-primary" data-cursor="hover">Start a conversation →</Link>
                <Link href="/how-we-work" className="btn-ghost" data-cursor="hover">See how we work →</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
