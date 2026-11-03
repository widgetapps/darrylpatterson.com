/**
 * Atom: the mono "meta" style for dates, places and small facts.
 */
import type { ReactNode } from "react";

export function Meta({ children, className = "", inverse = false }: { children: ReactNode; className?: string; inverse?: boolean }) {
  return (
    <p className={`font-mono text-meta ${inverse ? "text-on-inverse-muted" : "text-ink-muted"} ${className}`}>{children}</p>
  );
}
