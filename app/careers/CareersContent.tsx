"use client";

import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ScrambleCycler } from "@/components/site/ScrambleCycler";
import { PodOrbit } from "@/components/site/three/LineArt";
import { submitCareerForm, type CareerSubmitResult } from "./actions";

const disciplines = [
  { label: "Design & Brand", desc: "UI/UX, brand identity, motion, visual systems" },
  { label: "Engineering & AI", desc: "Full-stack, AI systems, infrastructure, SDK development" },
  { label: "Growth & Performance", desc: "Paid media, SEO, analytics, conversion optimization" },
  { label: "Content & Editorial", desc: "Writers, video, social content, editorial strategy" },
  { label: "Vertical Specialists", desc: "Industry expertise: energy, travel, aviation, healthcare, D2C" },
];

export function CareersContent() {
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverErr, setServerErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerErr(null);
    setErrors({});
    setState("submitting");
    const formData = new FormData(e.currentTarget);
    const result: CareerSubmitResult = await submitCareerForm(formData);
    if (result.success) {
      setState("ok");
    } else {
      if (result.errors) { setErrors(result.errors); setState("idle"); }
      else { setServerErr(result.serverError ?? "Something went wrong."); setState("err"); }
    }
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="chapter container-edge" style={{ paddingTop: 180, position: "relative", overflow: "hidden" }}>
        <div className="three-bg three-bg-right" style={{ opacity: 0.3 }}><PodOrbit /></div>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Careers · join the network</span>
          </div>
          <h1 className="display display-2xl hero-headline">
            <ScrambleCycler
              phrases={["Join the network.", "Do the best work.", "Compound your craft."]}
              scrambleMs={520}
              holdMs={900}
            />
          </h1>
          <p className="lead" style={{ marginTop: 36, maxWidth: "52ch", position: "relative", zIndex: 2 }}>
            Iterate operates as a network — not a traditional agency with desks and departments. We work with 80+ specialists across five disciplines, each bringing deep expertise to client engagements on a project basis.
          </p>
        </Reveal>
      </section>

      {/* ─── WHAT IT MEANS ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">What working with Iterate looks like</span>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, maxWidth: 1100 }}>
          <Reveal>
            <h3 className="pillar-title">Project-based, not employment.</h3>
            <p className="lead">You work on specific engagements that match your expertise. No bench time. No busywork. When you're on, you're doing the best work of your career. When you're not, you're free.</p>
          </Reveal>
          <Reveal delay={120}>
            <h3 className="pillar-title">High bar, high context.</h3>
            <p className="lead">Every person in the network works within our operating system — our tooling, our processes, our quality standard. You get context that freelancers never get and autonomy that employees never get.</p>
          </Reveal>
          <Reveal delay={240}>
            <h3 className="pillar-title">AI-native from day one.</h3>
            <p className="lead">Every discipline here uses AI infrastructure we built ourselves. You'll work faster, produce more, and focus on the decisions that actually require human judgment.</p>
          </Reveal>
        </div>
      </section>

      {/* ─── DISCIPLINES ─── */}
      <section className="chapter container-edge hairline-top" style={{ background: "var(--bg-deep)" }}>
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Disciplines we're always looking for</span>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {disciplines.map((d, i) => (
            <Reveal key={d.label} delay={i * 80} className="service-card">
              <div className="mono" style={{ color: "var(--accent)", marginBottom: 8, fontSize: 11 }}>{d.label}</div>
              <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6 }}>{d.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section className="chapter container-edge hairline-top">
        <Reveal>
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Apply</span>
          </div>
          <h2 className="display display-md" style={{ maxWidth: "18ch", marginBottom: 48 }}>
            Show us what you've built.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ maxWidth: 640 }}>
            {state === "ok" ? (
              <div>
                <span className="mono" style={{ color: "var(--accent)" }}>Application received</span>
                <h3 className="display display-md" style={{ marginTop: 18 }}>We'll be in touch.</h3>
                <p className="lead" style={{ marginTop: 18 }}>If there's a fit, you'll hear from us within a week.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="field"><label>Your name</label><input name="name" placeholder="Jane Doe" autoComplete="name" />{errors.name && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.name}</span>}</div>
                <div className="field"><label>Email</label><input name="email" type="email" placeholder="jane@example.com" autoComplete="email" />{errors.email && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.email}</span>}</div>
                <div className="field">
                  <label>Discipline</label>
                  <select name="role" defaultValue="" style={{ background: "transparent", color: "var(--fg)" }}>
                    <option value="" style={{ background: "#0b0f15" }}>Select a discipline</option>
                    <option value="design" style={{ background: "#0b0f15" }}>Design & Brand</option>
                    <option value="engineering" style={{ background: "#0b0f15" }}>Engineering & AI</option>
                    <option value="growth" style={{ background: "#0b0f15" }}>Growth & Performance</option>
                    <option value="content" style={{ background: "#0b0f15" }}>Content & Editorial</option>
                    <option value="specialist" style={{ background: "#0b0f15" }}>Vertical Specialist</option>
                  </select>
                  {errors.role && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.role}</span>}
                </div>
                <div className="field"><label>Portfolio / LinkedIn / GitHub</label><input name="portfolio" placeholder="https://..." /></div>
                <div className="field">
                  <label>Why Iterate? What have you built?</label>
                  <textarea name="message" rows={5} placeholder="Tell us about the work you're most proud of." />
                  {errors.message && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.message}</span>}
                </div>
                <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 24 }}>
                  <button type="submit" className="btn-primary" disabled={state === "submitting"} data-cursor="hover">
                    {state === "submitting" ? "Sending…" : "Apply →"}
                  </button>
                  {serverErr && <span style={{ color: "var(--accent)", fontSize: 12 }}>{serverErr}</span>}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
