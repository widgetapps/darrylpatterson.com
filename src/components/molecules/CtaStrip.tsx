/**
 * Molecule: the contact strip that ends every page ("Burying the contact" is
 * on the never-do list).
 */
import { ButtonLink } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import type { ReactNode } from "react";

export function CtaStrip({
  heading,
  text,
  actions,
  id,
}: {
  heading: string;
  text: string;
  actions?: ReactNode;
  id?: string;
}) {
  return (
    <section
      aria-labelledby={id ? `${id}-h` : undefined}
      className="flex flex-wrap items-center justify-between gap-6 rounded-lg bg-surface-sunken p-8"
    >
      <div className="flex max-w-[560px] flex-col gap-2">
        <Heading level={2} id={id ? `${id}-h` : undefined}>
          {heading}
        </Heading>
        <p>{text}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {actions ?? <ButtonLink href="/contact">Get in touch</ButtonLink>}
      </div>
    </section>
  );
}
