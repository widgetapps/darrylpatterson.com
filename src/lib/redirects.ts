/**
 * Old URLs redirect permanently (SITE-6). Past work now lives on About, so
 * the old work and list pages land on that section; the old licence page
 * lands on the licence section.
 */
export type Redirect = { source: string; destination: string };

export const redirects: readonly Redirect[] = [
  { source: "/thework", destination: "/about#work" },
  { source: "/thework/:slug", destination: "/about#work" },
  { source: "/thelist", destination: "/about#work" },
  { source: "/license", destination: "/about#license" },
];

/** Resolve a path against the redirect map the way Next will; undefined when it does not match. */
export function resolveRedirect(path: string): string | undefined {
  for (const r of redirects) {
    const pattern = new RegExp(
      "^" + r.source.replace(/:[A-Za-z]+/g, "[^/]+").replace(/\//g, "\\/") + "\\/?$",
    );
    if (pattern.test(path)) return r.destination;
  }
  return undefined;
}
