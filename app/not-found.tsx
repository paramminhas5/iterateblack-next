import Link from "next/link";

export default function NotFound() {
  return (
    <section className="chapter chapter-tall container-edge" style={{ alignItems: "flex-start" }}>
      <div style={{ display: "flex", gap: 24 }}>
        <span className="tick tick-lg" />
        <div>
          <span className="mono">404 · Page not found</span>
          <h1 className="display display-lg" style={{ marginTop: 18, marginBottom: 24 }}>
            Nothing here.<br />Yet.
          </h1>
          <p className="lead" style={{ marginBottom: 36, maxWidth: "44ch" }}>
            The page you're looking for doesn't exist or has moved. Here's where you probably want to be:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/" className="btn-ghost" data-cursor="hover">Home →</Link>
            <Link href="/services" className="btn-ghost" data-cursor="hover">Services →</Link>
            <Link href="/work" className="btn-ghost" data-cursor="hover">Work →</Link>
            <Link href="/contact" className="btn-ghost" data-cursor="hover">Contact →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
