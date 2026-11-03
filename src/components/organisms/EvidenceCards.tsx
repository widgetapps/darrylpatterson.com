/**
 * Organism: the two apps as evidence inside the essay (CNT-5), as linked cards.
 */
import { site } from "@/lib/content";

export function EvidenceCards() {
  return (
    <div className="my-2 grid grid-cols-1 gap-6 md:grid-cols-2">
      {site.apps.map((app) => (
        <a
          key={app.id}
          href={app.url}
          className="flex flex-col gap-2 rounded-lg bg-surface-raised p-6 text-ink no-underline shadow-raised hover:no-underline"
        >
          <span className="font-display text-h3">{app.name}</span>
          <span className="text-body-sm">{app.description}</span>
          <span className="text-label text-goose-ink underline underline-offset-4">{app.host}</span>
        </a>
      ))}
    </div>
  );
}
