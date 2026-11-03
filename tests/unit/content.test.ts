import { describe, expect, it } from "vitest";
import { about, ai, contact, home, list, notFound, site, work } from "@/lib/content";

// CNT-12, QA-1: the content loaders and schemas.
describe("content", () => {
  it("loads every file through its schema", () => {
    expect(site.nav.map((n) => n.label)).toEqual(["Home", "On AI", "About", "Contact"]);
    expect(site.apps.map((a) => a.id)).toEqual(["tracktutor", "algomalive"]);
    expect(home.hero.headline).toBe("Darryl makes useful things using AI.");
    expect(ai.sections.length).toBeGreaterThanOrEqual(6);
    expect(about.facts.some((f) => f.heading === "Rotary" && f.text.includes("Past President"))).toBe(true);
    expect(contact.offers[0].heading).toBe("AI and automation");
    expect(work).toHaveLength(3);
    expect(list).toHaveLength(148);
    expect(new Set(list.map((r) => r.id)).size).toBe(148);
    expect(notFound.links[0].href).toBe("/");
  });

  it("keeps the day job to one sentence and never a headline (CNT-4)", () => {
    const headings = [...about.facts.map((f) => f.heading), home.now.heading, home.hero.headline];
    expect(headings.some((h) => /soo mill/i.test(h))).toBe(false);
    const mentions = JSON.stringify([home, about, ai, contact]).match(/Soo Mill/g) ?? [];
    expect(mentions).toHaveLength(1);
  });

  it("publishes no usage numbers for the apps (CNT-7)", () => {
    for (const app of site.apps) {
      expect(app.description).not.toMatch(/\d+\s*(users|groups|events|choirs|downloads)/i);
    }
  });
});
