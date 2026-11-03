/**
 * Molecule: the pull quote, in the display face on the sunken surface.
 */
import type { ReactNode } from "react";

export function PullQuote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <blockquote className={`rounded-md bg-surface-sunken px-8 py-6 font-display text-quote ${className}`}>
      {children}
    </blockquote>
  );
}
