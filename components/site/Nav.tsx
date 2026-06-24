"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/work", label: "Work" },
  { href: "/how-we-work", label: "Model" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-menu-open" : ""}`}>
        <Link href="/" className="nav-mark">
          <span className="tick" style={{ background: "var(--accent)" }} />
          HYPERITERATE
        </Link>
        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`contact-link nav-cta${pathname === "/contact" ? " active" : ""}`}
          >
            Start here →
          </Link>
        </div>
        <button
          type="button"
          className={`nav-burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <div className={`nav-dropdown${open ? " is-open" : ""}`} aria-hidden={!open}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-dropdown-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="nav-dropdown-link nav-dropdown-cta"
            onClick={() => setOpen(false)}
          >
            Start here →
          </Link>
        </div>
      </nav>
    </>
  );
}
