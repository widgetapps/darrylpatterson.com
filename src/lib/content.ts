/**
 * Typed content accessors (TECH-3, CNT-12). Every JSON file under content/ is
 * parsed with zod when first imported, so a bad edit fails the build rather
 * than the page.
 */
import { z } from "zod";
import siteJson from "@content/site.json";
import homeJson from "@content/home.json";
import aiJson from "@content/ai.json";
import aboutJson from "@content/about.json";
import contactJson from "@content/contact.json";
import workJson from "@content/work.json";
import listJson from "@content/list.json";
import notFoundJson from "@content/notfound.json";

const link = z.object({ label: z.string().min(1), href: z.string().min(1) });
const image = z.object({
  src: z.string().startsWith("/"),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const plainText = z.string().min(1).refine((s) => !s.includes("!"), {
  message: "No exclamation marks (DSN-9)",
});

export const siteSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  description: plainText,
  location: z.string(),
  locationShort: z.string(),
  nav: z.array(link).length(4),
  social: z.object({ github: z.string().url(), linkedin: z.string().url() }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    phoneHref: z.string().startsWith("tel:"),
    hours: z.string(),
  }),
  repo: z.string().url(),
  apps: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: plainText,
        platforms: z.string(),
        url: z.string().url(),
        host: z.string(),
        image,
      }),
    )
    .length(2),
  footer: z.object({ copyright: plainText, weatherCredit: plainText }),
});

export const homeSchema = z.object({
  title: z.string(),
  description: plainText,
  hero: z.object({ headline: plainText, lead: plainText, primary: link, secondary: link }),
  now: z.object({ heading: z.string(), paragraphs: z.array(plainText).min(1) }),
  built: z.object({ heading: z.string(), note: plainText }),
  stance: z.object({ heading: z.string(), quote: plainText, paragraph: plainText, link }),
  person: z.object({ heading: z.string(), paragraph: plainText, link, photo: image }),
  cta: z.object({ heading: z.string(), text: plainText }),
});

export const aiSchema = z.object({
  title: z.string(),
  description: plainText,
  meta: z.string(),
  lead: plainText,
  sections: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        heading: z.string(),
        quote: plainText.optional(),
        paragraphs: z.array(plainText).min(1),
        evidence: z.boolean().optional(),
      }),
    )
    .min(5),
  cta: z.object({ heading: z.string(), text: plainText }),
});

export const aboutSchema = z.object({
  title: z.string(),
  description: plainText,
  lead: plainText,
  photos: z.array(image).min(3),
  caption: plainText,
  facts: z.array(z.object({ heading: z.string(), text: plainText })).min(6),
  license: z.object({ heading: z.string(), paragraphs: z.array(plainText).min(1) }),
  hello: z.object({ heading: z.string(), text: plainText }),
  work: z.object({
    heading: z.string(),
    intro: plainText,
    casesHeading: z.string(),
    listHeading: z.string(),
    listNote: z.string(),
    listNoteLink: link,
  }),
});

export const contactSchema = z.object({
  title: z.string(),
  description: plainText,
  lead: plainText,
  offersHeading: z.string(),
  offers: z.array(z.object({ heading: z.string(), text: plainText })).length(4),
  reachHeading: z.string(),
});

export const workSchema = z
  .array(
    z.object({
      slug: z.string(),
      title: z.string(),
      client: z.string(),
      role: z.string(),
      when: z.string(),
      image,
    }),
  )
  .length(3);

export const LIST_TYPES = {
  agency: "Agencies",
  brand: "Brands",
  ent: "Enterprise",
  tech: "Tech",
  finance: "Finance",
  gov: "Government",
  other: "Other",
} as const;
export type ListType = keyof typeof LIST_TYPES;
export const listTypeSchema = z.enum(Object.keys(LIST_TYPES) as [ListType, ...ListType[]]);

export const listSchema = z
  .array(
    z.object({
      id: z.number().int(),
      company: z.string().min(1),
      type: listTypeSchema,
      role: z.string(),
    }),
  )
  .length(148)
  .refine((rows) => new Set(rows.map((r) => r.id)).size === rows.length, {
    message: "Company ids must be unique (they are React keys)",
  });

export const notFoundSchema = z.object({
  title: z.string(),
  meta: z.string(),
  heading: plainText,
  text: plainText,
  links: z.array(link.extend({ primary: z.boolean().optional() })).min(1),
});

export type Site = z.infer<typeof siteSchema>;
export type Home = z.infer<typeof homeSchema>;
export type Ai = z.infer<typeof aiSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Work = z.infer<typeof workSchema>;
export type ListEntry = z.infer<typeof listSchema>[number];
export type NotFound = z.infer<typeof notFoundSchema>;

export const site: Site = siteSchema.parse(siteJson);
export const home: Home = homeSchema.parse(homeJson);
export const ai: Ai = aiSchema.parse(aiJson);
export const about: About = aboutSchema.parse(aboutJson);
export const contact: Contact = contactSchema.parse(contactJson);
export const work: Work = workSchema.parse(workJson);
export const list: ListEntry[] = listSchema.parse(listJson);
export const notFound: NotFound = notFoundSchema.parse(notFoundJson);
