"use client";

import * as React from "react";

/**
 * Line-art client marks. SVG redraws, single-weight strokes on currentColor,
 * with one accent detail per mark. No raster, no brand-color leaks.
 * Renders at ~140x44 by default; scale via font-size on parent (uses em).
 */

type Props = { slug: string; className?: string };

const W = 140;
const H = 44;
const STROKE = 1.25;

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg
      className="client-mark"
      viewBox={`0 0 ${W} ${H}`}
      width="140"
      height="44"
      role="img"
      aria-label={label}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ACCENT = "var(--accent)";

function Chargezone() {
  return (
    <Frame label="ChargeZone">
      <circle cx="20" cy="22" r="14" />
      <path d="M22 12 L15 23 H21 L19 32 L26 21 H20 Z" stroke={ACCENT} />
      <text x="40" y="28" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">CHARGEZONE</text>
    </Frame>
  );
}

function Noida() {
  return (
    <Frame label="Noida International Airport">
      {/* runway perspective */}
      <path d="M4 36 L20 8 L24 8 L18 36 Z" />
      <path d="M9 30 H15" stroke={ACCENT} />
      <path d="M11 24 H16" />
      <path d="M13 18 H17" />
      <text x="34" y="20" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">NOIDA INTL</text>
      <text x="34" y="34" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="0.22em" fill="currentColor" stroke="none" opacity="0.6">AIRPORT</text>
    </Frame>
  );
}

function Rajasthan() {
  return (
    <Frame label="Rajasthan Tourism">
      {/* shield */}
      <path d="M20 6 H32 V20 C32 28 26 34 26 36 C26 34 20 28 20 20 Z" transform="translate(-6 0)" />
      {/* sun */}
      <circle cx="20" cy="20" r="4.5" stroke={ACCENT} />
      <path d="M14 23 q6 -4 12 0" stroke={ACCENT} />
      <text x="42" y="20" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">RAJASTHAN</text>
      <text x="42" y="34" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="0.22em" fill="currentColor" stroke="none" opacity="0.6">TOURISM</text>
    </Frame>
  );
}

function Billione() {
  return (
    <Frame label="BILLIONE / eMAP">
      {/* outer frame nodding to logo */}
      <rect x="4" y="10" width="32" height="24" rx="2" />
      {/* IO ligature accent */}
      <circle cx="16" cy="22" r="3" stroke={ACCENT} />
      <path d="M22 18 V26" stroke={ACCENT} />
      <text x="42" y="20" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">BILLIONE</text>
      <text x="42" y="34" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="0.22em" fill="currentColor" stroke="none" opacity="0.6">eMAP · MOBILITY</text>
    </Frame>
  );
}

function Pickyourtrail() {
  return (
    <Frame label="Pickyourtrail">
      {/* play-pin */}
      <path d="M6 10 L28 10 L34 22 L28 34 L6 34 Z" />
      <path d="M14 18 L24 22 L14 26 Z" stroke={ACCENT} fill="none" />
      <text x="42" y="28" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">PICKYOURTRAIL</text>
    </Frame>
  );
}

function Monkspaces() {
  return (
    <Frame label="Monkspaces.ai">
      {/* glasses head */}
      <circle cx="20" cy="22" r="13" />
      <circle cx="15" cy="20" r="3" stroke={ACCENT} />
      <circle cx="25" cy="20" r="3" stroke={ACCENT} />
      <path d="M18 20 H22" stroke={ACCENT} />
      <path d="M15 27 q5 3 10 0" />
      <text x="40" y="20" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">MONKSPACES</text>
      <text x="40" y="34" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="0.22em" fill="currentColor" stroke="none" opacity="0.6">.AI</text>
    </Frame>
  );
}

function Coliwoo() {
  return (
    <Frame label="Coliwoo">
      {/* script-style flowing line nodding to logo */}
      <path d="M4 30 q2 -10 8 -10 q4 0 4 6 q0 -8 7 -8 q5 0 5 7 q0 -7 6 -7 q6 0 5 7" />
      <circle cx="32" cy="29" r="1.6" stroke={ACCENT} fill={ACCENT} />
      <text x="42" y="28" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="0.18em" fill="currentColor" stroke="none">COLIWOO</text>
    </Frame>
  );
}

const MAP: Record<string, () => React.ReactElement> = {
  "chargezone": Chargezone,
  "noida-international-airport": Noida,
  "rajasthan-tourism": Rajasthan,
  "billione-emap": Billione,
  "pickyourtrail": Pickyourtrail,
  "monkspaces": Monkspaces,
  "coliwoo": Coliwoo,
};

export function ClientMark({ slug, className }: Props) {
  const Comp = MAP[slug];
  if (!Comp) return null;
  return <span className={`client-mark-wrap ${className ?? ""}`.trim()}><Comp /></span>;
}
