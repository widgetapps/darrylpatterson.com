/**
 * Molecule: "Made with love in Sault Ste. Marie", the same sign-off Track
 * Tutor carries.
 */
import { SaultSteMarieMark } from "@/components/atoms/SaultSteMarieMark";

export function MadeIn() {
  return (
    <p className="flex flex-wrap items-center gap-1.5 text-body-sm text-on-inverse-muted">
      <span>Made with</span>
      <svg viewBox="0 0 24 24" width={14} height={14} className="fill-goose" role="img" aria-label="love" focusable="false">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>in</span>
      <a href="https://saultstemarie.ca/" className="inline-flex min-h-11 items-center gap-1.5">
        <SaultSteMarieMark />
        Sault Ste. Marie
      </a>
    </p>
  );
}
