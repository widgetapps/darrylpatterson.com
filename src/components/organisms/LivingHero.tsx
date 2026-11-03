/**
 * Organism: the Home hero. The headline is live text on its own panel so the
 * scene can never lower its contrast (HERO-1); the server draws the current
 * season under a clear sky and the client repaints with the weather (HERO-7).
 */
import { ButtonLink } from "@/components/atoms/Button";
import { LivingHeroClient } from "@/components/organisms/LivingHeroClient";
import type { Home } from "@/lib/content";
import { seasonFor } from "@/lib/season";

export function LivingHero({ hero }: { hero: Home["hero"] }) {
  const initial = { season: seasonFor(new Date()), condition: "clear" as const, night: false };
  return (
    <section aria-labelledby="headline" className="mx-auto max-w-content px-4 pt-8 md:px-8">
      <LivingHeroClient initial={initial}>
        <div className="-mt-18 mx-4 flex max-w-[640px] flex-col gap-4 rounded-md bg-surface-panel p-6 shadow-raised md:absolute md:bottom-12 md:left-12 md:mx-0 md:mt-0 md:p-8">
          <h1 id="headline" className="font-display text-h1 md:text-display-1">
            {hero.headline}
          </h1>
          <p className="text-lead">{hero.lead}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </LivingHeroClient>
    </section>
  );
}
