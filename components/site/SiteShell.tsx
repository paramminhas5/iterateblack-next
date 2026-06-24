import type { ReactNode } from "react";
import { Cursor } from "./Cursor";
import { Loader } from "./Loader";
import { LenisProvider } from "./Lenis";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SectionDots } from "./SectionDots";
import { ScrollToTop } from "./ScrollToTop";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <LenisProvider />
      <ScrollToTop />
      <Loader />
      <Cursor />
      <div className="grid-overlay" aria-hidden />
      <Nav />
      <main id="main" style={{ position: "relative", zIndex: 2 }}>
        {children}
      </main>
      <Footer />
      <SectionDots />
    </>
  );
}
