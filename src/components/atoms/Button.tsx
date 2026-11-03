/**
 * Atom: the two button styles, as links. Primary is the goose fill; secondary
 * is a strong border. Both are at least 44px tall (A11Y-4).
 */
import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center gap-2 rounded-md px-6 py-3 font-sans text-ui no-underline hover:no-underline";
const variants = {
  primary: "bg-goose text-on-goose hover:brightness-95",
  secondary: "border border-line-strong text-ink hover:bg-surface-sunken",
};

export function ButtonLink({ href, variant = "primary", children, className = "" }: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
