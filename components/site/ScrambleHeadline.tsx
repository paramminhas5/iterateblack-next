"use client";

import { useEffect, useRef, useState, createElement } from "react";



const ALPHA = "abcdefghijklmnopqrstuvwxyz";

/**
 * Single, fast scramble that lands on the target text. Locks left-to-right.
 *
 * - `triggerOnView`: scramble only when the element enters the viewport (once).
 * - `as`: wrapping tag (defaults to span).
 * - `accent`: color final text with accent (defaults true).
 */
export function ScrambleHeadline({
  text = "We iterate.",
  duration = 600,
  triggerOnView = false,
  as: Tag = "span",
  accent = true,
  className,
}: {
  text?: string;
  duration?: number;
  triggerOnView?: boolean;
  as?: "span" | "h1" | "h2" | "h3" | "div";
  accent?: boolean;
  className?: string;
}) {
  const [out, setOut] = useState(triggerOnView ? text : text);
  const [done, setDone] = useState(false);
  const [armed, setArmed] = useState(!triggerOnView);
  const rafRef = useRef<number | null>(null);
  const wrapRef = useRef<HTMLElement | null>(null);

  // viewport trigger
  useEffect(() => {
    if (!triggerOnView) return;
    const el = wrapRef.current;
    if (!el || typeof window === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!armed) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setOut(text); setDone(true); return; }

    const len = text.length;
    const lockAt = Array.from({ length: len }, (_, k) =>
      duration * (0.35 + 0.6 * (k / Math.max(len - 1, 1)))
    );
    const start = performance.now();
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const t = performance.now() - start;
      let s = "";
      for (let k = 0; k < len; k++) {
        const target = text[k];
        if (/[\s.,'!?:;—–-]/.test(target)) { s += target; continue; }
        if (t >= lockAt[k]) s += target;
        else s += ALPHA[Math.floor(Math.random() * ALPHA.length)];
      }
      setOut(s);
      if (t < duration) rafRef.current = requestAnimationFrame(tick);
      else { setOut(text); setDone(true); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelled = true; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [text, duration, armed]);

  const cls = `scramble ${done ? "is-final" : ""} ${accent ? "" : "no-accent"} ${className ?? ""}`.trim();
  return createElement(
    Tag,
    { ref: wrapRef as any, className: cls },
    createElement("span", { className: "scramble-text" }, out)
  );
}
