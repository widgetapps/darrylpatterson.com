import type { Metadata } from "next";
import { Heading } from "@/components/atoms/Heading";
import { CtaStrip } from "@/components/molecules/CtaStrip";
import { PullQuote } from "@/components/molecules/PullQuote";
import { EvidenceCards } from "@/components/organisms/EvidenceCards";
import { PageIntro, ProsePage } from "@/components/templates/Page";
import { ai } from "@/lib/content";

export const metadata: Metadata = {
  title: ai.title,
  description: ai.description,
  alternates: { canonical: "/ai" },
};

export default function OnAiPage() {
  return (
    <ProsePage>
      <PageIntro title={ai.title} lead={ai.lead} meta={ai.meta} />
      {ai.sections.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="flex flex-col gap-4 pt-10">
          <Heading level={2} id={`${s.id}-h`}>
            {s.heading}
          </Heading>
          {s.quote ? <PullQuote>{s.quote}</PullQuote> : null}
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {s.evidence ? <EvidenceCards /> : null}
        </section>
      ))}
      <div className="pt-12">
        <CtaStrip id="cta" heading={ai.cta.heading} text={ai.cta.text} />
      </div>
    </ProsePage>
  );
}
