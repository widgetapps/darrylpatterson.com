/**
 * Molecule: the two-column grid of short sections on About and the offers on Contact.
 */
import { Heading } from "@/components/atoms/Heading";

export function FactGrid({
  items,
  headingLevel = 2,
  textClass = "",
}: {
  items: readonly { heading: string; text: string }[];
  headingLevel?: 2 | 3;
  textClass?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
      {items.map((item) => (
        <section key={item.heading}>
          <Heading level={headingLevel} size={3} className="mb-2">
            {item.heading}
          </Heading>
          <p className={textClass}>{item.text}</p>
        </section>
      ))}
    </div>
  );
}
