"use client";
/**
 * Molecule: the primary navigation links, with the current page marked by
 * aria-current and the goose-coloured pill (SITE-2). Client only so the
 * current path is known; the links themselves are plain anchors.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ items }: { items: readonly { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className="relative inline-flex min-h-11 items-center px-3 text-ui text-ink no-underline hover:underline"
          >
            {item.label}
            {current ? (
              <span aria-hidden="true" className="absolute bottom-1.5 left-3 right-3 h-[3px] rounded-pill bg-goose" />
            ) : null}
          </Link>
        );
      })}
    </>
  );
}
