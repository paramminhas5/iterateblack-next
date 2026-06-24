"use client";

import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleCycler } from "@/components/site/ScrambleCycler";
import { ItineraryMesh } from "@/components/site/three/LineArt";

const heads = [
  {
    name: "Arjun Mehta",
    role: "Head of B2B",
    bio: "Fifteen years in enterprise infrastructure, operational AI, and B2B go-to-market. Owns every engagement where the output is a system that runs — pricing engines, operations platforms, demand infrastructure.",
  },
  {
    name: "Priya Sharma",
    role: "Head of B2C",
    bio: "Twelve years in consumer brand, demand systems, and conversion infrastructure. Owns every engagement where the output is category dominance — AI visibility, brand authority, performance systems.",
  },
  {
    name: "Rohan Kapoor",
    role: "Head of AI & Engineering",
    bio: "Full-stack engineer turned AI systems architect. Built the dynamic pricing engine for ChargeZone, the itinerary copilot for Pickyourtrail, and the occupancy router for Monkspaces. Owns every line of production code we ship.",
  },
];

const tenets = [
  { num: "01", title: "Iteration is the only honest deliverable.", body: "A launch is a hypothesis. The real result comes from weeks two through twenty — the compounding effect of testing, measuring, and adjusting faster than the category moves." },
  { num: "02", title: "AI compresses time. We deliver the compressed result.", body: "Six weeks for a pricing engine. Eight weeks for a copilot. Five weeks for an occupancy router. These aren't outliers — they're what happens when a pod uses AI as core infrastructure, not a bolt-on tool." },
  { num: "03", title: "You own the engine. Always.", body: "Every system is documented end-to-end with handover to your team. The code lives on your infrastructure. The data lives in your stack. No dependency on our continued involvement." },
  { num: "04", title: "Brand is a measurable metric — not a vibe.", body: "We probe AI engines weekly with your category prompt set. We track AI Citation Share. If a CFO asks you to justify the brand budget, you should be able to answer in a single sentence." },
  { num: "05", title: "Quiet over loud — always.", body: "We don't post case studies for social proof. We post them when the results are worth the reader's time. Our business grows through referrals and the work itself." },
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
          <h1 className="display display-2xl hero-headline">
            <ScrambleCycler
              phrases={["We build brands.", "We ship systems.", "We compound advantage."]}
              scrambleMs={520}
              holdMs={900}
            />
            <span style={{ display: "block", color: "var(--fg-muted)", marginTop: 8, fontSize: "0.38em", letterSpacing: "-0.01em", lineHeight: 1.4, fontWeight: 200 }}>
              Four leaders. Eighty specialists. One integrated network.
            </span>
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
              Then AI changed the landscape entirely. By 2024, buying decisions started flowing through AI intermediaries — ChatGPT, Perplexity, Gemini. The brands winning weren't the loudest. They were the most structured.
            </p>
            <p className="lead" style={{ marginTop: 24, color: "var(--fg)" }}>
              Iterate exists because no agency was building for this future. So we built the agency ourselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">02 · Founder</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="founder-card">
            <div className="founder-card-meta">
              <div className="team-card-role">Founder · AI, Brand, Growth, Product</div>
              <div className="founder-card-name">Param Minhas</div>
              <p className="founder-card-bio">
                Built Iterate in 2014 when the gap between what agencies delivered and what operators needed became untenable. Eleven years of building marketing infrastructure across energy, aviation, travel, hospitality, and SaaS. Sees the full picture — where brand, product, and AI systems converge into compounding advantage.
              </p>
              <a href="https://paramminhas.com" target="_blank" rel="noopener noreferrer" className="team-card-link" data-cursor="hover">
                paramminhas.com →
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── LEADERSHIP ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">03 · Leadership</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "22ch", marginBottom: 16 }}>
            Three functional heads.{" "}
            <span style={{ color: "var(--fg-muted)" }}>B2B. B2C. AI & Engineering.</span>
          </h2>
        </Reveal>

        <div className="team-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {heads.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="team-card">
              <div className="team-card-role">{t.role}</div>
              <div className="team-card-name">{t.name}</div>
              <p className="team-card-bio">{t.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── THE NETWORK (visual diagram) ─── */}
      <section className="chapter hairline-top" style={{ background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
        <div className="three-bg three-bg-full" style={{ opacity: 0.4 }}><ItineraryMesh /></div>
        <div className="container-edge" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">04 · The network</span>
            </div>
            <h2 className="display display-md" style={{ maxWidth: "22ch", marginBottom: 24 }}>
              80+ specialists.{" "}
              <span style={{ color: "var(--fg-muted)" }}>All inside the operating system.</span>
            </h2>
            <p className="lead" style={{ maxWidth: "52ch", marginBottom: 32 }}>
              Beyond the core leadership, Iterate operates with an integrated network of designers, engineers, growth specialists, performance marketers, and vertical experts. They're not freelancers on call — they work within our systems, our tooling, and our quality bar.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="network-disciplines">
              {["Design & Brand", "Growth & Performance", "Engineering & AI", "Content & Editorial", "Vertical Specialists"].map((d) => (
                <span key={d} className="network-discipline-pill">{d}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={240}>
            <Link href="/careers" className="btn-ghost" data-cursor="hover" style={{ marginTop: 40 }}>Join the network →</Link>
          </Reveal>
        </div>
      </section>

      {/* ─── OPERATING TENETS ─── */}
      <section className="chapter hairline-top">
        <div className="container-edge">
          <Reveal>
            <div style={{ display: "flex", gap: 18, marginBottom: 56 }}>
              <span className="tick" />
              <span className="eyebrow eyebrow-muted">05 · How we think</span>
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

      {/* ─── CTA ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
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
