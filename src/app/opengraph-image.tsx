import { ImageResponse } from "next/og";
import { OgCard, ogContentType, ogSize } from "@/components/organisms/OgCard";
import { home, site } from "@/lib/content";

export const alt = `${site.name}: ${home.hero.headline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return new ImageResponse(<OgCard title={home.hero.headline} subtitle={home.hero.lead} />, {
    ...ogSize,
    fonts: await OgCard.fonts(),
  });
}
