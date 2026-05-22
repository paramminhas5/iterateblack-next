"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Numeric scramble: cycles digits and lands on the target value when in view.
 * Preserves non-digit characters (commas, %, ×, ₹, etc.).
 */
export function ScrambleNumber({
  value,
  duration = 900,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const [out, setOut] = useState(value);
  const [armed, setArmed] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!armed) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setOut(value); return; }

    const chars = value.split("");
    const isDigit = (c: string) => /[0-9]/.test(c);
    const lockAt = chars.map((c, k) =>
      isDigit(c) ? duration * (0.25 + 0.7 * (k / Math.max(chars.length - 1, 1))) : 0
    );
    const start = performance.now();
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const t = performance.now() - start;
      const next = chars.map((c, k) => {
        if (!isDigit(c)) return c;
        if (t >= lockAt[k]) return c;
        return String(Math.floor(Math.random() * 10));
      }).join("");
      setOut(next);
      if (t < duration) raf.current = requestAnimationFrame(tick);
      else setOut(value);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { cancelled = true; if (raf.current) cancelAnimationFrame(raf.current); };
  }, [armed, value, duration]);

  return <span ref={ref} className={`scramble-number ${className ?? ""}`.trim()}>{out}</span>;
}
