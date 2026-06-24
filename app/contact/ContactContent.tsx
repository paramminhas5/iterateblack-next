"use client";

import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { RingTunnel } from "@/components/site/three/LineArt";
import { submitContactForm, type SubmitResult } from "./actions";

export function ContactContent() {
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "err">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverErr, setServerErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerErr(null);
    setErrors({});
    setState("submitting");

    const formData = new FormData(e.currentTarget);
    const result: SubmitResult = await submitContactForm(formData);

    if (result.success) {
      setState("ok");
    } else {
      if (result.errors) {
        setErrors(result.errors);
        setState("idle");
      } else {
        setServerErr(result.serverError ?? "Something went wrong.");
        setState("err");
      }
    }
  }

  return (
    <section className="contact-shell">
      <div className="three-bg three-bg-full contact-bg"><RingTunnel /></div>
      <div className="container-edge contact-inner">
        <Reveal className="contact-head">
          <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
            <span className="tick" />
            <span className="eyebrow eyebrow-muted">Start a conversation · 30 min</span>
          </div>
          <h1 className="display display-lg" style={{ maxWidth: "14ch" }}>
            Tell us where you want<br />
            <span style={{ color: "var(--fg-muted)" }}>to be the obvious choice.</span>
          </h1>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-meta">
            <span className="mono">Reach</span>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="mailto:hello@greattasteiterate.com" data-cursor="hover" style={{ fontSize: 18, fontWeight: 300 }}>hello@greattasteiterate.com</a>
              <span style={{ color: "var(--fg-muted)", fontSize: 14 }}>We reply within two business days.<br />Iterations begin within three weeks.</span>
            </div>
            <div style={{ marginTop: 56 }}>
              <span className="mono">Good fits</span>
              <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Series A+ founders with a clear commercial outcome to move", "B2B or D2C companies doing $1M+ annual revenue", "Teams that need AI infrastructure shipped in weeks, not quarters", "Briefs where compounding speed matters more than coverage"].map((x) => (
                  <li key={x} style={{ fontSize: 14, color: "var(--fg-muted)" }}>— {x}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="contact-form-card">
            {state === "ok" ? (
              <div style={{ padding: 8 }}>
                <span className="mono" style={{ color: "var(--accent)" }}>Brief received</span>
                <h2 className="display display-md" style={{ marginTop: 18 }}>We'll be in touch.</h2>
                <p className="lead" style={{ marginTop: 18 }}>Expect a reply within two business days. In the meantime, dig through <a href="/work" data-cursor="hover" style={{ borderBottom: "1px solid var(--accent)" }}>the work</a>.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label>Your name</label>
                  <input name="name" placeholder="Jane Doe" autoComplete="name" />
                  {errors.name && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.name}</span>}
                </div>
                <div className="field">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="jane@company.com" autoComplete="email" />
                  {errors.email && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.email}</span>}
                </div>
                <div className="field">
                  <label>Company</label>
                  <input name="company" placeholder="Acme Robotics" />
                </div>
                <div className="field">
                  <label>Budget range</label>
                  <select name="budget" defaultValue="" style={{ background: "transparent", color: "var(--fg)" }}>
                    <option value="" style={{ background: "#0b0f15" }}>Not sure yet</option>
                    <option value="iter01" style={{ background: "#0b0f15" }}>Iteration 01 (foundation engagement)</option>
                    <option value="4-6k" style={{ background: "#0b0f15" }}>$4–6K / month</option>
                    <option value="6-12k" style={{ background: "#0b0f15" }}>$6–12K / month</option>
                    <option value="12k+" style={{ background: "#0b0f15" }}>$12K+ / month</option>
                  </select>
                </div>
                <div className="field">
                  <label>What does winning look like for your business?</label>
                  <textarea name="message" rows={5} placeholder="A sentence or three. The more specific, the better." />
                  {errors.message && <span style={{ color: "var(--accent)", fontSize: 11 }}>{errors.message}</span>}
                </div>
                <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 24 }}>
                  <button type="submit" className="btn-primary" disabled={state === "submitting"} data-cursor="hover">
                    {state === "submitting" ? "Sending…" : "Submit →"}
                  </button>
                  {serverErr && <span style={{ color: "var(--accent)", fontSize: 12 }}>{serverErr}</span>}
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
