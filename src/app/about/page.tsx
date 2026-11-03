import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Heading } from "@/components/atoms/Heading";
import { CaseCard } from "@/components/molecules/CaseCard";
import { CompanyList } from "@/components/molecules/CompanyList";
import { CtaStrip } from "@/components/molecules/CtaStrip";
import { FactGrid } from "@/components/molecules/FactGrid";
import { PhotoStrip } from "@/components/molecules/PhotoStrip";
import { ContentPage, PageIntro } from "@/components/templates/Page";
import { about, list, site, work } from "@/lib/content";

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <ContentPage className="flex flex-col gap-12">
      <PageIntro title={about.title} lead={about.lead} />
      <PhotoStrip photos={about.photos} caption={about.caption} />
      <FactGrid items={about.facts} />

      <section id="license" aria-labelledby="license-h" className="flex max-w-prose flex-col gap-3 border-t border-line pt-12">
        <Heading level={2} id="license-h">
          {about.license.heading}
        </Heading>
        {about.license.paragraphs.map((p) => (
          <p key={p} className="text-body-sm">
            {p.includes("GitHub") ? (
              <>
                The code for this site is <a href={site.repo}>on GitHub under the MIT licence</a>.
              </>
            ) : (
              p
            )}
          </p>
        ))}
      </section>

      <CtaStrip id="hello" heading={about.hello.heading} text={about.hello.text} />

      <section id="work" aria-labelledby="work-h" className="flex flex-col gap-12 border-t border-line pt-12">
        <div className="flex max-w-prose flex-col gap-3">
          <Heading level={2} id="work-h">
            {about.work.heading}
          </Heading>
          <p>{about.work.intro}</p>
        </div>

        <section aria-labelledby="cases-h">
          <Heading level={3} id="cases-h" className="mb-6">
            {about.work.casesHeading}
          </Heading>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {work.map((item) => (
              <CaseCard key={item.slug} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="list-h">
          <Heading level={3} id="list-h" className="mb-4">
            {about.work.listHeading}
          </Heading>
          <Suspense fallback={<p className="text-body-sm text-ink-muted">Loading the list.</p>}>
            <CompanyList rows={list} />
          </Suspense>
          <p className="mt-4 text-body-sm text-ink-muted">
            {about.work.listNote} <Link href={about.work.listNoteLink.href}>{about.work.listNoteLink.label}</Link>.
          </p>
        </section>
      </section>
    </ContentPage>
  );
}
