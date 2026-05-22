"use client";

import Link from "next/link";
import { SectionDiagram } from "./SectionDiagram";

type Props = {
  href: string;
  label: string;
  title: string;
  diagram?: string | null;
  kind: "case" | "industry";
};

export function NextItem({ href, label, title, diagram, kind }: Props) {
  return (
    <Link href={href} className="next-item" data-cursor="view" aria-label={`Next ${kind}: ${title}`}>
      <div className="next-item-copy">
        <span className="mono next-item-label">{label}</span>
        <span className="next-item-title">{title}</span>
        <span className="mono next-item-cta">Next →</span>
      </div>
      <div className="next-item-diagram">
        <SectionDiagram diagram={diagram} mode="inline" height="100%" />
      </div>
    </Link>
  );
}
