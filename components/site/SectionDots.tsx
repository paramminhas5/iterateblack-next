"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SectionDots() {
  const pathname = usePathname();
  const [sections, setSections] = useState<Element[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const scan = () => {
      const list = Array.from(document.querySelectorAll("main section, body section"));
      setSections(list);
    };
    raf = requestAnimationFrame(() => requestAnimationFrame(scan));
    const t = window.setTimeout(scan, 600);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(t); };
  }, [pathname]);

  useEffect(() => {
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        let best = -1;
        let bestScore = -Infinity;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.indexOf(e.target);
            const score =
              e.intersectionRatio -
              Math.abs(e.boundingClientRect.top - window.innerHeight * 0.3) / window.innerHeight;
            if (score > bestScore) { bestScore = score; best = idx; }
          }
        });
        if (best >= 0) setActive(best);
      },
      { threshold: [0.1, 0.4, 0.7], rootMargin: "-20% 0px -40% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav className="section-dots" aria-label="Page sections">
      {sections.map((_, i) => (
        <button
          key={i}
          type="button"
          className={`section-dot${i === active ? " active" : ""}`}
          aria-label={`Go to section ${i + 1}`}
          onClick={() => sections[i]?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
      ))}
    </nav>
  );
}
