"use client";
/**
 * Molecule: one photo frame that cross-fades through a pool on a random
 * interval, used for the portrait on Home. The server renders the first
 * photo; cycling starts after the first interval and stays off under
 * prefers-reduced-motion (DSN-7).
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import type { About } from "@/lib/content";

type Photo = About["photos"][number];

const FADE_MS = 1600;

export function CrossfadePhoto({
  photos,
  intervalMs,
  sizes,
  className = "",
  priority = false,
}: {
  photos: Photo[];
  intervalMs: [number, number];
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const [state, setState] = useState<{ current: Photo; next: Photo | null }>({ current: photos[0], next: null });

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const wait = () => intervalMs[0] + Math.random() * (intervalMs[1] - intervalMs[0]);
    const swap = () => {
      setState((prev) => {
        const pool = photos.filter((p) => p.src !== prev.current.src);
        return { ...prev, next: pool[Math.floor(Math.random() * pool.length)] };
      });
      timers.push(window.setTimeout(() => setState((prev) => (prev.next ? { current: prev.next, next: null } : prev)), FADE_MS + 50));
      timers.push(window.setTimeout(swap, wait()));
    };
    timers.push(window.setTimeout(swap, wait()));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [photos, intervalMs]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        key={state.current.src}
        src={state.current.src}
        alt={state.current.alt}
        width={state.current.width}
        height={state.current.height}
        sizes={sizes}
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {state.next ? (
        <Image
          key={state.next.src}
          src={state.next.src}
          alt={state.next.alt}
          width={state.next.width}
          height={state.next.height}
          sizes={sizes}
          className="photo-fade-in absolute inset-0 h-full w-full object-cover"
          style={{ animationDuration: `${FADE_MS}ms` }}
        />
      ) : null}
    </div>
  );
}
