import type { Metadata } from "next";
import Link from "next/link";
import HatchBand from "@/components/core/HatchBand";
import { stagger } from "@/lib/stagger";

export const metadata: Metadata = {
  title: "Page not found — Idowu Abiodun",
};

// Where a lost visitor most likely meant to go.
const suggestions = [
  { label: "Case studies", href: "/works" },
  { label: "Personal explorations", href: "/works#explorations" },
  { label: "About me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const corner = "absolute size-3 border-fg-muted";

/**
 * 404, after the calm error pages on Mobbin (one focal mark, a friendly line,
 * one sentence, a clear way back), in the site's own hatch band, mono type
 * and framed-tile language.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col overflow-x-clip pt-8 pb-16 md:pb-24">
      <HatchBand>
        <div className="relative flex h-full w-full max-w-114 items-center rounded-xl border-b border-line bg-surface px-3">
          <p className="flex-1 border-x border-line bg-page px-3 py-2.5 text-center font-mono text-[13px] leading-normal font-medium text-fg uppercase sm:text-sm">
            Error 404 — Page not found
          </p>
        </div>
      </HatchBand>

      <div className="mx-auto flex w-full max-w-152 flex-col items-center px-4 pt-12 text-center md:pt-20">
        {/* The focal mark: a big 404 in a framed tile, corners ticked like a crop. */}
        <div
          {...stagger(0)}
          aria-hidden
          className="relative flex w-full items-center justify-center border border-line bg-surface py-10 md:py-14"
        >
          <span className={`${corner} -top-px -left-px border-t border-l`} />
          <span className={`${corner} -top-px -right-px border-t border-r`} />
          <span className={`${corner} -bottom-px -left-px border-b border-l`} />
          <span className={`${corner} -right-px -bottom-px border-r border-b`} />
          <span className="font-display text-[120px] leading-none tracking-[-2px] text-fg md:text-[180px]">
            404
          </span>
          <span className="absolute bottom-3 left-4 font-mono text-[11px] leading-4 tracking-[-0.22px] text-fg-muted uppercase">
            ( no frame here )
          </span>
        </div>

        <h1
          {...stagger(1)}
          className="mt-10 font-mono text-[28px] leading-9 font-medium tracking-[-0.56px] text-balance text-fg md:text-[32px] md:leading-10 md:tracking-[-0.64px]"
        >
          We all get lost sometimes.
        </h1>

        <p
          {...stagger(2)}
          className="mt-4 max-w-110 font-mono text-sm leading-6 tracking-[-0.56px] text-fg-3"
        >
          The link may be out of date, or this page has moved. The work is
          still where you left it.
        </p>

        <div {...stagger(3)} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-fg px-4 py-3 font-mono text-sm leading-5 font-medium text-on-fg uppercase btn-motion hover:opacity-85"
          >
            <span aria-hidden className="arrow-nudge-back">
              ←
            </span>
            Back home
          </Link>
          <Link
            href="/works"
            className="inline-flex items-center bg-chip px-4 py-3 font-mono text-sm leading-5 font-medium text-fg uppercase btn-motion hover:bg-chip-hover"
          >
            See my work
          </Link>
        </div>

        <nav
          {...stagger(4)}
          aria-label="Suggested pages"
          className="mt-14 w-full border-t border-line pt-6 text-left"
        >
          <p className="font-mono text-xs leading-5 tracking-[-0.48px] text-fg-muted uppercase">
            ( Or try one of these )
          </p>
          <ul className="mt-3 divide-y divide-line border-b border-line">
            {suggestions.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between py-3 font-mono text-sm leading-5 font-medium text-fg-3 transition-colors duration-short ease-out-cubic hover:text-fg"
                >
                  {s.label}
                  <span aria-hidden className="arrow-nudge-x text-fg-muted">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
