import type { Metadata } from "next";
import { ButtonLink } from "@/components/atoms/Button";
import { Meta } from "@/components/atoms/Meta";
import { notFound } from "@/lib/content";

export const metadata: Metadata = { title: notFound.title };

export default function NotFoundPage() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-content flex-1 flex-col gap-4 px-4 pb-24 pt-24 md:px-8">
      <Meta>{notFound.meta}</Meta>
      <h1 className="max-w-prose font-display text-h1">{notFound.heading}</h1>
      <p className="max-w-prose text-lead">{notFound.text}</p>
      <div className="flex flex-wrap gap-3 pt-2">
        {notFound.links.map((l) => (
          <ButtonLink key={l.href} href={l.href} variant={l.primary ? "primary" : "secondary"}>
            {l.label}
          </ButtonLink>
        ))}
      </div>
    </main>
  );
}
