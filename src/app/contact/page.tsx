import type { Metadata } from "next";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Meta } from "@/components/atoms/Meta";
import { FactGrid } from "@/components/molecules/FactGrid";
import { ContentPage, PageIntro } from "@/components/templates/Page";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  alternates: { canonical: "/contact" },
};

const row = "flex min-h-11 items-center gap-3";

export default function ContactPage() {
  return (
    <ContentPage className="flex flex-col gap-12">
      <PageIntro title={contact.title} lead={contact.lead} />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_380px]">
        <section aria-labelledby="offers-h">
          <Heading level={2} id="offers-h" className="mb-6">
            {contact.offersHeading}
          </Heading>
          <FactGrid items={contact.offers} headingLevel={3} textClass="text-body-sm" />
        </section>

        <section aria-labelledby="reach-h" className="flex flex-col gap-4 self-start rounded-lg bg-surface-sunken p-8">
          <Heading level={2} id="reach-h">
            {contact.reachHeading}
          </Heading>
          <div className="flex flex-col gap-1">
            <div className={row}>
              <Icon name="mail" />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
            <div className={row}>
              <Icon name="phone" />
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
            </div>
            <div className={row}>
              <Icon name="pin" />
              <span>{site.location}</span>
            </div>
          </div>
          <Meta>{site.contact.hours}</Meta>
          <div className="flex flex-col gap-1 border-t border-line pt-2">
            <div className={row}>
              <Icon name="github" />
              <a href={site.social.github}>GitHub</a>
            </div>
            <div className={row}>
              <Icon name="linkedin" />
              <a href={site.social.linkedin}>LinkedIn</a>
            </div>
          </div>
        </section>
      </div>
    </ContentPage>
  );
}
