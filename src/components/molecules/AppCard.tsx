/**
 * Molecule: one of the two app cards on Home (CNT-2, SITE-3). A real
 * screenshot, a short description, the platforms, and a link out.
 */
import Image from "next/image";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Meta } from "@/components/atoms/Meta";
import type { Site } from "@/lib/content";

export function AppCard({ app, priority = false }: { app: Site["apps"][number]; priority?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-surface-raised shadow-raised" data-app={app.id}>
      <Image
        src={app.image.src}
        alt={app.image.alt}
        width={app.image.width}
        height={app.image.height}
        sizes="(min-width: 54rem) 540px, 100vw"
        priority={priority}
        className="w-full border-b border-line object-cover"
      />
      <div className="flex flex-col gap-3 p-6">
        <Heading level={3}>{app.name}</Heading>
        <p className="text-body-sm">{app.description}</p>
        <Meta>{app.platforms}</Meta>
        <a href={app.url} className="inline-flex min-h-11 items-center gap-1 text-label">
          Live at {app.host}
          <Icon name="arrow-up-right" />
        </a>
      </div>
    </article>
  );
}
