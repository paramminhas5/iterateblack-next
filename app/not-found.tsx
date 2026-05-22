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
          <Link href="/" className="btn-ghost" data-cursor="hover">
            Back to start →
          </Link>
        </div>
      </div>
    </section>
  );
}
