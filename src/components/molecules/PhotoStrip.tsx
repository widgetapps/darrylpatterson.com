"use client";
/**
 * Molecule: the strip of real photos on About (CNT-8, DSN-6). Five slots on
 * desktop, three on phones, drawn from a larger pool. Each slot cross-fades
 * to a photo not currently on show, on its own random timer, so the swaps
 * never line up. The server renders the first five so the page is complete
 * without JavaScript; the cycling starts a few seconds after load and stays
 * off under prefers-reduced-motion (DSN-7).
 */
import Image from "next/image";
import { useEffect, useState } from "react";
import type { About } from "@/lib/content";

type Photo = About["photos"][number];
type Slot = { current: Photo; next: Photo | null };

const SLOTS = 5;
const FIRST_SWAP_MS: [number, number] = [2000, 9000];
const SWAP_EVERY_MS: [number, number] = [7000, 16000];
const FADE_MS = 1600;

const between = ([lo, hi]: [number, number]) => lo + Math.random() * (hi - lo);

export function PhotoStrip({ photos, caption }: { photos: Photo[]; caption: string }) {
  const [slots, setSlots] = useState<Slot[]>(() => photos.slice(0, SLOTS).map((p) => ({ current: p, next: null })));

  useEffect(() => {
    if (photos.length <= SLOTS) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];
    const swap = (i: number) => {
      // Pick from whatever is not on show right now, inside the updater so it reads fresh state.
      setSlots((prev) => {
        const showing = new Set(prev.flatMap((s) => [s.current.src, s.next?.src]));
        const pool = photos.filter((p) => !showing.has(p.src));
        const pick = pool[Math.floor(Math.random() * pool.length)];
        return pick ? prev.map((s, j) => (j === i ? { ...s, next: pick } : s)) : prev;
      });
      timers.push(
        window.setTimeout(() => {
          setSlots((prev) => prev.map((s, j) => (j === i && s.next ? { current: s.next, next: null } : s)));
        }, FADE_MS + 50),
      );
      timers.push(window.setTimeout(() => swap(i), between(SWAP_EVERY_MS)));
    };
    for (let i = 0; i < SLOTS; i++) timers.push(window.setTimeout(() => swap(i), between(FIRST_SWAP_MS)));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [photos]);

  return (
    <figure className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {slots.map((slot, i) => (
          <div key={i} className={`relative aspect-square overflow-hidden rounded-lg ${i >= 3 ? "hidden md:block" : ""}`}>
            <Image
              key={slot.current.src}
              src={slot.current.src}
              alt={slot.current.alt}
              width={slot.current.width}
              height={slot.current.height}
              sizes="(min-width: 54rem) 208px, 33vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {slot.next ? (
              <Image
                key={slot.next.src}
                src={slot.next.src}
                alt={slot.next.alt}
                width={slot.next.width}
                height={slot.next.height}
                sizes="(min-width: 54rem) 208px, 33vw"
                className="photo-fade-in absolute inset-0 h-full w-full object-cover"
                style={{ animationDuration: `${FADE_MS}ms` }}
              />
            ) : null}
          </div>
        ))}
      </div>
      <figcaption className="font-mono text-meta text-ink-muted">{caption}</figcaption>
    </figure>
  );
}
