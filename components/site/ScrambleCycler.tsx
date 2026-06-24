"use client";

import { useEffect, useRef, useState, createElement } from "react";

const ALPHA = "abcdefghijklmnopqrstuvwxyz";

/**
 * Cycle through multiple phrases via scramble, then lock on the final one.
 * - Scrambles into each phrase, holds, scrambles into the next.
 * - The last phrase locks permanently and gets the accent treatment.
 */
export function ScrambleCycler({
  phrases,
  scrambleMs = 520,
  holdMs = 900,
  as: Tag = "span",
  className,
}: {
  phrases: string[];
  scrambleMs?: number;
  holdMs?: number;
  as?: "span" | "h1" | "h2" | "h3" | "div";
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(phrases[0] ?? "");
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOut(phrases[phrases.length - 1] ?? "");
      setDone(true);
      return;
    }

    let cancelled = false;
    let i = 0;

    const scrambleTo = (target: string, cb: () => void) => {
      const len = target.length;
      const lockAt = Array.from({ length: len }, (_, k) =>
        scrambleMs * (0.3 + 0.65 * (k / Math.max(len - 1, 1)))
      );
      const start = performance.now();
      const tick = () => {
        if (cancelled) return;
        const t = performance.now() - start;
        let s = "";
        for (let k = 0; k < len; k++) {
          const ch = target[k];
          if (/[\s.,'!?:;—–-]/.test(ch)) { s += ch; continue; }
          if (t >= lockAt[k]) s += ch;
          else s += ALPHA[Math.floor(Math.random() * ALPHA.length)];
        }
        setOut(s);
        if (t < scrambleMs) rafRef.current = requestAnimationFrame(tick);
        else { setOut(target); cb(); }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const step = () => {
      if (cancelled) return;
      const target = phrases[i];
      setIdx(i);
      scrambleTo(target, () => {
        if (i >= phrases.length - 1) { setDone(true); return; }
        timeoutRef.current = window.setTimeout(() => { i += 1; step(); }, holdMs);
      });
    };

    // Show first phrase immediately as static text, then start scrambling after loader
    setOut(phrases[0] ?? "");
    const loaderAlreadyShown = sessionStorage.getItem("gti-loader-shown");
    const delay = loaderAlreadyShown ? 200 : 2900;
    timeoutRef.current = window.setTimeout(() => {
      if (!cancelled) step();
    }, delay);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phrases.join("|"), scrambleMs, holdMs]);

  const cls = `scramble ${done ? "is-final" : ""} ${className ?? ""}`.trim();
  return createElement(
    Tag,
    { className: cls, "data-cycle-idx": idx },
    createElement("span", { className: "scramble-text" }, out)
  );
}
