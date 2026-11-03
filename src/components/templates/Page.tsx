/**
 * Templates: the page frames. `ContentPage` is the wide frame for Home-style
 * pages; `ProsePage` is the reading column (DSN-8) for the essay. Both own
 * the <main> landmark the skip link targets (A11Y-3).
 */
import type { ReactNode } from "react";

export function ContentPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <main id="main" className={`mx-auto w-full max-w-content px-4 pb-16 pt-16 md:px-8 ${className}`}>
      {children}
    </main>
  );
}

export function ProsePage({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="mx-auto w-full max-w-content px-4 pb-16 pt-16 md:px-8">
      <article className="flex max-w-prose flex-col">{children}</article>
    </main>
  );
}

export function PageIntro({ title, lead, meta }: { title: string; lead: string; meta?: string }) {
  return (
    <div className="flex max-w-prose flex-col gap-4">
      {meta ? <p className="font-mono text-meta text-ink-muted">{meta}</p> : null}
      <h1 className="font-display text-h1">{title}</h1>
      <p className="text-lead">{lead}</p>
    </div>
  );
}
