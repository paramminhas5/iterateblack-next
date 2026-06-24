"use client";

import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    num: "01",
    label: "Iteration 01",
    timeframe: "3 weeks · one-time",
    title: "Cloud ecosystem setup",
    points: [
      "Data security + AI tooling baseline",
      "Reporting infrastructure",
      "Skills + workflow transfer to your team",
    ],
    footnote: "Three weeks. Everything after this costs less and moves faster because of it.",
  },
  {
    num: "02",
    label: "Iteration 02",
    timeframe: "Month 2 onward · monthly retainer",
    title: "Pod permanently assigned",
    points: [
      "GEO + SEO infrastructure shipped",
      "Brand, content, performance media",
      "Weekly iteration cycles, not quarterly reviews",
    ],
    footnote: "One pod replaces what agencies staff with thirty.",
  },
  {
    num: "03+",
    label: "Iteration 03 and beyond",
    timeframe: "Quarter 2 onward",
    title: "Agentic systems",
    points: [
      "Custom AI agents on your stack",
      "Dynamic pricing, copilots, SDK work",
      "Owned by your team, run with ours",
    ],
    footnote: "Where the moat actually compounds.",
  },
];

export function IterationSteps() {
  return (
    <div className="iteration-steps">
      {steps.map((s, i) => (
        <Reveal key={s.num} delay={i * 120} className="iter-step">
          <div className="iter-step-head">
            <span className="iter-num">{s.num}</span>
            <span className="iter-connector" aria-hidden />
          </div>
          <div className="iter-step-body">
            <div className="mono" style={{ color: "var(--accent)", marginBottom: 10 }}>{s.label}</div>
            <div className="iter-timeframe">{s.timeframe}</div>
            <h3 className="iter-title">{s.title}</h3>
            <ul className="iter-points">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="iter-footnote">{s.footnote}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
