/**
 * Atom: headings in the display face at the system's sizes. One h1 per page
 * (A11Y-3); the level is explicit so the outline stays logical.
 */
import type { ReactNode } from "react";

type Level = 1 | 2 | 3 | 4;
const sizes: Record<Level, string> = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
  4: "text-h3",
};

export function Heading({
  level,
  id,
  children,
  className = "",
  size,
}: {
  level: Level;
  id?: string;
  children: ReactNode;
  className?: string;
  size?: Level;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={`font-display ${sizes[size ?? level]} ${className}`}>
      {children}
    </Tag>
  );
}
