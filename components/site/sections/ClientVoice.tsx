"use client";

import { Reveal } from "@/components/site/Reveal";

const quotes = [
  {
    text: "Before Iterate, our brand wasn't showing up in a single AI-generated response for our category. Six months later, we're the first recommendation across ChatGPT, Perplexity, and Google AI Mode. The infrastructure they built did what three years of traditional SEO couldn't.",
    name: "VP Marketing",
    title: "B2B SaaS · Series B",
  },
  {
    text: "Three weeks from brief to a working dynamic pricing system across our entire network. We'd been quoted six months by two other agencies. The speed difference isn't marginal — it's a different category of firm.",
    name: "Operating Partner",
    title: "ChargeZone · EV infrastructure",
  },
];

export function ClientVoice() {
  return (
    <section className="chapter container-edge">
      <Reveal>
        <div style={{ display: "flex", gap: 18, marginBottom: 56 }}>
          <span className="tick" />
          <span className="eyebrow eyebrow-muted">In their words</span>
        </div>
      </Reveal>
      <div className="quotes-grid">
        {quotes.map((q, i) => (
          <Reveal key={i} delay={i * 120} className="quote-card">
            <span className="quote-mark" aria-hidden>"</span>
            <p className="quote-text">{q.text}</p>
            <div className="quote-attr">
              <span className="quote-name">{q.name}</span>
              <span className="mono">{q.title}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
