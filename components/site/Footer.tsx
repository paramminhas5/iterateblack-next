import Link from "next/link";
import { ContextualFooter } from "./ContextualFooter";

export function Footer() {
  return (
    <footer>
      {/* Page-contextual CTA strip — copy changes per route */}
      <ContextualFooter />

      {/* Standard footer */}
      <div className="hairline-top site-footer" style={{ background: "var(--bg-deep)" }}>
        <div className="container-edge site-footer-grid">
          <div className="site-footer-cta">
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span className="tick" />
              <div>
                <div className="display display-md" style={{ marginBottom: 18 }}>
                  Iterate
                </div>
                <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: "38ch", marginBottom: 20 }}>
                  AI-native marketing studio · Est. 2014 · Five people, zero account layers, one compounding system.
                </p>
                <Link href="/contact" className="btn-ghost" data-cursor="hover">
                  Start a project →
                </Link>
              </div>
            </div>
          </div>

          <div className="site-footer-cols">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="mono" style={{ color: "var(--fg-dim)" }}>Work</span>
              <Link href="/work" data-cursor="hover" style={{ fontSize: 13 }}>All engagements →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="mono" style={{ color: "var(--fg-dim)" }}>Site</span>
              <Link href="/services" data-cursor="hover" style={{ fontSize: 13 }}>Services</Link>
              <Link href="/industries" data-cursor="hover" style={{ fontSize: 13 }}>Industries</Link>
              <Link href="/about" data-cursor="hover" style={{ fontSize: 13 }}>About</Link>
              <Link href="/contact" data-cursor="hover" style={{ fontSize: 13 }}>Contact</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span className="mono" style={{ color: "var(--fg-dim)" }}>Reach</span>
              <a href="mailto:hello@greattasteiterate.com" data-cursor="hover" style={{ fontSize: 13, wordBreak: "break-all" }}>
                hello@greattasteiterate.com
              </a>
              <a href="https://linkedin.com/company/iterate-studio" target="_blank" rel="noopener noreferrer" data-cursor="hover" style={{ fontSize: 13, color: "var(--fg-muted)" }}>LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="container-edge hairline-top site-footer-meta">
          <span className="mono">© {new Date().getFullYear()} Great Taste &amp; Iterate</span>
          <span className="mono" style={{ color: "var(--fg-dim)" }}>
            Built in-house · AI-indexed · <a href="/llms.txt" style={{ color: "inherit" }}>llms.txt</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
