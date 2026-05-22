"use client";

export function ScarcityBar() {
  return (
    <div className="scarcity-bar container-edge">
      <span className="mono">
        Currently running <span style={{ color: "var(--fg)" }}>6 active iterations.</span>{" "}
        <span style={{ color: "var(--accent)" }}>2 client slots open for Q3 2026.</span>
      </span>
      <span className="scarcity-dots" aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={`scarcity-dot ${i < 6 ? "filled" : ""}`} />
        ))}
      </span>
    </div>
  );
}
