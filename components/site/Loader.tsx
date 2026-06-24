"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "gti-loader-shown";

export function Loader() {
  const [shown, setShown] = useState(false);
  const [out, setOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }
    setShown(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setOut(true), 1700);
    const t2 = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShown(false);
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("loader:done"));
    }, 2600);
    return () => { clearTimeout(t); clearTimeout(t2); document.body.style.overflow = ""; };
  }, []);

  if (!shown) return null;
  return (
    <div ref={ref} className={`loader ${out ? "out" : ""}`}>
      <div className="loader-mark" style={{ animation: "fadeIn .5s ease forwards" }}>
        HYPER<span style={{ color: "var(--accent)" }}>ITERATE</span>
      </div>
      <div className="loader-bar" />
      <style>{`@keyframes fadeIn{to{opacity:1}}`}</style>
    </div>
  );
}
