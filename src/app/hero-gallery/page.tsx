import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@/components/atoms/Heading";
import { Meta } from "@/components/atoms/Meta";
import { HeroScene } from "@/components/organisms/HeroScene";
import { ContentPage, PageIntro } from "@/components/templates/Page";
import { SEASONS } from "@/lib/season";
import { CONDITIONS } from "@/lib/weather";

/**
 * Development only: every state the living hero can draw, for review.
 * Not linked, not in the sitemap, and a 404 in production.
 */
export const metadata: Metadata = { title: "Hero gallery", robots: { index: false, follow: false } };

export default function HeroGalleryPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <ContentPage className="flex flex-col gap-12">
      <PageIntro
        title="Hero gallery"
        lead="Every scene the living hero can draw: four seasons, eight conditions, day and night. Development only."
        meta="64 scenes · not linked · 404 in production"
      />
      {SEASONS.map((season) => (
        <section key={season} aria-labelledby={`${season}-h`} className="flex flex-col gap-6">
          <Heading level={2} id={`${season}-h`} className="capitalize">
            {season}
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CONDITIONS.map((condition) =>
              [false, true].map((night) => (
                <figure key={`${condition}-${night}`} className="flex flex-col gap-2">
                  <div className="aspect-[1200/520] overflow-hidden rounded-lg">
                    <HeroScene season={season} condition={condition} night={night} />
                  </div>
                  <figcaption>
                    <Meta>
                      {season} · {condition} · {night ? "night" : "day"}
                    </Meta>
                  </figcaption>
                </figure>
              )),
            )}
          </div>
        </section>
      ))}
    </ContentPage>
  );
}
