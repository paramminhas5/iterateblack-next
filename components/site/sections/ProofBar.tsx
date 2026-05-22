"use client";

import { ScrambleNumber } from "@/components/site/ScrambleNumber";

const stats = [
  { value: "90%", label: "Of B2B buying will be AI-agent intermediated by 2028.", src: "Gartner, 2025" },
  { value: "$15T", label: "B2B spend flowing through AI agent exchanges by 2028.", src: "Gartner, 2025" },
  { value: "5×", label: "Conversion from AI-referred traffic vs. Google.", src: "Rankscience, 2025" },
  { value: "12%", label: "Of brands have any AI visibility strategy.", src: "GenOptima, 2026" },
];

export function ProofBar() {
  return (
    <section className="proof-bar hairline-top hairline-bottom">
      {stats.map((s, i) => (
        <div key={i} className="proof-cell" title={`Source: ${s.src}`}>
          <div className="proof-num"><ScrambleNumber value={s.value} /></div>
          <div className="proof-label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}

