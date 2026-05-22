"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export function Reveal({
  children,
  delay = 0,
  as: As = "div" as any,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: any;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If element is already in viewport on mount, reveal immediately.
    const r = el.getBoundingClientRect();
    const inView = r.top < window.innerHeight && r.bottom > 0;
    if (inView) {
      const id = window.setTimeout(() => el.classList.add("in"), delay);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.setTimeout(() => el.classList.add("in"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Tag: any = As;
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
