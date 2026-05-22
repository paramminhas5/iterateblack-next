"use client";

import Link from "next/link";

type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs mono" aria-label="Breadcrumb">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="crumb-item">
            {c.to && !last ? (
              <Link href={c.to} className="crumb-link" data-cursor="hover">
                {c.label}
              </Link>
            ) : (
              <span className={last ? "crumb-current" : "crumb-link"}>{c.label}</span>
            )}
            {!last && <span className="crumb-sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
