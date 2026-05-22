"use client";

import { ContextualDiagram, type DiagramKey } from "./three/ContextualDiagram";

type Mode = "hero-bg" | "rail" | "inline";

type Props = {
  diagram?: string | null;
  mode?: Mode;
  height?: number | string;
  className?: string;
};

/**
 * Integrated, non-decorative diagram surface.
 * - hero-bg: full-bleed behind hero copy with fade-out mask
 * - rail:    pinned right-rail visual, mid-height
 * - inline:  sits in flow at a capped height (mobile / narrow sections)
 *
 * No borders, no captions, no chips. The diagram is part of the section,
 * not an exhibit.
 */
export function SectionDiagram({ diagram, mode = "inline", height, className }: Props) {
  const cls = `section-diagram section-diagram-${mode}${className ? " " + className : ""}`;
  const style =
    height !== undefined
      ? ({ ["--sd-h" as string]: typeof height === "number" ? `${height}px` : height } as React.CSSProperties)
      : undefined;
  return (
    <div className={cls} style={style} aria-hidden>
      <ContextualDiagram name={diagram as DiagramKey | null | undefined} />
    </div>
  );
}
