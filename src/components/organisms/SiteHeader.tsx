/**
 * Organism: the site header. Goose and wordmark link home (SITE-7); one
 * primary nav with the current page marked (SITE-2, A11Y-3).
 */
import Link from "next/link";
import { GooseMark } from "@/components/atoms/GooseMark";
import { NavLinks } from "@/components/molecules/NavLinks";
import { site } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface-raised">
      <div className="mx-auto flex min-h-16 max-w-content flex-wrap items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" className="inline-flex min-h-11 items-center gap-3 text-ink no-underline hover:no-underline">
          <GooseMark size={40} />
          <span className="font-display text-h3">{site.name}</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          <NavLinks items={site.nav} />
        </nav>
      </div>
    </header>
  );
}
