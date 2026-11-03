/**
 * The company list filter (SITE-5, A11Y-6): state lives in the URL as
 * ?type=agency, so a filtered view can be linked and needs no store.
 */
import { LIST_TYPES, type ListEntry, type ListType } from "./content";

export type ListFilter = ListType | "all";

export const FILTERS: readonly { id: ListFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...(Object.keys(LIST_TYPES) as ListType[]).map((id) => ({ id, label: LIST_TYPES[id] })),
];

export function parseFilter(value: string | null | undefined): ListFilter {
  if (value && value in LIST_TYPES) return value as ListType;
  return "all";
}

export function filterList<T extends Pick<ListEntry, "type">>(rows: readonly T[], filter: ListFilter): T[] {
  if (filter === "all") return [...rows];
  return rows.filter((r) => r.type === filter);
}

/** The query string for a filter; empty for "all" so the canonical URL stays clean. */
export function filterQuery(filter: ListFilter): string {
  return filter === "all" ? "" : `?type=${filter}`;
}
