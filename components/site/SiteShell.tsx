import type { ReactNode } from "react";
import { Cursor } from "./Cursor";
import { Loader } from "./Loader";
import { LenisProvider } from "./Lenis";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SectionDots } from "./SectionDots";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <LenisProvider />
      <Loader />
      <Cursor />
      <div className="grid-overlay" aria-hidden />
      <Nav />
      <main style={{ position: "relative", zIndex: 2 }}>
        {children}
      </main>
      <Footer />
      <SectionDots />
    </>
  );
}
