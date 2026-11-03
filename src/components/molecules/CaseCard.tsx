/**
 * Molecule: a past-work card on About (MIG-3): title, client, role, year, one image.
 */
import Image from "next/image";
import { Heading } from "@/components/atoms/Heading";
import { Meta } from "@/components/atoms/Meta";
import type { Work } from "@/lib/content";

export function CaseCard({ item, headingLevel = 4 }: { item: Work[number]; headingLevel?: 3 | 4 }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-surface-raised shadow-raised">
      <Image
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        sizes="(min-width: 54rem) 360px, 100vw"
        className="w-full border-b border-line object-cover"
      />
      <div className="flex flex-col gap-2 p-6">
        <Heading level={headingLevel} size={3}>
          {item.title}
        </Heading>
        <p className="text-body-sm">
          {item.client} · {item.role}
        </p>
        <Meta>{item.when}</Meta>
      </div>
    </article>
  );
}
