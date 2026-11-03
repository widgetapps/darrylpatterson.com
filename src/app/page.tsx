import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { AppCard } from "@/components/molecules/AppCard";
import { CtaStrip } from "@/components/molecules/CtaStrip";
import { PullQuote } from "@/components/molecules/PullQuote";
import { LivingHero } from "@/components/organisms/LivingHero";
import { home, site } from "@/lib/content";

// Prerendered, and rebuilt hourly so the hero's season stays right (HERO-7).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: home.title },
  description: home.description,
  alternates: { canonical: "/" },
};

const section = "mx-auto max-w-content px-4 pt-12 md:px-8 md:pt-16";

export default function HomePage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Builder, designer and engineer",
    address: { "@type": "PostalAddress", addressLocality: "Sault Ste. Marie", addressRegion: "ON", addressCountry: "CA" },
    sameAs: [site.social.linkedin, site.social.github],
  };

  return (
    <main id="main" className="pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />

      <LivingHero hero={home.hero} />

      <section aria-labelledby="now" className={section}>
        <div className="flex max-w-prose flex-col gap-4">
          <Heading level={2} id="now">
            {home.now.heading}
          </Heading>
          {home.now.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section id="apps" aria-labelledby="built" className={section}>
        <Heading level={2} id="built" className="mb-6">
          {home.built.heading}
        </Heading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {site.apps.map((app, i) => (
            <AppCard key={app.id} app={app} priority={i === 0} />
          ))}
        </div>
        <p className="mt-6 max-w-prose text-body-sm text-ink-muted">{home.built.note}</p>
      </section>

      <section aria-labelledby="stance" className={section}>
        <div className="flex max-w-prose flex-col gap-6">
          <Heading level={2} id="stance">
            {home.stance.heading}
          </Heading>
          <PullQuote>{home.stance.quote}</PullQuote>
          <p>{home.stance.paragraph}</p>
          <p>
            <Link href={home.stance.link.href} data-testid="essay-link">
              {home.stance.link.label}
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="person" className={section}>
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[320px_minmax(0,1fr)] md:gap-12">
          <Image
            src={home.person.photo.src}
            alt={home.person.photo.alt}
            width={home.person.photo.width}
            height={home.person.photo.height}
            sizes="320px"
            className="aspect-square w-full max-w-[320px] rounded-lg object-cover"
          />
          <div className="flex max-w-prose flex-col gap-4">
            <Heading level={2} id="person">
              {home.person.heading}
            </Heading>
            <p>{home.person.paragraph}</p>
            <p>
              <Link href={home.person.link.href}>{home.person.link.label}</Link>
            </p>
          </div>
        </div>
      </section>

      <section className={section}>
        <CtaStrip
          id="contact"
          heading={home.cta.heading}
          text={home.cta.text}
          actions={
            <>
              <ButtonLink href={`mailto:${site.contact.email}`}>
                <Icon name="mail" size={24} />
                Email me
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Get in touch
              </ButtonLink>
            </>
          }
        />
      </section>
    </main>
  );
}
