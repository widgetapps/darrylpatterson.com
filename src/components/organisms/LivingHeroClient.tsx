"use client";
/**
 * Organism (client half): holds the scene back until /api/weather answers,
 * then reveals it with the live season, condition and night and keeps asking
 * every minute while the page is open (HERO-7). A failed lookup reveals the
 * server's season scene instead, and a lookup that never answers reveals it
 * after a few seconds, so nothing waits forever.
 */
import { useEffect, useState, type ReactNode } from "react";
import { HeroScene } from "@/components/organisms/HeroScene";
import { isSeason, seasonFor } from "@/lib/season";
import type { SceneState } from "@/lib/scene";
import { isCondition } from "@/lib/weather";

export const POLL_MS = 60_000;
/** Longest the scene stays hidden when the first lookup hangs. */
const REVEAL_FALLBACK_MS = 4000;

function readScene(data: unknown): SceneState {
  const d = (data ?? {}) as Record<string, unknown>;
  return {
    season: isSeason(d.season) ? d.season : seasonFor(new Date()),
    condition: isCondition(d.condition) ? d.condition : "clear",
    night: d.night === true,
  };
}

export function LivingHeroClient({ initial, children }: { initial: SceneState; children: ReactNode }) {
  const [state, setState] = useState<SceneState>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const lookup = () =>
      fetch("/api/weather", { signal: controller.signal, headers: { accept: "application/json" } })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
        .then((data: unknown) => setState(readScene(data)))
        .catch(() => {
          // Keep the season honest even when the lookup fails.
          setState((s) => ({ ...s, season: seasonFor(new Date()) }));
        })
        .finally(() => {
          if (!controller.signal.aborted) setReady(true);
        });

    void lookup();
    const fallback = setTimeout(() => setReady(true), REVEAL_FALLBACK_MS);
    const poll = setInterval(() => {
      // A hidden tab waits; the next tick after it is shown again catches up.
      if (document.visibilityState === "visible") void lookup();
    }, POLL_MS);

    return () => {
      controller.abort();
      clearTimeout(fallback);
      clearInterval(poll);
    };
  }, []);

  return (
    <div
      className="relative"
      data-testid="living-hero"
      data-season={state.season}
      data-condition={state.condition}
      data-night={state.night ? "true" : "false"}
      data-ready={ready ? "true" : "false"}
    >
      <noscript>
        <style>{`.hero-reveal { opacity: 1; }`}</style>
      </noscript>
      <div className="hero-reveal h-[320px] overflow-hidden rounded-lg bg-surface md:h-[520px]" aria-busy={!ready}>
        <HeroScene {...state} />
      </div>
      {children}
    </div>
  );
}
