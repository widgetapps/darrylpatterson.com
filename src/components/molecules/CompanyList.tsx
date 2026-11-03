"use client";
/**
 * Molecule: the list of 148 companies with its type filter (SITE-5, A11Y-6).
 * The filter is a group of toggle buttons that expose aria-pressed and write
 * the chosen type to the URL (?type=agency) without a navigation, so a
 * filtered view can be linked. Without JavaScript the full list shows.
 */
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ListEntry } from "@/lib/content";
import { FILTERS, filterList, filterQuery, parseFilter, type ListFilter } from "@/lib/list-filter";

export function CompanyList({ rows }: { rows: readonly ListEntry[] }) {
  const params = useSearchParams();
  const urlKey = params.toString();
  // A chip press overrides the URL's filter until the URL itself changes
  // (back button, a pasted link), so no effect is needed to keep them in step.
  const [picked, setPicked] = useState<{ filter: ListFilter; keys: string[] } | null>(null);
  const filter = picked && picked.keys.includes(urlKey) ? picked.filter : parseFilter(params.get("type"));

  const pick = (next: ListFilter) => {
    const url = `${window.location.pathname}${filterQuery(next)}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", url);
    setPicked({ filter: next, keys: [urlKey, new URL(url, window.location.origin).searchParams.toString()] });
  };

  const shown = filterList(rows, filter);

  return (
    <div>
      <div role="group" aria-label="Filter by type" className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => pick(f.id)}
            className="inline-flex min-h-11 items-center rounded-pill border border-line-strong px-4 text-ui text-ink aria-pressed:border-goose aria-pressed:bg-goose aria-pressed:text-on-goose"
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mb-4 font-mono text-meta text-ink-muted" aria-live="polite">
        {shown.length} of {rows.length} shown
      </p>
      <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 md:grid-cols-3">
        {shown.map((row) => (
          <li key={row.id} className="flex justify-between gap-3 border-b border-line py-2.5 text-body-sm">
            <span>{row.company}</span>
            <span className="text-right text-ink-muted">{row.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
