"use client";
/**
 * Organism (client half): shows the scene the server drew, then asks
 * /api/weather once and repaints with the live season, condition and night
 * (HERO-7). A failed or slow lookup leaves the server's scene in place.
 */
import { useEffect, useState, type ReactNode } from "react";
import { HeroScene } from "@/components/organisms/HeroScene";
import { isSeason, seasonFor } from "@/lib/season";
import type { SceneState } from "@/lib/scene";
import { isCondition } from "@/lib/weather";

export function LivingHeroClient({ initial, children }: { initial: SceneState; children: ReactNode }) {
  const [state, setState] = useState<SceneState>(initial);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/weather", { signal: controller.signal, headers: { accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: unknown) => {
        const d = (data ?? {}) as Record<string, unknown>;
        setState({
          season: isSeason(d.season) ? d.season : seasonFor(new Date()),
          condition: isCondition(d.condition) ? d.condition : "clear",
          night: d.night === true,
        });
      })
      .catch(() => {
        // Keep the season honest even when the lookup fails.
        setState((s) => ({ ...s, season: seasonFor(new Date()) }));
      });
    return () => controller.abort();
  }, []);

  return (
    <div
      className="relative"
      data-testid="living-hero"
      data-season={state.season}
      data-condition={state.condition}
      data-night={state.night ? "true" : "false"}
    >
      <div className="h-[320px] overflow-hidden rounded-lg bg-[var(--dp-sky-day)] md:h-[520px]">
        <HeroScene {...state} />
      </div>
      {children}
    </div>
  );
}
