/**
 * Molecule: the strip of real photos on About (CNT-8, DSN-6). Five across on
 * desktop, three across on phones, where the strip is capped at nine.
 */
import Image from "next/image";
import type { About } from "@/lib/content";

export function PhotoStrip({ photos, caption }: { photos: About["photos"]; caption: string }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {photos.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 54rem) 208px, 33vw"
            className={`aspect-square w-full rounded-lg object-cover ${i >= 9 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
      <figcaption className="font-mono text-meta text-ink-muted">{caption}</figcaption>
    </figure>
  );
}
