"use client";

import { useState } from "react";

const outcomes = [
  { client: "ChargeZone", result: "Dynamic pricing across 13,000 EV charge points — shipped in 6 weeks" },
  { client: "Pickyourtrail", result: "Itinerary copilot handles 70% of pre-sales volume" },
  { client: "Monkspaces", result: "Zero AI citations to first recommendation in co-living category" },
  { client: "BILLIONE", result: "Airside operations platform — PMO-acknowledged" },
  { client: "Rajasthan Tourism", result: "AI citation authority across ChatGPT, Perplexity, Google AI Mode" },
  { client: "Noida Intl Airport", result: "Brand and AI visibility infrastructure for India's newest airport" },
  { client: "Coliwoo", result: "Full demand infrastructure — brief to live in 18 days" },
];

// Duplicate for seamless loop
const items = [...outcomes, ...outcomes];

export function OutcomesTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="outcomes-ticker"
      aria-label="Client outcomes"
      role="marquee"
    >
      <button
        type="button"
        className="ticker-pause"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play ticker" : "Pause ticker"}
      >
        {paused ? "▶" : "⏸"}
      </button>
      <div
        className="outcomes-ticker-track"
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-client">{item.client}</span>
            <span className="ticker-sep">·</span>
            <span className="ticker-result">{item.result}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
