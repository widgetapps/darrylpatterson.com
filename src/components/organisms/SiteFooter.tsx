/**
 * Organism: the footer on the inverse surface: copyright, the licence link,
 * GitHub and LinkedIn (SITE-7), and the weather credit.
 */
import Link from "next/link";
import { GooseMark } from "@/components/atoms/GooseMark";
import { Icon } from "@/components/atoms/Icon";
import { MadeIn } from "@/components/molecules/MadeIn";
import { site } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-inverse-links bg-surface-inverse py-16 text-on-inverse">
      <div className="mx-auto flex max-w-content flex-wrap justify-between gap-8 px-4 text-body-sm md:px-8">
        <div className="flex max-w-[480px] flex-col gap-3">
          <div className="flex items-center gap-3">
            <GooseMark size={32} inverse />
            <span className="font-display text-h3">{site.name}</span>
          </div>
          <p className="text-on-inverse-muted">
            © {year} {site.name}. Text and photos are mine; see the{" "}
            <Link href="/about#license">licence</Link> for what you may reuse.
          </p>
          <p className="text-on-inverse-muted">
            {site.footer.weatherCredit} The <a href={site.repo}>code is on GitHub</a>.
          </p>
          <MadeIn />
        </div>
        <nav aria-label="Elsewhere" className="flex flex-col gap-2">
          <a href={site.social.github} className="inline-flex min-h-11 items-center gap-2">
            <Icon name="github" />
            GitHub
          </a>
          <a href={site.social.linkedin} className="inline-flex min-h-11 items-center gap-2">
            <Icon name="linkedin" />
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
