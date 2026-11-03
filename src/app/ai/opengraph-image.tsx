import { ImageResponse } from "next/og";
import { OgCard, ogContentType, ogSize } from "@/components/organisms/OgCard";
import { ai, site } from "@/lib/content";

export const alt = `${ai.title}, an essay by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return new ImageResponse(<OgCard title={ai.title} subtitle={ai.lead} kicker={ai.meta} />, {
    ...ogSize,
    fonts: await OgCard.fonts(),
  });
}
