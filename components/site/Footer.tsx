import Link from "next/link";

export function Footer() {
  return (
    <footer className="hairline-top site-footer" style={{ background: "var(--bg-deep)" }}>
      <div className="container-edge site-footer-grid">
        <div className="site-footer-cta">
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span className="tick" />
            <div>
              <div className="display display-md" style={{ marginBottom: 18 }}>
                The machine has already decided what it thinks about your category. Let's change what it thinks.
              </div>
              <Link href="/contact" className="btn-ghost" data-cursor="hover">
                Start a project →
              </Link>
            </div>
          </div>
        </div>
        <div className="site-footer-cols">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="mono" style={{ color: "var(--fg-dim)" }}>Site</span>
            <Link href="/work" data-cursor="hover" style={{ fontSize: 13 }}>Work</Link>
            <Link href="/services" data-cursor="hover" style={{ fontSize: 13 }}>Services</Link>
            <Link href="/industries" data-cursor="hover" style={{ fontSize: 13 }}>Industries</Link>
            <Link href="/about" data-cursor="hover" style={{ fontSize: 13 }}>About</Link>
            <Link href="/contact" data-cursor="hover" style={{ fontSize: 13 }}>Contact</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span className="mono" style={{ color: "var(--fg-dim)" }}>Reach</span>
            <a href="mailto:hello@greattasteiterate.com" data-cursor="hover" style={{ fontSize: 13, wordBreak: "break-all" }}>hello@greattasteiterate.com</a>
            <a href="#" data-cursor="hover" style={{ fontSize: 13, color: "var(--fg-muted)" }}>LinkedIn</a>
            <a href="#" data-cursor="hover" style={{ fontSize: 13, color: "var(--fg-muted)" }}>Read.cv</a>
          </div>
        </div>
      </div>
      <div className="container-edge hairline-top site-footer-meta">
        <span className="mono">© {new Date().getFullYear()} Great Taste &amp; Iterate</span>
        <span className="mono">Built in-house · v1.0</span>
      </div>
    </footer>
  );
}
