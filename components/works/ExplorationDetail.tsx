import Link from "next/link";
import HatchBand from "@/components/core/HatchBand";
import {
  getSiblingExplorationIds,
  type Exploration,
} from "@/lib/constants/explorations";
import ExplorationVisual from "./ExplorationVisual";

export const explorationHref = (id: string) => `/works/explorations/${id}`;
export const EXPLORATION_TITLE_ID = "exploration-title";
/** Works tab value; also the URL hash that opens Works on that tab. */
export const EXPLORATIONS_TAB = "explorations";

const stepClass =
  "rounded-xl border-b border-line bg-surface px-3 py-3 font-mono text-sm leading-5 font-medium text-fg underline underline-offset-auto btn-motion md:py-4 md:text-base";

/** `**text**` → bold; everything else is plain text. */
function Paragraph({ text }: { text: string }) {
  return (
    <p>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-bold">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </p>
  );
}

/**
 * One personal exploration, from the design: the title in the hatch band, the
 * framed shot beside its write-up, and steps to the neighbouring explorations.
 * The Works page shows it in a panel (`inPanel`: steps replace history so
 * closing returns to Works); a direct visit shows it as its own page.
 */
export default function ExplorationDetail({
  exploration,
  inPanel = false,
}: {
  exploration: Exploration;
  inPanel?: boolean;
}) {
  const { prevId, nextId } = getSiblingExplorationIds(exploration.id);
  const step = { replace: inPanel, scroll: !inPanel };

  return (
    <article className="flex flex-col">
      <HatchBand>
        <div className="relative flex h-full w-full max-w-114 items-center rounded-xl border-b border-line bg-surface px-3">
          <h1
            id={EXPLORATION_TITLE_ID}
            className="flex-1 border-x border-line bg-page px-3 py-2.5 text-center font-mono text-[13px] leading-normal font-medium text-balance text-fg uppercase sm:text-sm"
          >
            {exploration.title}
          </h1>
        </div>
      </HatchBand>

      {/* Keyed so each step to a neighbour rises in afresh. */}
      <div
        key={exploration.id}
        className="anim-rise-in duration-normal ease-out-quart mx-auto grid w-full max-w-360 gap-8 px-4 pt-8 pb-6 md:grid-cols-[minmax(0,814fr)_minmax(0,391fr)] md:gap-9 md:px-8 md:pt-13.5 lg:pr-29.5 lg:pl-11.75"
      >
        <ExplorationVisual
          exploration={exploration}
          sizes="(min-width: 768px) 60vw, 100vw"
          preload
          fetchPriority="high"
          hero
        />

        <div className="flex flex-col items-start gap-4">
          <div className="space-y-5 font-mono text-sm leading-5 tracking-[-0.56px] whitespace-pre-line text-fg-3">
            {exploration.description.split("\n\n").map((text) => (
              <Paragraph key={text} text={text} />
            ))}
          </div>

          {exploration.liveLink && (
            <a
              href={exploration.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-chip px-3 py-2 font-mono text-xs leading-5 font-medium tracking-[-0.96px] text-fg underline btn-motion hover:bg-chip-hover"
            >
              Check it out
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      <nav
        aria-label="More explorations"
        className="mx-auto flex w-full max-w-360 flex-wrap justify-end gap-1 px-4 pb-8 md:px-8 md:pb-12 lg:pr-10.75"
      >
        {/* The panel closes back to the grid; a standalone visit links to it. */}
        {!inPanel && (
          <Link
            href={`/works#${EXPLORATIONS_TAB}`}
            className="mr-auto self-center font-mono text-sm leading-5 font-medium text-fg-muted transition-colors duration-short ease-out-cubic hover:text-fg"
          >
            / All explorations
          </Link>
        )}
        {prevId && (
          <Link href={explorationHref(prevId)} {...step} className={stepClass}>
            Take a step back
          </Link>
        )}
        {nextId && (
          <Link href={explorationHref(nextId)} {...step} className={stepClass}>
            Go Further
          </Link>
        )}
      </nav>
    </article>
  );
}
